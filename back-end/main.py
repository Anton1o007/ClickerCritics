import os
from fastapi import FastAPI
from routers.auth import auth
from routers.users import users
from routers.games import games
from routers.critics import critics
from routers.user_games import user_games
from routers.score_weights import score_weights
from routers.wishlist import wishlist
# from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
# from db.client import db_client
from db.igdb_api import get_igdb_access_token, get_and_store_games
from tests import test_all

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(games.router)
app.include_router(critics.router)
app.include_router(user_games.router)
app.include_router(score_weights.router)
app.include_router(wishlist.router)

TWITCH_CLIENT_ID = os.getenv("TWITCH_CLIENT_ID", "")
TWITCH_CLIENT_SECRET = os.getenv("TWITCH_CLIENT_SECRET", "")

@app.get("/")
async def root():
    return {"message": "Welcome to the Clicker Critics API"}

# Ruta para obtener y almacenar los juegos de IGDB en MongoDB
# @app.get("/fetch_and_store_games")
# async def fetch_and_store_games():
#     igdb_access_token = get_igdb_access_token(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET)
#     if igdb_access_token:
#         games_inserted = get_and_store_games(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, db_client)
#         return {"message": f'Se han insertado {games_inserted} juegos en la base de datos.'}
#     else:
#         return {"message": "No se pudo obtener el token de acceso de IGDB."}
    
# Llamar al método run_tests() desde test_all.py
# test_all.run_tests()
