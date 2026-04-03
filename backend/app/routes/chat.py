"""
Production-grade chat routes.

Two-collection model:
  conversations  – one record per chat session
  messages       – individual turns (user / assistant)

Endpoints:
  POST   /chat/                            – send a message (stream response)
  GET    /chat/conversations               – list all conversations for sidebar
  GET    /chat/conversations/{id}/messages – load a conversation's full thread
  DELETE /chat/conversations/{id}          – delete a conversation + its messages
"""

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse

from app.database import db
from app.models.chat import new_conversation, new_message
from app.schemas.chat import ChatRequest
from app.services.ollama_service import generate_response
from app.utils.auth import verify_tokens
from datetime import datetime, timezone

router = APIRouter()


# ─── helpers ────────────────────────────────────────────────────────────────

def _require_user(email: str):
    user = db.users.find_one({"email": email}, {"_id": 1})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def _require_conversation(conv_id: str, user_id):
    try:
        oid = ObjectId(conv_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid conversation_id")

    conv = db.conversations.find_one({"_id": oid, "user_id": user_id})
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conv


# ─── POST /chat/ ────────────────────────────────────────────────────────────

@router.post("/chat")
def send_message(data: ChatRequest, email: str = Depends(verify_tokens)):
    user = _require_user(email)
    user_id = user["_id"]

    # 1. Resolve or create conversation
    if data.conversation_id:
        conv = _require_conversation(data.conversation_id, user_id)
        conv_id = conv["_id"]
    else:
        # Auto-title from first message
        title = data.message.strip()
        conv_doc = new_conversation(user_id, title)
        result = db.conversations.insert_one(conv_doc)
        conv_id = result.inserted_id

    # 2. Persist user message
    user_msg = new_message(conv_id, user_id, "user", data.message)
    db.messages.insert_one(user_msg)

    # 3. Build full history for context
    cursor = db.messages.find(
        {"conversation_id": conv_id},
        {"role": 1, "content": 1, "_id": 0}
    ).sort("created_at", 1)
    history = [{"role": m["role"], "content": m["content"]} for m in cursor]

    # 4. Stream and persist assistant response
    def stream_and_save():
        full_response = []
        for chunk in generate_response(history):
            full_response.append(chunk)
            yield chunk

        assistant_content = "".join(full_response)
        asst_msg = new_message(conv_id, user_id, "assistant", assistant_content)
        db.messages.insert_one(asst_msg)

        # Update conversation updated_at + title (only first time if auto-generated)
        db.conversations.update_one(
            {"_id": conv_id},
            {"$set": {"updated_at": datetime.now(timezone.utc)}}
        )

    # Return conversation_id in a header so the frontend can track it
    return StreamingResponse(
        stream_and_save(),
        media_type="text/event-stream",
        headers={"X-Conversation-Id": str(conv_id)},
    )


# ─── GET /chat/conversations ─────────────────────────────────────────────────

@router.get("/conversations")
def list_conversations(email: str = Depends(verify_tokens)):
    user = _require_user(email)

    cursor = db.conversations.find(
        {"user_id": user["_id"]},
        {"_id": 1, "title": 1, "updated_at": 1, "created_at": 1}
    ).sort("updated_at", -1).limit(50)

    return [
        {
            "id": str(c["_id"]),
            "title": c["title"],
            "updated_at": c["updated_at"].isoformat(),
            "created_at": c["created_at"].isoformat(),
        }
        for c in cursor
    ]


# ─── GET /chat/conversations/{id}/messages ────────────────────────────────────

@router.get("/conversations/{conv_id}/messages")
def get_messages(conv_id: str, email: str = Depends(verify_tokens)):
    user = _require_user(email)
    _require_conversation(conv_id, user["_id"])  # ownership check

    cursor = db.messages.find(
        {"conversation_id": ObjectId(conv_id)},
        {"_id": 0, "role": 1, "content": 1, "created_at": 1}
    ).sort("created_at", 1)

    return [
        {
            "role": m["role"],
            "content": m["content"],
            "created_at": m["created_at"].isoformat(),
        }
        for m in cursor
    ]


# ─── DELETE /chat/conversations/{id} ─────────────────────────────────────────

@router.delete("/conversations/{conv_id}")
def delete_conversation(conv_id: str, email: str = Depends(verify_tokens)):
    user = _require_user(email)
    _require_conversation(conv_id, user["_id"])  # ownership check

    db.messages.delete_many({"conversation_id": ObjectId(conv_id)})
    db.conversations.delete_one({"_id": ObjectId(conv_id)})
    return {"msg": "Deleted"}
