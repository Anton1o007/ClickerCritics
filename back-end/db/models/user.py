from typing import Optional
from pydantic import BaseModel
from enum import Enum

class UserType(str, Enum):
    PROFESSIONAL = "PROFESSIONAL"
    USER = "USER"
    ADMIN = "ADMIN"

class User(BaseModel):
    id: str
    username: str
    email: str
    avatar: str
    user_type: UserType
    description: Optional[str]

class UserDB(User):
    password: str

class UserUpdate(User):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]
    avatar: Optional[str]
    description: Optional[str]