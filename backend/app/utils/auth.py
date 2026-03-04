from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from datetime import datetime, timedelta
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"])
security = HTTPBearer()

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_token(username: str):
    payload = {
        "sub": username,
        "exp": datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
        }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def verify_tokens(credentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        return payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
