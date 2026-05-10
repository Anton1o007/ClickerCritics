import pytest
from fastapi import status
from bson import ObjectId
from routers.user_games.user_games import (add_game_to_user, update_game_status_route,
                                           remove_game_from_user_route, is_game_added_route,
                                           get_user_games_status_route)
from db.models.user import User
from db.client import db_client
from db.models.game import GameStatus, GameStatusTuple
from tests.mocks.mock_games import game_mock_1, game_mock_2
from tests.mocks.mock_users import user_mock_1

@pytest.fixture
def mock_user():
    return user_mock_1

@pytest.fixture
def mock_game_id():
    return str(game_mock_1.id)


@pytest.fixture
def mock_game_status_tuple():
    game_status_tuple = GameStatusTuple(game=game_mock_1, status=GameStatus.NOT_STARTED)
    return game_status_tuple

@pytest.fixture
def mock_user_game():
    return {"userId": user_mock_1.id, "gameId": mock_game_id, "status": GameStatus.NOT_STARTED.value}

@pytest.fixture
def mock_db_client(mocker, mock_user_game):
    db_client = mocker.MagicMock()
    db_client.user_games.find_one.return_value = mock_user_game
    return db_client

@pytest.mark.asyncio
async def test_update_game_status_route(mock_user, mock_game_id, mocker, mock_db_client):
    mocker.patch('routers.user_games.user_games.db_client', mock_db_client)
    response = await update_game_status_route(game_id=mock_game_id, status=GameStatus.IN_PROGRESS, current_user=mock_user)
    assert response == {"message": f"Estado del juego actualizado a {GameStatus.IN_PROGRESS.value}"}

@pytest.mark.asyncio
async def test_remove_game_from_user_route(mock_user, mock_game_id, mocker, mock_db_client):
    mocker.patch('routers.user_games.user_games.db_client', mock_db_client)
    response = await remove_game_from_user_route(game_id=mock_game_id, current_user=mock_user)
    assert response == {"message": "Juego eliminado del usuario"}

@pytest.mark.asyncio
async def test_is_game_added_route(mock_game_id, mocker, mock_db_client):
    mocker.patch('routers.user_games.user_games.db_client', mock_db_client)
    response = await is_game_added_route(game_id=mock_game_id, current_user_id=str(ObjectId()))
    assert response == {"is_game_added": True}


