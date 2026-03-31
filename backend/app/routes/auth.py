from fastapi import APIRouter, HTTPException, Response, Depends
from app.database import db
from app.schemas.user import UserCreate, UserLogin, UserUpdate
from app.utils.auth import create_token, verify_tokens
from datetime import datetime, timezone
import bcrypt

router = APIRouter()


@router.post("/register")
def register(user: UserCreate):
    existing = db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User exists")

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), salt).decode('utf-8')

    db.users.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "bio": "",
        "joined_at": datetime.now(timezone.utc),
    })

    return {"msg": "User created"}


@router.post("/login")
def login(user: UserLogin, response: Response):
    db_user = db.users.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user["password"].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(db_user["email"])

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        max_age=30 * 60,
        secure=False,
        path="/",
    )

    return {"msg": "Login successful"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"msg": "Logout successful"}


@router.get("/me")
def me(email: str = Depends(verify_tokens)):
    user = db.users.find_one({"email": email}, {"password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_id = user["_id"]

    # Aggregate stats
    total_conversations = db.conversations.count_documents({"user_id": user_id})
    total_messages = db.messages.count_documents({"user_id": user_id, "role": "user"})

    joined_at = user.get("joined_at")

    return {
        "name": user.get("name", ""),
        "email": user["email"],
        "bio": user.get("bio", ""),
        "joined_at": joined_at.isoformat() if joined_at else None,
        "stats": {
            "total_conversations": total_conversations,
            "total_messages": total_messages,
        },
    }


@router.patch("/me")
def update_me(data: UserUpdate, email: str = Depends(verify_tokens)):
    updates = {k: v for k, v in data.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="Nothing to update")

    db.users.update_one({"email": email}, {"$set": updates})
    return {"msg": "Profile updated"}