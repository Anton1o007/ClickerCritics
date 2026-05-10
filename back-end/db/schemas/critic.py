def critic_schema(critic) -> dict:
    critic_data = {
        "id": str(critic["_id"]),
        "userId": str(critic.get("userId","")),
        "author": str(critic.get("author","")),
        "gameId": str(critic.get("gameId","")),
        "text": critic["text"],
        "score": str(critic["score"]),
        "creation_date": critic["creation_date"].isoformat(),
        "critic_type": str(critic["critic_type"]),
    }
    return critic_data