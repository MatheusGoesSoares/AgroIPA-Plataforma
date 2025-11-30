from pydantic import BaseModel
from datetime import datetime

class RastreamentoBase(BaseModel):
    lote_id: int
    status: str
    event_date: datetime | None = None
    notes: str | None = None
    origin: str | None = None
    destiny: str | None = None

class RastreamentoCreate(RastreamentoBase):
    pass

class RastreamentoResponse(RastreamentoBase):
    id: int

    class Config:
        from_attributes = True
