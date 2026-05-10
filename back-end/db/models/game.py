from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class GameStatus(str, Enum):
    NOT_STARTED = "NOT_STARTED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class Game(BaseModel):
    id: str
    title: str
    description: str
    release_date: datetime
    genres: List[str]
    platforms: List[str]
    age_rating: str
    developer: str
    publisher: str
    cover: str
    images: List[str]
    videos: List[str]

class GameScoreTuple(BaseModel):
    game: Game
    score: float | None

class GameStatusTuple(BaseModel):
    game: Game
    status: GameStatus


