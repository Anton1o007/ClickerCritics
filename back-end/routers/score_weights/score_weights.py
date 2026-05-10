from fastapi import APIRouter, status, Depends, Request
from fastapi import HTTPException, Depends, status
from db.client import db_client
from routers.auth.auth import auth_user
from db.models.user import User

router = APIRouter(prefix="/score_weights", tags=["score_weights"], responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})


async def get_user_id_from_current_user(current_user: User = Depends(auth_user)):
    return str(current_user.id)

def upsert_weight_to_user(user_id: str, user_weight: float, professional_weight: float):
    existing_user = db_client.score_weights.find_one({"user_id": user_id})
    if existing_user:
        # Actualiza los pesos existentes del usuario
        db_client.score_weights.update_one(
            {"user_id": user_id},
            {"$set": {"user_weight": user_weight, "professional_weight": professional_weight}}
        )
    else:
        new_weight = {
            "user_id": user_id,
            "user_weight": user_weight,
            "professional_weight": professional_weight
        }
        db_client.score_weights.insert_one(new_weight)

def get_user_weights(user_id: str):
    user_weights = db_client.score_weights.find_one({"user_id": user_id})
    if not user_weights:
        return {"user_weight": 1.0, "professional_weight": 1.0}
    
    return {"user_weight": user_weights["user_weight"], "professional_weight": user_weights["professional_weight"]}


@router.post("/add_or_update_weight", status_code=status.HTTP_201_CREATED)
async def upsert_weight_route(request: Request, user_id: str = Depends(get_user_id_from_current_user)):    
    data = await request.json()
    user_weight = data.get("user_weight")
    professional_weight = data.get("professional_weight")
    
    upsert_weight_to_user(user_id, user_weight, professional_weight)
    return {"message": "Peso asignado o actualizado correctamente"}


@router.get("/get_weights", response_model=dict)
def get_weights_route(user_id: str = Depends(get_user_id_from_current_user)):
    weights = get_user_weights(user_id)
    return {
        "user_weight": weights["user_weight"],
        "professional_weight": weights["professional_weight"]
    }


