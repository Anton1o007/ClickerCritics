import os

from pymongo import MongoClient

# Base de datos remota
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "test")
db_client = MongoClient(MONGODB_URI)[MONGODB_DB_NAME]
