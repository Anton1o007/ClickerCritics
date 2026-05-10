import pytest
from pytest_mock import mocker
from bson import ObjectId
from fastapi import HTTPException
from unittest.mock import MagicMock, patch
from db.models.user import UserType, User
from routers.users.users import update_user, delete_user, get_top_genres_for_user, get_scored_games, user
from tests.mocks.mock_games import game_mock_1, game_mock_2
from tests.mocks.mock_users import user_mock_1, user_mock_1_data

@pytest.fixture
def user_id():
    return str(ObjectId())

@pytest.fixture
def user_data():
    return {
        "_id": ObjectId(),
        "username": "testuser",
        "password": "testpassword",
        "user_type": UserType.ADMIN
    }

# Test para verificar la actualización de usuario
@pytest.mark.asyncio
async def test_update_user(mocker):
    current_user = MagicMock()
    current_user.id = ObjectId()  # Utiliza un ObjectId válido
    current_user.user_type = UserType.ADMIN
    mocker.patch('routers.users.users.CryptContext.hash', return_value="hashed_password")
    db_client = mocker.patch('routers.users.users.db_client')
    
    # Simula que la actualización en la base de datos se realiza correctamente
    async def mock_find_one_and_update(*args, **kwargs):
        if args[1]['$set']:
            return {"_id": args[1]['$set']['_id']}
        else:
            return None

    db_client.users.find_one_and_update.side_effect = mock_find_one_and_update
    
    # Asigna el mismo ID de current_user a user_update
    user_update = current_user
    
    result = await update_user(user_update, current_user)

    assert result == {"user_id": str(current_user.id)}  # Verifica que el ID en el resultado sea el mismo que el de current_user

# Test para verificar la eliminación de usuario
@pytest.mark.asyncio
async def test_delete_user(mocker):
    user_id = str(ObjectId())  # Utiliza un ObjectId válido
    current_user = MagicMock()
    current_user.id = ObjectId()  # Utiliza un ObjectId válido
    current_user.user_type = UserType.ADMIN
    mocker.patch('routers.users.users.db_client.users.find_one_and_delete', return_value={"_id": ObjectId()})  # Utiliza un ObjectId válido
    
    result = await delete_user(user_id, current_user)

    assert result == {"error": "No se ha eliminado el usuario"}

# Test para verificar la obtención de juegos calificados por un usuario
@pytest.mark.asyncio
async def test_get_scored_games(mocker):
    # Define un ID de usuario de prueba
    user_id = "user_id"

    # Mock de la base de datos para devolver críticas de usuario
    mocked_db_client = mocker.patch('routers.users.users.db_client')
    mocked_db_client.critics.find.return_value = [
        {"gameId": ObjectId(), "score": 4.5},
        {"gameId": ObjectId(), "score": 3.7},
        {"gameId": ObjectId(), "score": 2.0}
    ]

    # Mock de la función search_game
    mocker.patch('routers.users.users.search_game', side_effect=[
        game_mock_1,
        game_mock_2,
        None  # Simula que un juego no está disponible
    ])

    # Llama a la función para obtener los juegos calificados
    scored_games = await get_scored_games(user_id)  # Utiliza await aquí

    # Verifica que los juegos calificados sean los esperados
    assert len(scored_games) == 2
    assert scored_games[0].game.title == game_mock_1.title
    assert scored_games[0].score == 4.5
    assert scored_games[1].game.title == game_mock_2.title
    assert scored_games[1].score == 3.7

#Test para verificar la obtención de un usuario por ID
@pytest.mark.asyncio
async def test_get_user(mocker):
    # Define un ID de usuario de prueba
    user_id = "65f9d26ae768a20a9c75260d"

    # Mock de la base de datos para devolver un usuario
    mocked_db_client = mocker.patch('routers.users.users.db_client', MagicMock())

    mocked_db_client.users.find_one.return_value = user_mock_1_data  # Usa el usuario_mock_1 definido en mock_users

    # Llama a la función para obtener un usuario
    user_obj = await user(str(user_id))

    # Verifica que el usuario devuelto sea el esperado
    assert user_obj.id == user_id
    assert user_obj.username == user_mock_1.username
    assert user_obj.email == user_mock_1.email
    assert user_obj.user_type == user_mock_1.user_type
