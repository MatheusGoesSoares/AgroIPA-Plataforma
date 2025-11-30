from pydantic import BaseModel, field_validator
from enum import Enum
from datetime import date

class LoteStatus(str, Enum):
    PRODUCAO = "PRODUCAO"
    DISPONIVEL = "DISPONIVEL"
    ENVIADO = "ENVIADO"
    ENTREGUE = "ENTREGUE"

class LoteBase(BaseModel):
    code: str
    semente_id: int
    fornecedor_id: int
    quantity: float
    unit: str
    production_date: date
    expiration_date: date
    status: LoteStatus

class LoteCreate(LoteBase):
    pass

class LoteUpdate(BaseModel):
    quantity: float | None = None
    unit: str | None = None
    production_date: date | None = None
    expiration_date: date | None = None
    status: LoteStatus | None = None

class LoteStatusUpdate(BaseModel):
    status: LoteStatus

class LoteResponse(LoteBase):
    id: int

    class Config:
        from_attributes = True
