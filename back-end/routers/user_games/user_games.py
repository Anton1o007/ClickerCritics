from typing import Optional, List
from fastapi import APIRouter, status, Query, Depends, Header
from fastapi import HTTPException, Depends, status
from db.client import db_client
from bson import ObjectId
from routers.auth.auth import auth_user
from db.models.user import User
from db.models.game import GameStatus, GameStatusTuple
from routers.games.games import search_game

router = APIRouter(prefix="/user_games", tags=["user_games"], responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})

def add_game_to_user(user_id: str, game_id: str, status: GameStatus) -> None:
    if is_game_added_to_user(user_id, game_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El juego ya está agregado al usuario",
        )

    user = db_client.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado",
        )

    game = db_client.games.find_one({"_id": ObjectId(game_id)})
    if not game:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Juego no encontrado",
        )

    db_client.user_games.insert_one({
        "userId": user_id,
        "gameId": game_id,
        "status": status,
    })


def update_game_status(user: User, game_id: str, status: GameStatus) -> None:
    user_game = db_client.user_games.find_one({"userId": str(user.id), "gameId": game_id})
    if not user_game:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Relación usuario-juego no encontrada",
        )

    allowed_users = [str(user.id)]  # Lista de usuarios permitidos (el usuario involucrado)
    if user.user_type == "ADMIN":
        allowed_users.append("ADMIN")  # También permitir a los usuarios de tipo "ADMIN"

    if str(user.id) not in allowed_users:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No tienes permisos para modificar el estado de este juego",
        )

    db_client.user_games.update_one(
        {"userId": str(user.id), "gameId": game_id},
        {"$set": {"status": status.value}},  # Utiliza el valor de GameStatus
    )

def remove_game_from_user(user_id: str, game_id: str) -> None:
    db_client.user_games.delete_one({"userId": user_id, "gameId": game_id})

def is_game_added_to_user(user_id: str, game_id: str) -> bool:
    user_game = db_client.user_games.find_one({"userId": user_id, "gameId": game_id})
    return user_game is not None

def get_user_games_status(user_id: str) -> List[GameStatusTuple]:
    user_games = db_client.user_games.find({"userId": user_id})
    games_status_list = []

    for user_game in user_games:
        game = search_game("_id",ObjectId(user_game["gameId"]))
        game_status = GameStatus(user_game["status"])
        game_status_tuple = GameStatusTuple(game=game, status=game_status)
        games_status_list.append(game_status_tuple)

    return games_status_list

@router.post("/add_game_to_user/{game_id}/{status}", status_code=status.HTTP_201_CREATED)
async def add_game_to_user_route(game_id: str, status: GameStatus, current_user: User = Depends(auth_user)):
    add_game_to_user(str(current_user.id), game_id, status)
    return {"message": "Juego añadido al usuario"}

@router.put("/update_game_status/{game_id}/{status}", status_code=status.HTTP_200_OK)
async def update_game_status_route(game_id: str, status: GameStatus, current_user: User = Depends(auth_user)):
    update_game_status(current_user, game_id, status)
    return {"message": f"Estado del juego actualizado a {status.value}"}

@router.delete("/remove_game_from_user/{game_id}")
async def remove_game_from_user_route(game_id: str, current_user: User = Depends(auth_user)):
    remove_game_from_user(str(current_user.id), game_id)
    return {"message": "Juego eliminado del usuario"}

@router.get("/is_game_added/{game_id}", response_model=dict)
async def is_game_added_route(game_id: str, current_user_id: Optional[str] = Header(None, convert_underscores=True)):
    is_added = is_game_added_to_user(str(current_user_id), game_id)
    return {"is_game_added": is_added}

@router.get("/list/{user_id}", response_model=list[GameStatusTuple])
async def get_user_games_status_route(user_id: str):
    games_status = get_user_games_status(user_id)
    return games_status


