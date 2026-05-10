def user_schema(user) -> dict:
    user_dict = {
        "id": str(user.get("_id")),
        "username": user.get("username"),
        "email": user.get("email"),
        "avatar": user.get("avatar"),
        "user_type": user.get("user_type"),
    }
    description = user.get("description")
    if description is not None:
        user_dict["description"] = description
    return user_dict

def userdb_schema(user) -> dict:
    user_dict = {
        "id": str(user.get("_id")),
        "username": user.get("username"),
        "email": user.get("email"),
        "avatar": user.get("avatar"),
        "password": user.get("password"),
        "user_type": user.get("user_type"),
    }
    description = user.get("description")
    if description is not None:
        user_dict["description"] = description
    return user_dict
