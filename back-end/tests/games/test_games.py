import pytest
from bson import ObjectId
from fastapi import HTTPException
from unittest.mock import MagicMock, patch
from tests.mocks.mock_games import game_mock_1, game_mock_2, game_mock_3, game_mock_4, game_mock_5, game_mock_6
from tests.mocks.mock_users import user_mock_1, user_mock_2, user_mock_3
from routers.games.games import (
    search_game,
    get_sorted_games,
    create_game_score_tuple_list,
    get_unique_platforms,
    get_unique_genres,
    games_list,
    search_games_by_title,
    get_average_game_score,
    addGame,
)

# Fixtures
@pytest.fixture
def games_sorted():
    return [
        game_mock_1,
        game_mock_2,
        game_mock_3,
        game_mock_4,
        game_mock_5,
    ]

@pytest.fixture
def mock_db_client():
    def create_mock_db_client(return_value):
        mock_db = MagicMock()
        mock_db.games.find.return_value.sort.return_value.limit.return_value = return_value
        return mock_db

    return create_mock_db_client

@pytest.fixture
def mock_db_client_game():
    db_client = MagicMock()
    db_client.games.find_one.return_value = game_mock_5
    return db_client

def test_search_game_exists(mock_db_client_game):
    # Crear un ObjectId para el juego simulado
    game_id = game_mock_5["_id"]
    
    # Usar el mock_db_client para agregar el juego simulado a la base de datos
    
    # Parchear el cliente de la base de datos
    with patch('routers.games.games.db_client', mock_db_client_game):
        # Llamar a la función search_game con el _id del juego simulado
        game = search_game("_id", game_id)
        
        # Verificar que el juego existe
        assert game is not None


def test_search_game_not_found():
    game_id = "65f9d26ae768a20a9c75260d"
    game = search_game("_id", game_id)
    assert game is None

def test_get_sorted_games_asc(mock_db_client):
    mock_db = mock_db_client([game_mock_1,game_mock_2])
    with patch('routers.games.games.db_client', mock_db):
        sorted_games = get_sorted_games(sort_field="release_date", limit=2)
        assert len(sorted_games) == 2
        assert sorted_games[0].title == "Game 1"

def test_get_unique_platforms():
    unique_platforms = get_unique_platforms()
    assert len(unique_platforms) > 0

def test_get_unique_genres():
    unique_genres = get_unique_genres()
    assert len(unique_genres) > 0

@pytest.mark.asyncio
async def test_games_list():
    # Definir parámetros de prueba
    platforms = "platform1,platform2"
    genres = "genre1,genre2"
    min_score = 3.0
    max_score = 4.5
    upcoming = True
    best = True
    new = False
    limit = 5
    current_user_id = "user_id"

    # Llamar al endpoint de games_list
    result = await games_list(
        platforms=platforms,
        genres=genres,
        min_score=min_score,
        max_score=max_score,
        upcoming=upcoming,
        best=best,
        new=new,
        limit=limit,
        current_user_id=current_user_id
    )

    # Realizar aserciones sobre el resultado
    assert len(result) <= limit

@pytest.mark.asyncio
async def test_search_games_by_title():
    # Definir parámetros de prueba
    title = "Test Game"
    limit = 10
    current_user_id = "user_id"

    # Llamar al endpoint de search_games_by_title
    result = await search_games_by_title(
        title=title,
        limit=limit,
        current_user_id=current_user_id
    )

    # Realizar aserciones sobre el resultado
    assert len(result) <= limit


@pytest.mark.asyncio
async def test_get_average_game_score():
    # Definir parámetros de prueba
    game_id = ObjectId()  # Reemplazar con el ObjectId del juego de prueba
    current_user_id = ObjectId()  # Reemplazar con el ObjectId del usuario de prueba

    # Definir el mock para db_client
    mock_db_client = MagicMock()

    # Establecer el comportamiento esperado del mock
    # Mockear la lista de juegos con sus puntuaciones promedio
    mock_db_client.games.aggregate.return_value = [game_mock_6]

    # Patchear db_client para usar el mock en la función
    with patch('routers.critics.critics.db_client', mock_db_client):
        # Llamar a la función get_average_game_score con los parámetros de prueba
        result = get_average_game_score(str(game_id), str(current_user_id))

        # Realizar aserciones sobre el resultado
        assert result is not None
        assert result.score == 4.5  # Reemplazar con la puntuación esperada del juego de prueba
