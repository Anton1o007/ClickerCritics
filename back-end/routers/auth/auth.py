from typing import Optional
import os
from fastapi import APIRouter, HTTPException, status, Depends, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from db.models.user import UserType, UserDB, User
from db.schemas.user import user_schema, userdb_schema
from db.client import db_client
from bson import ObjectId

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}}
)

SECRET = os.getenv("JWT_SECRET", "change-me-in-env")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_DURATION = int(os.getenv("ACCESS_TOKEN_DURATION_MINUTES", "60"))

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

crypt = CryptContext(schemes=["bcrypt"])

def search_user(field: str, key):
    user = db_client.users.find_one({field: key})
    if user:
        if isinstance(user, UserDB):
            return UserDB(**user_schema(user))
        else:
            return UserDB(**userdb_schema(user))
    return None


async def auth_user(token: str = Depends(oauth2)):
    exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales de autenticación inválidas",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise exception
        user = search_user("_id", ObjectId(user_id))
        if user is None:
            raise exception

        token_exp = payload.get("exp")
        current_time = datetime.utcnow()
        if token_exp:
            token_exp = datetime.fromtimestamp(token_exp)
            if token_exp < current_time:
                raise exception

        return user
    except JWTError:
        raise exception

    
@router.post("/register")
async def register(username: str = Form(...), email: str = Form(...), password: str = Form(...), avatar: str = Form("", alias="avatar")):
    user = search_user("username", username)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El usuario ya existe"
        )
    
    hashed_password = crypt.hash(password)

    user_type = UserType.USER
    
    user_data = {
        "username": username,
        "email": email,
        "avatar": avatar,
        "password": hashed_password,
        "user_type": user_type,
        "description": "",
        
    }
    
    id = db_client.users.insert_one(user_data).inserted_id

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_DURATION)
    access_token = {
        "sub": username,
        "exp": expire
    }
    access_token["user_id"] = str(id)

    return {
        "access_token": jwt.encode(access_token, SECRET, algorithm=ALGORITHM),
        "token_type": "bearer",
        "user_id": str(id),
        "username": username,
        "exp": access_token.get("exp")
    }


@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user = search_user("username", form.username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="El usuario no existe"
        )
    if not crypt.verify(form.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña no es correcta"
        )

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_DURATION)
    access_token = {
        "sub": user.username,
        "exp": expire
    }

    user_id = str(user.id)
    access_token["user_id"] = user_id

    return {
        "access_token": jwt.encode(access_token, SECRET, algorithm=ALGORITHM),
        "token_type": "bearer",
        "user_id": user_id,
        "username": user.username,
        "exp": access_token.get("exp")
    }

@router.post("/renew-token")
async def renew_token(current_user: UserDB = Depends(auth_user)):

    expires = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_DURATION)
    access_token = {
        "sub": current_user.username,
        "exp": expires
    }
    access_token["user_id"] = current_user.id
    return {"access_token": jwt.encode(access_token, SECRET, algorithm=ALGORITHM),
            "token_type": "bearer",
            "user_id": current_user.id,
            "username": current_user.username,
            "exp": access_token.get("exp")}
