from fastapi import APIRouter, Depends, HTTPException, status, Header
from db.models.user import User, UserUpdate, UserDB, UserType
from db.models.game import Game, GameScoreTuple
from passlib.context import CryptContext
from db.schemas.user import user_schema
from db.schemas.game import game_schema
from db.client import db_client
from bson import ObjectId
from routers.auth.auth import auth_user
from routers.critics.critics import get_user_score_for_game
from routers.games.games import search_game

router = APIRouter(prefix="/user", tags=["user"], responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})

def get_current_user(current_user: User = Depends(auth_user)):
    return current_user


def get_user_rated_games(user_id: str) -> list[Game]:
    user_critics = list(db_client.critics.find({"userId": user_id}))
    game_ids = {critic['gameId'] for critic in user_critics}
    games = db_client.games.find({"_id": {"$in": list(map(ObjectId, game_ids))}})
    return [Game(**game_schema(game)) for game in games]

def get_top_genres_for_user(user_id: str) -> list[str]:
    user_rated_games = get_user_rated_games(user_id)

    genre_scores = {}
    for game in user_rated_games:
        for genre in game.genres:
            score = get_user_score_for_game(user_id, str(game.id))
            if score is not None:
                genre_scores[genre] = genre_scores.get(genre, 0) + score

    top_genres = sorted(genre_scores.keys(), key=lambda genre: genre_scores[genre], reverse=True)[:3]
    return top_genres

@router.get("/", response_model=list[User])
async def users(user_id: str = Header(...)):

    user = db_client.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="El usuario no existe o no tiene permisos para acceder a la lista de usuarios",
        )

    if user.get("user_type") != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Solo los administradores pueden acceder a la lista de usuarios",
        )

    user_list = list(db_client.users.find())
    u_list = [User(**user_schema(user)) for user in user_list]
    return u_list

@router.get("/user_genres/{user_id}")
async def user_top_genres(user_id: str):
    top_genres = get_top_genres_for_user(user_id)
    return top_genres

@router.get("/scored_games/{userId}", response_model=list[GameScoreTuple])
async def get_scored_games(userId: str):

    user_criticisms = db_client.critics.find({"userId": userId})
    user_criticized_games = []

    for criticism in user_criticisms:
        game_details = search_game("_id", ObjectId(criticism["gameId"]))
        if game_details:
            game_score_tuple = GameScoreTuple(game=game_details, score=criticism["score"])
            user_criticized_games.append(game_score_tuple)
    return user_criticized_games

@router.get("/{id}")
async def user(id: str):
    user = db_client.users.find_one({"_id": ObjectId(id)})
    return User(**user_schema(user))

@router.put("/update")
async def update_user(user_update: UserUpdate, current_user: UserDB = Depends(get_current_user)):
    if str(current_user.id) != user_update.id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No tienes permiso para actualizar este usuario",
        )

    user_dict = user_update.model_dump(exclude_unset=True)
    if 'id' in user_dict:
        del user_dict['id']
    
    if 'password' in user_dict and user_dict['password'] == "":
        del user_dict['password']
    else:
        crypt = CryptContext(schemes=["bcrypt"])
        user_dict['password'] = crypt.hash(user_dict['password'])


    if 'description' in user_dict and user_dict['description'] == "":
        del user_dict['description']

    if current_user.user_type == UserType.ADMIN and hasattr(user_update, 'user_type'):
        if user_update.user_type:
            user_dict['user_type'] = user_update.user_type
        else:
            if 'user_type' in user_dict:
                del user_dict['user_type']

    try:
        db_client.users.find_one_and_update(
            {"_id": ObjectId(user_update.id)},
            {"$set": user_dict},
        )
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="No se ha actualizado el usuario",
        )

    return {
        "user_id": str(current_user.id)
    }

@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(id: str, current_user: User = Depends(get_current_user)):
    if str(current_user.id) != id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No tienes permiso para actualizar este usuario",
        )
    
    user_id = ObjectId(id)
    
    # Elimina todas las críticas realizadas por el usuario
    db_client.critics.delete_many({"userId": str(user_id)})
    
    # Elimina todos los pesos de puntuaciones del usuario
    db_client.score_weights.delete_many({"user_id": str(user_id)})
    
    # Elimina todos los juegos de la lista de juegos del usuario
    db_client.user_games.delete_many({"userId": str(user_id)})
    
    # Elimina todos los juegos de la wishlist del usuario y si la lista de userIds se queda vacía, elimina el juego de la wishlist
    db_client.wishlist.update_many(
        {"userIds": str(user_id)},
        {"$pull": {"userIds": str(user_id)}}
    )
    db_client.wishlist.delete_many({"userIds": {"$size": 0}})
    
    # Elimina el usuario
    found = db_client.users.find_one_and_delete({"_id": user_id})
    
    if not found:
        return {"error": "No se ha eliminado el usuario"}

    return {"message": "Usuario y todos sus datos relacionados eliminados correctamente"}

