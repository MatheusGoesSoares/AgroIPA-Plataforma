from pydantic import BaseModel

class ArmazemBase(BaseModel):
    name: str
    address: str
    city: str
    state: str
    latitude: float | None = None
    longitude: float | None = None
    capacity: float

class ArmazemCreate(ArmazemBase):
    pass

class ArmazemUpdate(BaseModel):
    name: str | None = None
    address: str | None = None
    city: str | None = None
    state: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    capacity: float | None = None

class ArmazemResponse(ArmazemBase):
    id: int

    class Config:
        from_attributes = True
