# Importar el módulo necesario
from unittest.mock import MagicMock
from bson import ObjectId
from datetime import datetime
from db.models.game import Game

# Crear instancias de mocks de juegos con la nueva función create_game_mock
game_mock_1 = Game(
    id=str(ObjectId("65f9d26ae768a20a9c75260d")),
    title="Game 1",
    description="Description of Game 1",
    release_date=datetime(2023, 1, 1),
    genres=["Action", "Adventure"],
    platforms=["PC", "PlayStation"],
    age_rating="18+",
    developer="Developer 1",
    publisher="Publisher 1",
    cover="game1_cover.jpg",
    images=["game1_image1.jpg", "game1_image2.jpg"],
    videos=["game1_video1.mp4", "game1_video2.mp4"]
)

game_mock_2 = Game(
    id=str(ObjectId("65f9d26ae768a20a9c75260e")),
    title="Game 2",
    description="Description of Game 2",
    release_date=datetime(2023, 2, 1),
    genres=["RPG"],
    platforms=["PC", "Xbox"],
    age_rating="16+",
    developer="Developer 2",
    publisher="Publisher 2",
    cover="game2_cover.jpg",
    images=["game2_image1.jpg", "game2_image2.jpg"],
    videos=["game2_video1.mp4", "game2_video2.mp4"]
)

game_mock_3 = Game(
    id=str(ObjectId("65f9d26ae768a20a9c75260f")),
    title="Game 3",
    description="Description of Game 3",
    release_date=datetime(2023, 3, 1),
    genres=["Strategy", "Simulation"],
    platforms=["PC"],
    age_rating="12+",
    developer="Developer 3",
    publisher="Publisher 3",
    cover="game3_cover.jpg",
    images=["game3_image1.jpg", "game3_image2.jpg"],
    videos=["game3_video1.mp4", "game3_video2.mp4"]
)

game_mock_4 = Game(
    id=str(ObjectId("65f9d26ae768a20a9c752610")),
    title="Game 4",
    description="Description of Game 4",
    release_date=datetime(2023, 4, 1),
    genres=["Puzzle"],
    platforms=["Mobile"],
    age_rating="All ages",
    developer="Developer 4",
    publisher="Publisher 4",
    cover="game4_cover.jpg",
    images=["game4_image1.jpg", "game4_image2.jpg"],
    videos=["game4_video1.mp4", "game4_video2.mp4"]
)

game_mock_5 = {
    "_id": ObjectId("65f9d26ae768a20a9c752611"),
    "title": "Game 5",
    "description": "Description of Game 5",
    "release_date": datetime(2023, 5, 1),
    "genres": ["Sports"],
    "platforms": ["PlayStation", "Xbox"],
    "age_rating": "E for Everyone",
    "developer": "Developer 5",
    "publisher": "Publisher 5",
    "cover": "game5_cover.jpg",
    "images": ["game5_image1.jpg", "game5_image2.jpg"],
    "videos": ["game5_video1.mp4", "game5_video2.mp4"]
}

game_mock_6 = {
    "_id": ObjectId("65f9d26ae768a20a9c752611"),
    "title": "Game 5",
    "description": "Description of Game 5",
    "release_date": datetime(2023, 5, 1),
    "genres": ["Sports"],
    "platforms": ["PlayStation", "Xbox"],
    "age_rating": "E for Everyone",
    "developer": "Developer 5",
    "publisher": "Publisher 5",
    "cover": "game5_cover.jpg",
    "images": ["game5_image1.jpg", "game5_image2.jpg"],
    "videos": ["game5_video1.mp4", "game5_video2.mp4"],
    "average_score": 4.5
}
