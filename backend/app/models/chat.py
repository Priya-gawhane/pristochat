"""
Production-grade chat models for PristoChat.

Collection schema:
  conversations:
    _id          : ObjectId
    user_id      : ObjectId  (ref → users._id)
    title        : str        (first user message, truncated to 60 chars)
    created_at   : datetime
    updated_at   : datetime   (updated on every new message)

  messages:
    _id              : ObjectId
    conversation_id  : ObjectId  (ref → conversations._id)
    user_id          : ObjectId  (redundant for fast user-scoped queries)
    role             : "user" | "assistant"
    content          : str
    created_at       : datetime

MongoDB Indexes (created on startup via ensure_indexes()):
  conversations: [user_id, -updated_at]      – sidebar list
  messages:      [conversation_id, created_at] – load thread

These are plain dicts – no ODM overhead.
"""

# ---------------------------------------------------------------------------
# Helper factories – keep all schema definitions in one place
# ---------------------------------------------------------------------------

def new_conversation(user_id, title: str) -> dict:
    from datetime import datetime, timezone
    now = datetime.now(timezone.utc)
    return {
        "user_id": user_id,
        "title": title[:60],          # truncate long first messages
        "created_at": now,
        "updated_at": now,
    }


def new_message(conversation_id, user_id, role: str, content: str) -> dict:
    from datetime import datetime, timezone
    if role not in ("user", "assistant"):
        raise ValueError("role must be 'user' or 'assistant'")
    return {
        "conversation_id": conversation_id,
        "user_id": user_id,
        "role": role,
        "content": content,
        "created_at": datetime.now(timezone.utc),
    }