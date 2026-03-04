from fastapi import FastAPI
from app.database import Base, engine
from app.routes import chat, auth

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/auth")
app.include_router(chat.router, prefix="/chat")