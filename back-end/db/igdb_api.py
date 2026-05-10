import requests
from db.schemas.game import game_igdb_schema
from datetime import datetime
from pymongo import UpdateOne
import calendar

def get_igdb_access_token(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET):
    token_url = 'https://id.twitch.tv/oauth2/token'
    payload = {
        'client_id': TWITCH_CLIENT_ID,
        'client_secret': TWITCH_CLIENT_SECRET,
        'grant_type': 'client_credentials'
    }

    response = requests.post(token_url, params=payload)
    if response.ok:
        return response.json().get('access_token')
    else:
        print(f'Error al obtener el token de acceso de IGDB. Código de estado: {response.status_code}')
        return None

def get_company_name(company_id, igdb_client_id, igdb_access_token):
    involved_companies_url = 'https://api.igdb.com/v4/involved_companies'
    companies_url = 'https://api.igdb.com/v4/companies'
    
    headers = {
        'Client-ID': igdb_client_id,
        'Authorization': f'Bearer {igdb_access_token}',
        'Content-Type': 'application/json',
    }

    # Obtener información de la compañía desde involved_companies
    body_involved_companies = f'fields company; where id={company_id};'
    response_involved_companies = requests.post(involved_companies_url, headers=headers, data=body_involved_companies)

    if response_involved_companies.ok:
        company_data = response_involved_companies.json()
        company_id = company_data[0]['company'] if company_data else ""
    else:
        return ""

    # Obtener el nombre de la compañía desde companies
    body_companies = f'fields name; where id={company_id};'
    response_companies = requests.post(companies_url, headers=headers, data=body_companies)

    if response_companies.ok:
        company_data = response_companies.json()
        return company_data[0]['name'] if company_data else ""
    else:
        return ""

def update_or_insert_platform(platform_name, db_client):
    # Busca la plataforma en la colección
    platform = db_client.platforms.find_one({"platform": platform_name})

    # Si la plataforma no existe, la inserta
    if not platform:
        db_client.platforms.insert_one({"platform": platform_name, "games_count": 1})
    else:
        # Si la plataforma ya existe, actualiza el contador de juegos
        db_client.platforms.update_one({"_id": platform["_id"]}, {"$inc": {"games_count": 1}})

    
def get_age_rating(category_id, rating_id):
    age_rating_category_enum = {
        1: 'ESRB',
        2: 'PEGI',
        3: 'CERO',
        4: 'USK',
        5: 'GRAC',
        6: 'CLASS_IND',
        7: 'ACB',
    }

    age_rating_rating_enum = {
        1: '3',
        2: '7',
        3: '12',
        4: '16',
        5: '18',
        6: 'RP',
        7: 'EC',
        8: 'E',
        9: 'E10',
        10: 'T',
        11: 'M',
        12: 'AO',
        13: 'CERO_A',
        14: 'CERO_B',
        15: 'CERO_C',
        16: 'CERO_D',
        17: 'CERO_Z',
        18: 'USK_0',
        19: 'USK_6',
        20: 'USK_12',
        21: 'USK_16',
        22: 'USK_18',
        23: 'GRAC_ALL',
        24: 'GRAC_Twelve',
        25: 'GRAC_Fifteen',
        26: 'GRAC_Eighteen',
        27: 'GRAC_TESTING',
        28: 'CLASS_IND_L',
        29: 'CLASS_IND_Ten',
        30: 'CLASS_IND_Twelve',
        31: 'CLASS_IND_Fourteen',
        32: 'CLASS_IND_Sixteen',
        33: 'CLASS_IND_Eighteen',
        34: 'ACB_G',
        35: 'ACB_PG',
        36: 'ACB_M',
        37: 'ACB_MA15',
        38: 'ACB_R18',
        39: 'ACB_RC',
    }

    category = age_rating_category_enum.get(category_id, '')
    rating = age_rating_rating_enum.get(rating_id, '')

    return f"{category} {rating}"

def modify_igdb_image_url(original_url, size_type):
    if original_url:
        base_url = 'https:' + original_url
        modified_url = base_url.replace('/t_thumb/', f'/t_{size_type}/')

        return modified_url

    return None

def build_igdb_image_url(image_id, size_type):
    base_url = 'https://images.igdb.com/igdb/image/upload/t_{size}/{hash}.jpg'
    size_url = f't_{size_type}_2x'

    return base_url.format(size=size_url, hash=image_id)


def fetch_games_data(igdb_access_token, igdb_client_id, year):
    url_games = 'https://api.igdb.com/v4/games'
    headers = {
        'Client-ID': igdb_client_id,
        'Authorization': f'Bearer {igdb_access_token}',
        'Content-Type': 'application/json',
    }

    games_with_required_fields = []

    for month in range(1, 13):
        start_date = datetime(year, month, 1)
        _, last_day = calendar.monthrange(year, month)
        end_date = datetime(year, month, last_day)

        start_timestamp = int(start_date.timestamp())
        end_timestamp = int(end_date.timestamp())

        body = (
            f'fields name, summary, first_release_date, genres.name, platforms.name, age_ratings.category, age_ratings.rating, involved_companies, cover.url, screenshots.url, videos.video_id;'
            f' where name != null & summary != null & first_release_date != null & cover.url != null & genres.name != null & platforms.name != null & age_ratings.category != null & age_ratings.rating != null & involved_companies != null & first_release_date >= {start_timestamp} & first_release_date <= {end_timestamp};'
            ' sort first_release_date desc;'
            ' limit 500;'
        )

        response_games = requests.post(url_games, headers=headers, data=body)
        if response_games.ok:
            games = response_games.json()
            for game in games:
                game['genres'] = [genre['name'] for genre in game.get('genres', [])]
                game['platforms'] = [platform['name'] for platform in game.get('platforms', [])]
                game['cover'] = modify_igdb_image_url(game.get('cover', {}).get('url', ''), 'cover_big')
                game['images'] = [modify_igdb_image_url(screenshot['url'], 'screenshot_big') for screenshot in game.get('screenshots', [])]
                game['videos'] = [video['video_id'] for video in game.get('videos', [])]

                involved_companies = game.get('involved_companies', [])
                if len(involved_companies) == 1:
                    company_id = involved_companies[0]
                    game['developer'] = get_company_name(company_id, igdb_client_id, igdb_access_token)
                    game['publisher'] = game['developer']
                else:
                    developer_data = involved_companies[0]
                    publisher_data = involved_companies[1]

                    developer_id = developer_data if developer_data else ""
                    publisher_id = publisher_data if publisher_data else ""

                    game['developer'] = get_company_name(developer_id, igdb_client_id, igdb_access_token)
                    game['publisher'] = get_company_name(publisher_id, igdb_client_id, igdb_access_token)

                age_ratings = game.get('age_ratings', [{}])
                if age_ratings and 'category' in age_ratings[0] and 'rating' in age_ratings[0]:
                    age_rating_category = int(age_ratings[0]['category'])
                    age_rating_rating = int(age_ratings[0]['rating'])
                else:
                    age_rating_category = 0
                    age_rating_rating = 0

                game['age_rating'] = get_age_rating(age_rating_category, age_rating_rating)

                games_with_required_fields.append(game)
        else:
            print(f'Error al obtener los juegos de {calendar.month_name[month]} de {year}. Código de estado: {response_games.status_code}')

    return games_with_required_fields



def get_and_store_games(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, db_client):
    igdb_access_token = get_igdb_access_token(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET)
    if igdb_access_token:
        games_data = fetch_games_data(igdb_access_token, TWITCH_CLIENT_ID,2021)
        if games_data:
            games_to_insert = [game_igdb_schema(game) for game in games_data]

            # Actualiza o inserta juegos en la base de datos
            db_client.games.insert_many(games_to_insert)

            # Actualiza o inserta plataformas en la colección
            update_requests_platforms = [
                UpdateOne({"platform": platform_name}, {"$inc": {"games_count": 1}}, upsert=True)
                for game in games_data
                for platform_name in game.get("platforms", [])
            ]
            db_client.platforms.bulk_write(update_requests_platforms)

            # Actualiza o inserta géneros en la colección
            update_requests_genres = [
                UpdateOne({"name": genre_name}, {"$inc": {"games_count": 1}}, upsert=True)
                for game in games_data
                for genre_name in game.get("genres", [])
            ]
            db_client.genres.bulk_write(update_requests_genres)

            return len(games_to_insert)
    return 0