from pymongo import MongoClient, ASCENDING, DESCENDING
from app.config import settings

client = MongoClient(settings.MONGODB_URL)

# Fallback to pristochat db if default is not provided in URL
try:
    db = client.get_default_database()
except Exception:
    db = client["pristochat"]


def ensure_indexes():
    """Create indexes for production-grade query performance."""
    # conversations: list by user, sorted newest first
    db.conversations.create_index([("user_id", ASCENDING), ("updated_at", DESCENDING)])

    # messages: fetch full thread in chronological order
    db.messages.create_index([("conversation_id", ASCENDING), ("created_at", ASCENDING)])

    # users: fast lookup by email (unique)
    db.users.create_index([("email", ASCENDING)], unique=True)


# Run on import so indexes always exist
ensure_indexes()