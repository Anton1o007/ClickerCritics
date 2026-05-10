from typing import Optional, List
from fastapi import APIRouter, status, Query, Header, HTTPException
from db.models.game import Game, GameScoreTuple
from db.models.user import User
from datetime import datetime
from db.schemas.game import game_list_schema, game_schema
from routers.critics.critics import get_average_game_score
from routers.score_weights.score_weights import get_user_weights
from db.client import db_client
from bson import ObjectId
from pymongo import DESCENDING, ASCENDING

router = APIRouter(prefix="/game", tags=["games"], responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})

def search_game(field: str, key):
    game = db_client.games.find_one({field: key})
    if game:
        return Game(**game_schema(game))
    return None

def get_sorted_games(query_filter=None, sort_field="release_date", limit=None, skip=0):
    sort_direction = -1
    
    if query_filter and sort_field in query_filter:
        if "$lte" in query_filter[sort_field]:
            sort_direction = -1
        elif "$gt" in query_filter[sort_field]:
            sort_direction = 1

    games_sorted = db_client.games.find(query_filter).sort(sort_field, sort_direction).skip(skip)
    if limit:
        games_sorted = games_sorted.limit(limit)

    return games_sorted

def create_game_score_tuple_list(games_sorted, current_user_id: Optional[str] = None, sort_order=DESCENDING):

    if current_user_id:
        weights = get_user_weights(current_user_id)
        if weights is not None:
            p_weight = weights["professional_weight"]
        else:
            p_weight = 1.0

        if weights is not None:
            u_weight = weights["user_weight"]
        else:
            u_weight = 1.0      
    else:
        u_weight=1.0
        p_weight=1.0

    pipeline = [
        {"$match": {"_id": {"$in": [ObjectId(str(game["_id"])) for game in games_sorted]}}},
        {"$lookup": {
            "from": "critics",
            "let": {"game_id": "$_id"},
            "pipeline": [
                {"$match": {"$expr": {"$eq": ["$gameId", {"$toString": "$$game_id"}]}}},
            ],
            "as": "critics",
        }},
        {"$unwind": {"path": "$critics", "preserveNullAndEmptyArrays": True}},
        {"$addFields": {
            "weighted_score": {
                "$cond": {
                    "if": {
                        "$or": [
                            {"$eq": ["$critics", None]},
                            {"$eq": ["$critics.score", None]},
                            {"$or": [
                                {"$and": [
                                    {"$eq": ["$critics.critic_type", "USER"]},
                                    {"$eq": ["$critics.score", 0]}
                                ]},
                                {"$and": [
                                    {"$eq": ["$critics.critic_type", "PROFESSIONAL"]},
                                    {"$eq": ["$critics.score", 0]}
                                ]}
                            ]}
                        ]
                    },
                    "then": None,
                    "else": {
                        "$cond": {
                            "if": {"$eq": ["$critics.critic_type", "USER"]},
                            "then": {"$multiply": ["$critics.score", u_weight]},
                            "else": {"$multiply": ["$critics.score", p_weight]}
                        }
                    }
                }
            }
        }},
        {"$group": {
            "_id": "$_id",
            "weighted_scores": {"$push": "$weighted_score"},  # Almacena todas las puntuaciones ponderadas
            "game": {"$first": "$$ROOT"},
            "count_valid_scores": {"$sum": {"$cond": [{"$ifNull": ["$weighted_score", False]}, 1, 0]}} # Conteo de puntuaciones válidas
        }},
        {"$addFields": {
            "game.average_score": {"$cond": [
                {"$eq": ["$count_valid_scores", 0]}, # Si no hay puntuaciones válidas, el promedio es None
                None,
                {"$divide": [
                    {"$sum": "$weighted_scores"}, # Suma de todas las puntuaciones ponderadas
                    "$count_valid_scores" # Dividido por el número de puntuaciones válidas
                ]}
            ]}
        }},
        {"$replaceRoot": {"newRoot": "$game"}},
        {"$sort": {"release_date": sort_order}},
    ]

    games_with_scores = list(db_client.games.aggregate(pipeline))

    game_list = [
        GameScoreTuple(game=Game(**game_schema(game)), score=game["average_score"])
        for game in games_with_scores
    ]

    return game_list

def get_unique_platforms():
    unique_platforms = db_client.platforms.distinct("platform")
    return unique_platforms

def get_unique_genres():
    unique_genres = db_client.genres.distinct("name")
    return unique_genres

def get_games_with_critics():
    # Obtener los IDs de los juegos que tienen críticas asociadas
    game_ids_with_critics = db_client.critics.distinct("gameId")

    # Buscar los detalles de los juegos usando los IDs obtenidos
    games_list = db_client.games.find({"_id": {"$in": [ObjectId(game_id) for game_id in game_ids_with_critics]}})

    return games_list


@router.get("/", response_model=List[Game])
async def games():
    return game_list_schema(db_client.games.find())

@router.post("/addGame")
async def addGame():
    game_data = {
        # Datos del nuevo juego
    }
    db_client.games.insert_one(game_data).inserted_id
    return {}

@router.get("/unique_platforms", response_model=List[str])
async def unique_platforms():
    platforms = get_unique_platforms()
    return platforms

@router.get("/unique_genres", response_model=List[str])
async def unique_genres():
    genres = get_unique_genres()
    return genres

@router.get("/games_list", response_model=List[GameScoreTuple])
async def games_list(
    platforms: Optional[str] = Query(None),
    genres: Optional[str] = Query(None),
    min_score: Optional[float] = Query(None),
    max_score: Optional[float] = Query(None),
    upcoming: Optional[bool] = Query(None),
    best: Optional[bool] = Query(None),
    new: Optional[bool] = Query(None),
    limit: Optional[int] = Query(10),
    skip: Optional[int] = Query(0),
    current_user_id: Optional[str] = Header(None),
):
    query_filter = {}
    current_date = datetime.now()

    if best:
        game_with_critics = get_games_with_critics()
        games_with_critics = create_game_score_tuple_list(game_with_critics, current_user_id)
        sorted_games = sorted(
            games_with_critics,
            key=lambda x: (x.score if x.score is not None else float("-inf"), x.game.release_date),
            reverse=True,
        )
        query_filter["release_date"] = {"$lte": current_date}
        games_sorted = get_sorted_games(query_filter, sort_field="score", limit=limit, skip=skip)
        games_list = create_game_score_tuple_list(games_sorted, current_user_id)
        games_list = sorted_games + games_list
        return games_list
    
    if upcoming is not None:
        if upcoming:
            # Obtener los juegos cuya fecha de salida es posterior a la fecha actual
            query_filter["release_date"] = {"$gt": current_date}
            # Ordenar los juegos de más cercanos a más lejanos en el tiempo
            games_sorted = get_sorted_games(query_filter, sort_field="release_date", limit=limit, skip=skip)
        else:
            query_filter["release_date"] = {"$lte": current_date}
            # Ordenar los juegos de más lejanos a más cercanos en el tiempo
            games_sorted = get_sorted_games(query_filter, sort_field="release_date", limit=limit, skip=skip)
        
        games_list = create_game_score_tuple_list(games_sorted, current_user_id, ASCENDING)
        return games_list

    if new:
        query_filter["release_date"] = {"$lte": current_date}

    if platforms:
        if isinstance(platforms, str):
            platforms = platforms.split(',')
        query_filter["platforms"] = {"$all": platforms}

    if genres:
        if isinstance(genres, str):
            genres = genres.split(',')
        query_filter["genres"] = {"$all": genres}

    games_sorted = get_sorted_games(query_filter, sort_field="release_date", limit=limit, skip=skip)
    games_list = create_game_score_tuple_list(games_sorted, current_user_id)

    if min_score is not None or max_score is not None:
        filtered_games = [game for game in games_list if game.score is not None and (min_score is None or game.score >= min_score) and (max_score is None or game.score <= max_score)]
        filtered_games = sorted(
            filtered_games,
            key=lambda x: (x.score if x.score is not None else float("-inf"), x.game.release_date),
            reverse=True,
        )
        return filtered_games

    return games_list

@router.get("/search", response_model=List[GameScoreTuple])
async def search_games_by_title(
    title: str = Query(..., title="Keyword to search for"),
    limit: int = Query(10, title="Maximum number of results to return"),
    skip: int = Query(0, title="Number of results to skip"),
    current_user_id: Optional[str] = Header(None)
):
    search_filter = {"title": {"$regex": f".*{title}.*", "$options": "i"}}

    u_weight = 1.0
    p_weight = 1.0

    games_sorted = get_sorted_games(search_filter, sort_field="score", limit=limit, skip=skip)
    games_list = create_game_score_tuple_list(games_sorted, current_user_id)
    
    return games_list

# Este endpoint tiene que estar el último, si no peta
@router.get("/{id}")
async def game(id: str, current_user_id: Optional[str] = Header(None)):
    game_tuple = get_average_game_score(id, current_user_id)
    if game_tuple is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return {"game_details": game_tuple.game, "average_score": game_tuple.score}
