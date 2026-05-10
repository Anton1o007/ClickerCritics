from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, status, Depends, Header
from fastapi import HTTPException
from db.client import db_client
from bson import ObjectId
from routers.auth.auth import auth_user
from db.models.user import User
from db.models.game import Game
from db.schemas.user import userdb_schema
from routers.games.games import search_game
from utils.email_sender import send_email
from apscheduler.schedulers.background import BackgroundScheduler

router = APIRouter(prefix="/wishlist", tags=["wishlist"], responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})

def check_and_notify_users_for_game_release():
    # Obtener la fecha actual
    current_date = datetime.now().date()

    # Consultar la base de datos para obtener los juegos en la lista de deseos
    wishlist_games = db_client.wishlist.find({"notification_date": current_date})

    for wishlist_game in wishlist_games:
        # Obtener la información de los usuarios asociados al juego en la lista de deseos
        game = db_client.games.find_one({"_id": ObjectId(str(wishlist_game["gameId"]))})
        users = db_client.users.find({"_id": {"$in": [ObjectId(str(u)) for u in wishlist_game["userIds"]]}})

        for user in users:
            send_email(str(user["email"]), "¡Tu juego deseado ha sido lanzado!", f"¡Hola {user['username']}!\n\nEl juego que tenías en tu lista de deseos, '{game['title']}', ha sido lanzado hoy. ¡Disfrútalo!", game)

        db_client.wishlist.update_one(
            {"_id": wishlist_game["_id"]},
            {"$set": {"notified": True}}
        )

# Configurar el planificador de tareas
scheduler = BackgroundScheduler()
scheduler.add_job(check_and_notify_users_for_game_release, 'cron', hour=9, minute=0)  # Ejecutar la función todos los días a las 9:00 AM
scheduler.start()


def add_game_to_wishlist(user_id: str, game_id: str) -> None:
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

    # Buscar el juego en la lista de deseos
    wishlist_game = db_client.wishlist.find_one({"gameId": game_id})
    if wishlist_game:
        # El juego ya está en la lista de deseos, actualizamos la lista de userIds
        db_client.wishlist.update_one(
            {"gameId": game_id},
            {"$addToSet": {"userIds": user_id}}  # Añadir el nuevo userId a la lista si no está presente
        )
    else:
        # El juego aún no está en la lista de deseos, lo agregamos con el nuevo userId
        db_client.wishlist.insert_one({
            "gameId": game_id,
            "userIds": [user_id],
            "notification_date": game["release_date"],
            "notified": False
        })

def remove_game_from_wishlist(user_id: str, game_id: str) -> None:
    db_client.wishlist.update_one(
        {"gameId": game_id},
        {"$pull": {"userIds": user_id}}
    )

def is_game_added_to_wishlist(user_id: str, game_id: str) -> bool:
    user_game = db_client.wishlist.find_one({"gameId": game_id, "userIds": user_id})
    return user_game is not None

def get_user_wishlist(user_id: str) -> List[Game]:
    user_wishlist = db_client.wishlist.find({"userIds": user_id})
    games_list = []

    for user_game in user_wishlist:
        game = search_game("_id", ObjectId(user_game["gameId"]))
        if game:
            games_list.append(game)

    return games_list


@router.post("/add_game/{game_id}", status_code=status.HTTP_201_CREATED)
async def add_game_to_wishlist_route(game_id: str, current_user: User = Depends(auth_user)):
    add_game_to_wishlist(str(current_user.id), game_id)
    return {"message": "Juego añadido a la lista de deseos"}

@router.delete("/remove_game/{game_id}")
async def remove_game_from_wishlist_route(game_id: str, current_user: User = Depends(auth_user)):
    remove_game_from_wishlist(str(current_user.id), game_id)
    return {"message": "Juego eliminado de la lista de deseos"}

@router.get("/is_game_added/{game_id}", response_model=dict)
async def is_game_added_to_wishlist_route(game_id: str, current_user_id: Optional[str] = Header(None, convert_underscores=True)):
    is_added = is_game_added_to_wishlist(str(current_user_id), game_id)
    return {"is_game_added": is_added}

@router.get("/list/{user_id}", response_model=list[Game])
async def get_user_wishlist_route(user_id: str):
    wishlist = get_user_wishlist(user_id)
    return wishlist
