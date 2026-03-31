from beanie import Document
from pymongo import IndexModel

class User(Document):
    name: str
    email: str
    password: str

    class Settings:
        name = "users"
        indexes = [
            IndexModel("email", unique=True)
        ]