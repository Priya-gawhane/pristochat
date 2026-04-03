"""
User model schema for PristoChat.

Collection schema:
  users:
    _id        : ObjectId
    name       : str
    email      : str (unique)
    password   : str (bcrypt hashed)
    bio        : str (optional)
    joined_at  : datetime
"""
