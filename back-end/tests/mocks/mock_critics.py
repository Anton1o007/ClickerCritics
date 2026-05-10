from db.models.user import UserType
from db.models.game import Game
from db.models.user import User
from datetime import datetime
from bson import ObjectId
from tests.mocks.mock_games import game_mock_1, game_mock_2,game_mock_3
from tests.mocks.mock_users import user_mock_1, user_mock_2,user_mock_3
from db.models.critic import Critic


critic_mock_1 = Critic(
    id=str(ObjectId()),
    userId=user_mock_1.id,
    author=user_mock_1.username,
    gameId=game_mock_1.id,
    text="This is a critic for Game 1",
    score=4,
    creation_date=datetime.now(),
    critic_type=UserType.USER
)

critic_mock_1_data = {
    "_id": str(ObjectId()),
    "userId": user_mock_1.id,
    "author": user_mock_1.username,
    "gameId": game_mock_1.id,
    "text": "This is a critic for Game 1",
    "score": 4,
    "creation_date": datetime.now(),
    "critic_type": "USER"
}


critic_mock_2 = Critic(
    id=str(ObjectId()),
    userId=user_mock_2.id,
    author=user_mock_2.username,
    gameId=game_mock_2.id,
    text="This is a critic for Game 2",
    score=5,
    creation_date=datetime.now(),
    critic_type=UserType.PROFESSIONAL
)

critic_mock_3 = Critic(
    id=str(ObjectId()),
    userId=user_mock_1.id,
    author=user_mock_1.username,
    gameId=game_mock_2.id,
    text="This is another critic for Game 2",
    score=3,
    creation_date=datetime.now(),
    critic_type=UserType.USER
)

critic_mock_4 = Critic(
    id=str(ObjectId()),
    userId=user_mock_2.id,
    author=user_mock_2.username,
    gameId=game_mock_1.id,
    text="This is another critic for Game 1",
    score=4,
    creation_date=datetime.now(),
    critic_type=UserType.PROFESSIONAL
)