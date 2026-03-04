import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    DATABASE_URL = os.getenv("DATABASE_URL")

    OLLAMA_API_URL = os.getenv("OLLAMA_API_URL")
    OLLAMA_API_KEY = os.getenv("OLLAMA_API_KEY")

settings = Settings()
