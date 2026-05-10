import pytest
from fastapi import status
from bson import ObjectId
from routers.wishlist.wishlist import (add_game_to_wishlist_route, remove_game_from_wishlist_route,
                                        is_game_added_to_wishlist_route)
from db.client import db_client
from tests.mocks.mock_games import game_mock_1, game_mock_2
from tests.mocks.mock_users import user_mock_1

@pytest.fixture
def mock_user():
    return user_mock_1

@pytest.fixture
def mock_game_id():
    return str(game_mock_1.id)

@pytest.fixture
def mock_db_client(mocker):
    db_client = mocker.MagicMock()
    return db_client

@pytest.fixture
def mock_user_id():
    return str(user_mock_1.id)

@pytest.fixture
def mock_user_wishlist():
    return [game_mock_1, game_mock_2]

@pytest.fixture
def mock_db_client(mocker, mock_user_wishlist):
    db_client = mocker.MagicMock()
    db_client.wishlist.find.return_value = mock_user_wishlist
    return db_client

@pytest.mark.asyncio
async def test_add_game_to_wishlist_route(mock_user, mock_game_id, mocker, mock_db_client):
    mocker.patch('routers.wishlist.wishlist.db_client', mock_db_client)
    response = await add_game_to_wishlist_route(game_id=mock_game_id, current_user=mock_user)
    assert response == {"message": "Juego añadido a la lista de deseos"}

@pytest.mark.asyncio
async def test_remove_game_from_wishlist_route(mock_user, mock_game_id, mocker, mock_db_client):
    mocker.patch('routers.wishlist.wishlist.db_client', mock_db_client)
    response = await remove_game_from_wishlist_route(game_id=mock_game_id, current_user=mock_user)
    assert response == {"message": "Juego eliminado de la lista de deseos"}

@pytest.mark.asyncio
async def test_is_game_added_to_wishlist_route(mock_game_id, mocker, mock_db_client):
    mocker.patch('routers.wishlist.wishlist.db_client', mock_db_client)
    response = await is_game_added_to_wishlist_route(game_id=mock_game_id, current_user_id=str(ObjectId()))
    assert response == {"is_game_added": True}
