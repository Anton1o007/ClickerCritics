from pydantic import BaseModel
from datetime import datetime
from db.models.user import UserType

class Critic(BaseModel):
    id: str
    userId: str
    author: str
    gameId: str
    text: str
    score: int
    creation_date: datetime
    critic_type: UserType