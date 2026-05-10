from typing import List
from datetime import datetime, timezone

def game_schema(game) -> dict:
    game_data = {
        "id": str(game["_id"]),
        "title": game["title"],
        "description": game["description"] if "description" in game else "",
        "release_date": game["release_date"].isoformat() if "release_date" in game else "None",
        "genres": game["genres"] if "genres" in game else [],
        "platforms": game["platforms"] if "platforms" in game else [],
        "age_rating": game["age_rating"] if "age_rating" in game else "",
        "developer": game["developer"] if "developer" in game else "",
        "publisher": game["publisher"] if "publisher" in game else "",
        "cover": game["cover"] if "cover" in game else "",
        "images": game["images"] if "images" in game else [],
        "videos": game["videos"] if "videos" in game else []
    }
    return game_data

def game_list_schema(games: List[dict]) -> List[dict]:
    game_list = []
    for game in games:
        game_data = {
            "id": str(game["_id"]),
            "title": game["title"],
            "description": game.get("description", ""),
            "release_date": game.get("release_date").isoformat(),
            "genres": game.get("genres", []),
            "platforms": game.get("platforms", []),
            "age_rating": game.get("age_rating", ""),
            "developer": game.get("developer", ""),
            "publisher": game.get("publisher", ""),
            "cover": game.get("cover",""),
            "images": game.get("images", []),
            "videos": game.get("videos", [])
        }
        game_list.append(game_data)
    return game_list

def game_igdb_schema(game) -> dict:
    game_data = {
        "title": game.get("name", ""),
        "description": game.get("summary", ""),
        "release_date": datetime.utcfromtimestamp(game.get("first_release_date")).replace(tzinfo=timezone.utc).astimezone(tz=None),
        "genres": game.get("genres", []),
        "platforms": game.get("platforms", []),
        "age_rating": game.get("age_rating"), 
        "developer": game.get("developer"),  
        "publisher": game.get("publisher"),  
        "cover": game.get("cover", ""),
        "images": game.get("images", []),
        "videos": game.get("videos", [])
    }
    return game_data

