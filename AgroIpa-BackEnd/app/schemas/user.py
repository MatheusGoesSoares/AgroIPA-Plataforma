from pydantic import BaseModel, EmailStr, Field
from enum import Enum

class UserType(str, Enum):
    AGRICULTOR = "AGRICULTOR"
    FORNECEDOR = "FORNECEDOR"

class UserBase(BaseModel):
    name: str
    email: EmailStr
    type: UserType

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserUpdate(BaseModel):
    name: str | None = None
    password: str | None = None

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True
