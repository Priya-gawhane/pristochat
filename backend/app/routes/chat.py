from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.chat import ChatRequest
from app.models.chat import Chat
from app.models.user import User
from app.utils.auth import verify_tokens
from app.services.ollama_service import generate_response

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def chat(
    data: ChatRequest,
    username: str = Depends(verify_tokens),
    db: Session = Depends(get_db)
):
    
    user = db.query(User).filter(User.username == username).first()

    prompt = f"User: {data.message}\nAssitant:"
    response = generate_response(prompt)

    chat_entry = Chat(
        user_id=user.id,
        message=data.message,
        response=response
    )

    db.add(chat_entry)
    db.commit()

    return {"response": response}