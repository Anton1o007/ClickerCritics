from typing import Optional
from fastapi import APIRouter, Header, status, HTTPException, Depends, Form
from datetime import datetime
from db.models.critic import Critic
from db.models.game import Game, GameScoreTuple
from db.models.user import UserDB, UserType, User
from db.schemas.critic import critic_schema
from db.schemas.game import game_schema
from routers.auth.auth import auth_user
from db.client import db_client
from bson import ObjectId
from routers.score_weights.score_weights import get_user_weights
# from detoxify import Detoxify
import numpy as np

router = APIRouter(prefix="/critic", tags=["critics"], responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})
# Crear una instancia de Detoxify
# detector = Detoxify('multilingual')

def search_user_by_id(user_id: ObjectId):
    return db_client.users.find_one({"_id": user_id})

def search_critic_by_id(critic_id: ObjectId):
    critic = db_client.critics.find_one({"_id": critic_id})
    return Critic(**critic_schema(critic)) if critic else None

def validate_critic_score(score: int, game_id: str):
    # Obtener las notas existentes para el juego
    existing_scores = db_client.critics.find({"gameId": game_id}, {"score": 1})
    existing_scores = [entry["score"] for entry in existing_scores]

    # Verificar si hay al menos tres notas para aplicar el algoritmo
    if len(existing_scores) < 3:
        return True  # Se considera válida

    # Calcular la mediana de las notas existentes
    median_score = np.median(existing_scores)

    # Calcular la desviación típica de las notas existentes
    std_dev = np.std(existing_scores)

    # Verificar si la nueva nota es un outlier
    if np.abs(score - median_score) > 2.5 * std_dev:
        return False  # Se considera inválida
    else:
        return True  # Se considera válida


def get_average_game_score(game_id: str, user_id: Optional[str] = None):
    if user_id:
        weights = get_user_weights(user_id)
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
        {"$match": {"_id": ObjectId(game_id)}},
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
            "weighted_scores": {"$push": "$weighted_score"},
            "game": {"$first": "$$ROOT"},
            "count_valid_scores": {"$sum": {"$cond": [{"$ifNull": ["$weighted_score", False]}, 1, 0]}}
        }},
        {"$addFields": {
            "game.average_score": {"$cond": [
                {"$eq": ["$count_valid_scores", 0]},
                None,
                {"$divide": [
                    {"$sum": "$weighted_scores"},
                    "$count_valid_scores"
                ]}
            ]}
        }},
        {"$replaceRoot": {"newRoot": "$game"}}
    ]

    game_with_score = list(db_client.games.aggregate(pipeline))

    if game_with_score:
        game_data = game_with_score[0]
        return GameScoreTuple(game=Game(**game_schema(game_data)), score=game_data["average_score"])
    else:
        return None

def get_average_score_by_user_type(game_id: str, user_type: UserType):
    pipeline = [
        {"$match": {"gameId": game_id, "critic_type": user_type.value}},
        {"$group": {"_id": "$gameId", "average_score": {"$avg": "$score"}}}
    ]
    result = list(db_client.critics.aggregate(pipeline))
    return result[0]["average_score"] if result else None

def get_user_score_for_game(user_id: str, game_id: str):
    user_score_pipeline = [
        {"$match": {"userId": user_id, "gameId": game_id}},
        {"$group": {"_id": None, "user_score": {"$max": "$score"}}}
    ]
    result = list(db_client.critics.aggregate(user_score_pipeline))
    return result[0]["user_score"] if result else None

def is_toxic_text(text: str,detector):
    toxicity_prediction = detector.predict(text)
    return toxicity_prediction['toxicity'] >= 0.5

@router.get("/{id}")
async def get_critic(id: str):
    return search_critic_by_id(ObjectId(id))

class CustomHTTPException(HTTPException):
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail

@router.post("/create_critic")
async def create_critic(
    gameId: str = Form(...),
    text: str = Form("", alias="text"),
    score: int = Form(...),
    current_user: UserDB = Depends(auth_user)
):
    # Comprobar si el texto es considerado tóxico
    is_toxic = False 
    #is_toxic = is_toxic_text(text,detector)

    # Si el texto es considerado tóxico, devolver un mensaje de advertencia
    if is_toxic:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Tu crítica contiene contenido potencialmente ofensivo. Por favor, revísala.")
    
    if not validate_critic_score(score, gameId):
        raise CustomHTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Parece que la nota proporcionada es extrema. Por favor, asegúrate de calificar de manera justa y equilibrada.")

    userId = str(current_user.id)
    existing_critic = db_client.critics.find_one({"userId": userId, "gameId": gameId})
    if existing_critic:
        raise CustomHTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ya existe una crítica para este usuario y juego")
    if not (0 < score <= 10):
        raise CustomHTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El puntaje debe estar entre 1 y 10")
    critic_data = {
        "userId": userId,
        "author": current_user.username,
        "gameId": gameId,
        "text": text,
        "score": score,
        "creation_date": datetime.utcnow(),
        "critic_type": current_user.user_type
    }
    id = db_client.critics.insert_one(critic_data).inserted_id
    return {"message": "Crítica creada exitosamente", "critic_id": str(id)}

@router.get("/user/{userId}")
async def get_critics_by_user_id(current_user: UserDB = Depends(auth_user)):
    user_critics = list(db_client.critics.find({"userId": str(current_user.id)}))
    if not user_critics:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron críticas para este usuario")
    return [critic_schema(critic) for critic in user_critics]

@router.get("/has_critic/{gameId}")
async def check_user_critic_for_game(
    gameId: str,
    current_user: UserDB = Depends(auth_user)
):
    user_critic = db_client.critics.find_one({"gameId": gameId, "userId": str(current_user.id)})
    return {"has_critic": True} if user_critic else {"has_critic": False}

@router.get("/game/{gameId}")
async def get_critics_by_game_id(gameId: str):
    game_critics = list(db_client.critics.find({"gameId": gameId}))
    critics_list = [Critic(**critic_schema(critic)) for critic in game_critics]
    critics_list_sorted = sorted(critics_list, key=lambda x: x.creation_date, reverse=True)
    return critics_list_sorted if critics_list_sorted else []

@router.get("/critic_type/{gameId}")
async def get_critic_by_user_type(gameId: str, critic_type: UserType):
    user_type_critics = list(db_client.critics.find({"gameId": gameId, "critic_type": critic_type}))
    if not user_type_critics:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No se encontraron críticas para el juego {gameId} con usuarios del tipo {critic_type}"
        )
    return [critic_schema(critic) for critic in user_type_critics]

@router.get("/game/average_score/{gameId}")
async def get_game_average_score(gameId: str):
    average_score = get_average_game_score(gameId)
    if average_score is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron críticas para este juego")
    return {"average_score": average_score}

@router.get("/game/ratings/{gameId}")
async def get_scores_for_game(gameId: str, current_user_id: Optional[str] = Header(None, convert_underscores=True)):

    average_score_user = get_average_score_by_user_type(gameId, UserType.USER)
    average_score_professional = get_average_score_by_user_type(gameId, UserType.PROFESSIONAL)
    
    average_score_current_user = None
    if current_user_id:
        average_score_current_user = get_user_score_for_game(current_user_id, gameId)

    return {
        "average_score_user": average_score_user,
        "average_score_professional": average_score_professional,
        "average_score_current_user": average_score_current_user
    }

@router.delete("/delete_critic/{critic_id}")
async def delete_critic(
    critic_id: str,
    current_user: UserDB = Depends(auth_user)
):
    
    critic = search_critic_by_id(ObjectId(critic_id))

    if not critic:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="La crítica no se encontró.")

    if str(current_user.id) != critic.userId and current_user.user_type != UserType.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No tienes permiso para borrar esta crítica.")

    result = db_client.critics.delete_one({"_id": ObjectId(critic_id)})

    if result.deleted_count == 1:
        return {"message": "La crítica ha sido borrada exitosamente."}
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="No se pudo borrar la crítica.")





