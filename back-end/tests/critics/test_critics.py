import pytest
from bson import ObjectId
from unittest.mock import MagicMock, patch
from routers.critics.critics import (
    search_critic_by_id,
    validate_critic_score,
    create_critic,
    get_critics_by_user_id,
    delete_critic,
    CustomHTTPException,
)
from db.models.user import UserDB, UserType
from db.models.critic import Critic
from fastapi import HTTPException, status
from datetime import datetime
from tests.mocks.mock_users import user_db_mock_1
from tests.mocks.mock_critics import critic_mock_1, critic_mock_1_data
from tests.mocks.mock_games import game_mock_4

@pytest.fixture
def mock_db_client():
    return MagicMock()

@pytest.fixture
def mock_auth_user():
    return user_db_mock_1

def test_search_critic_by_id(mock_db_client):  # Eliminar mock_critic como argumento
    # Definir el ObjectId del crítico simulado
    critic_id = critic_mock_1.id

    # Establecer el comportamiento del mock del cliente de la base de datos
    with patch('routers.critics.critics.db_client', mock_db_client):
        # Establecer el comportamiento del mock para la consulta de un crítico
        mock_db_client.critics.find_one.return_value = critic_mock_1_data

        # Llamar a la función y verificar el resultado
        result = search_critic_by_id(critic_id)
        assert result.userId == critic_mock_1.userId

def test_validate_critic_score(mock_db_client):
    # Simular notas existentes
    existing_scores = [3, 4, 5]
    
    # Mockear la función find de db_client
    mock_db_client.critics.find.return_value = [{"score": score} for score in existing_scores]

    # Mockear el path a db_client
    with patch('routers.critics.critics.db_client', mock_db_client):
        # Probar con una nota que no es un outlier
        valid_score = 4
        assert validate_critic_score(valid_score, "test_game_id") == True

        # Probar con una nota que es un outlier
        invalid_score = 10
        assert validate_critic_score(invalid_score, "test_game_id") == False

@pytest.mark.asyncio
async def test_create_critic_toxic(mock_auth_user, mock_db_client):
    # Definir los parámetros de prueba
    gameId = "test_game_id"
    text = "Test critic"
    score = 5

    # Configurar el mock de Detoxify
    with patch("routers.critics.critics.Detoxify") as mock_detector:
        detector_instance = MagicMock()
        mock_detector.return_value = detector_instance
        detector_instance.predict.return_value = {"toxicity": 0.6}

        # Llamar a la función y verificar que se lance una excepción
        with pytest.raises(HTTPException) as excinfo:
            await create_critic(gameId=gameId, text=text, score=score, current_user=mock_auth_user)
        
        assert excinfo.value.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

@pytest.mark.asyncio
async def test_create_critic_invalid_score(mock_auth_user, mock_db_client):
    # Definir los parámetros de prueba
    gameId = "test_game_id"
    text = "Test critic"
    score = 20

    # Configurar el mock del cliente de base de datos
    with patch('routers.critics.critics.db_client', mock_db_client):
        # Configurar el mock para el método insert_one
        mock_db_client.critics.insert_one.side_effect = Exception("Insertion failed")

        # Llamar a la función y verificar que se lance una excepción
        with pytest.raises(CustomHTTPException) as excinfo:
            await create_critic(gameId=gameId, text=text, score=score, current_user=mock_auth_user)
        
        assert excinfo.value.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.asyncio
async def test_create_critic_existing_critic(mock_auth_user, mock_db_client):
    # Definir los parámetros de prueba
    gameId = "test_game_id"
    text = "Test critic"
    score = 5

    # Configurar el comportamiento del mock para que devuelva un crítico existente
    mock_db_client.critics.find_one.return_value = {"existing_critic": True}

    # Llamar a la función y verificar que se lance una excepción
    with patch('routers.critics.critics.db_client', mock_db_client):
        with pytest.raises(CustomHTTPException) as excinfo:
            await create_critic(gameId=gameId, text=text, score=score, current_user=mock_auth_user)
        
        assert excinfo.value.status_code == status.HTTP_400_BAD_REQUEST
        assert excinfo.value.detail == "Ya existe una crítica para este usuario y juego"


@pytest.mark.asyncio
async def test_create_critic_success():
    # Definir los parámetros de prueba
    gameId = game_mock_4.id
    text = "Test critic"
    score = 5

    # Configurar el mock del cliente de la base de datos
    mock_db_client = MagicMock()

    # Configurar el comportamiento del mock para que devuelva None, indicando que no existe una crítica previa
    mock_db_client.critics.find_one.return_value = None

    # Configurar el comportamiento del mock para que insert_one devuelva un resultado simulado
    mock_db_client.critics.insert_one.return_value = MagicMock(inserted_id="mocked_id")

    # Utilizar patch para sustituir db_client con el mock_db_client durante la ejecución de la prueba
    with patch('routers.critics.critics.db_client', mock_db_client):
        try:
            # Llamar a la función
            result = await create_critic(gameId=gameId, text=text, score=score, current_user=user_db_mock_1)

            # Verificar que se haya creado la crítica
            assert result["message"] == "Crítica creada exitosamente"
            assert result["critic_id"] == "mocked_id"
        except CustomHTTPException as e:
            # Verificar si la excepción se debe a la existencia de una crítica previa
            if e.status_code == status.HTTP_400_BAD_REQUEST and e.detail == "Ya existe una crítica para este usuario y juego":
                pytest.fail("Se levantó una excepción inesperada: Ya existe una crítica para este usuario y juego")
            else:
                pytest.fail(f"Se levantó una excepción: {e.detail}")

@pytest.mark.asyncio
async def test_get_critics_by_user_id(mock_auth_user, mock_db_client):
    # Configurar el comportamiento del mock para que devuelva críticos simulados
    mock_db_client.critics.find.return_value = [critic_mock_1]

    # Llamar a la función y verificar el resultado
    result = await get_critics_by_user_id(current_user=mock_auth_user)
    assert len(result) == 1

@pytest.mark.asyncio
async def test_delete_critic(mock_auth_user, mock_db_client):
    # Configurar el comportamiento del mock para que devuelva None al buscar la crítica
    mock_db_client.critics.find_one.return_value = None

    # Llamar a la función y verificar que se lance la excepción HTTPException
    with pytest.raises(HTTPException) as excinfo:
        await delete_critic(critic_id=str(critic_mock_1.id), current_user=mock_auth_user)
    
    assert excinfo.value.status_code == status.HTTP_404_NOT_FOUND
    assert excinfo.value.detail == "La crítica no se encontró."

@patch('routers.critics.critics.db_client')
def test_search_critic_by_id(mock_db_client):
    # Definir el ObjectId del crítico simulado
    critic_id = critic_mock_1.id

    # Establecer el comportamiento del mock para la consulta de un crítico
    mock_db_client.critics.find_one.return_value = critic_mock_1_data

    # Llamar a la función y verificar el resultado
    result = search_critic_by_id(critic_id)
    assert result.userId == critic_mock_1.userId