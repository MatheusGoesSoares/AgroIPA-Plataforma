from pydantic import BaseModel

class SementeBase(BaseModel):
    name: str
    variety: str
    description: str | None = None
    culture: str
    notes: str | None = None

class SementeCreate(SementeBase):
    fornecedor_id: int

class SementeUpdate(BaseModel):
    name: str | None = None
    variety: str | None = None
    description: str | None = None
    culture: str | None = None
    notes: str | None = None

class SementeResponse(SementeBase):
    id: int
    fornecedor_id: int

    class Config:
        from_attributes = True
