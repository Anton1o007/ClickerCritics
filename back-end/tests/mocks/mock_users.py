from db.models.user import User, UserType, UserDB, UserUpdate

user_mock_1 = User(
    id="65f9d26ae768a20a9c75260d",
    username="user1",
    email="user1@example.com",
    avatar="avatar1.jpg",
    user_type=UserType.USER,
    description="Description for user 1"
)

user_mock_1_data = {
    "_id": "65f9d26ae768a20a9c75260d",
    "username": "user1",
    "email": "user1@example.com",
    "avatar": "avatar1.jpg",
    "user_type": UserType.USER,
    "description": "Description for user 1"
}

user_mock_2 = User(
    id="65f9d26ae768a20a9c75260e",
    username="user2",
    email="user2@example.com",
    avatar="avatar2.jpg",
    user_type=UserType.PROFESSIONAL,
    description="Description for user 2"
)

user_mock_3 = User(
    id="65f9d26ae768a20a9c75260f",
    username="user3",
    email="user3@example.com",
    avatar="avatar3.jpg",
    user_type=UserType.ADMIN,
    description="Description for user 3"
)

user_db_mock_1 = UserDB(
    **user_mock_1.model_dump(),
    password="password1"
)

user_db_mock_2 = UserDB(
    **user_mock_2.model_dump(),
    password="password2"
)

user_db_mock_3 = UserDB(
    **user_mock_3.model_dump(),
    password="password3"
)

# Creación de mocks para UserUpdate
user_update_mock_1 = UserUpdate(**user_mock_1.model_dump(), password=None)
user_update_mock_2 = UserUpdate(**user_mock_2.model_dump(), password=None)
user_update_mock_3 = UserUpdate(**user_mock_3.model_dump(), password=None)