from pydantic import BaseModel

class UserCreate(BaseModel):
    Username: str
    Password: str