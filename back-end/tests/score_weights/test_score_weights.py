import pytest
from unittest.mock import MagicMock, patch
from routers.score_weights.score_weights import upsert_weight_to_user, get_user_weights
from tests.mocks.mock_users import user_mock_1


@pytest.fixture
def mock_auth_user():
    return user_mock_1


@pytest.fixture
def mock_db_client():
    return MagicMock()

def test_upsert_weight_to_user():
    # Creamos un mock para la base de datos
    mock_db_client = MagicMock()

    # Configuramos el retorno de find_one
    mock_db_client.score_weights.find_one.return_value = {"user_id": "existing_user_id"}

    # Aplicamos el parche para reemplazar el db_client en la función con nuestro mock
    with patch("routers.score_weights.score_weights.db_client", mock_db_client):
        # Llamamos a la función sin usar await
        upsert_weight_to_user("existing_user_id", 0.5, 0.6)

    # Verificamos que se haya llamado correctamente a los métodos de la base de datos
    mock_db_client.score_weights.find_one.assert_called_once_with({"user_id": "existing_user_id"})
    mock_db_client.score_weights.update_one.assert_called_once_with(
        {"user_id": "existing_user_id"},
        {"$set": {"user_weight": 0.5, "professional_weight": 0.6}}
    )


@pytest.mark.asyncio
async def test_get_user_weights(mock_db_client):
    with patch('routers.score_weights.score_weights.db_client', mock_db_client):
        # Define datos de prueba
        user_id = str(user_mock_1.id)

        # Mock db_client.score_weights.find_one para simular un usuario existente
        mock_db_client.score_weights.find_one.return_value = {
            "user_id": user_id,
            "user_weight": 2.0,  # Corregimos los valores devueltos
            "professional_weight": 1.5  # Corregimos los valores devueltos
        }

        # Ejecuta la función
        result = get_user_weights(user_id)  # No se necesita 'await' aquí

        # Verifica el resultado
        assert result == {"user_weight": 2.0, "professional_weight": 1.5}
