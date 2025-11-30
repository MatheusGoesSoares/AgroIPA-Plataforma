# app/api/v1/seeds_routes.py
from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Optional

router = APIRouter()

class SeedCreate(BaseModel):
    nomeSemente: str = Field(..., min_length=1)
    cultivar: Optional[str] = None
    tipoCultura: Optional[str] = None
    categoria: Optional[str] = None
    loteOrigem: Optional[str] = None
    quantidadeKg: Optional[float] = None
    armazem: Optional[str] = None
    dataColheita: Optional[str] = None
    dataValidade: Optional[str] = None
    umidade: Optional[float] = None
    pureza: Optional[float] = None
    germinacao: Optional[float] = None
    observacoes: Optional[str] = None

class SeedOut(SeedCreate):
    id: int

_fake_db: List[SeedOut] = []
_next_id = 1

@router.post("/sementes", response_model=SeedOut, status_code=201)
def create_seed(seed: SeedCreate):
    global _next_id
    new_seed = SeedOut(id=_next_id, **seed.dict())
    _fake_db.append(new_seed)
    _next_id += 1
    return new_seed

@router.get("/sementes", response_model=List[SeedOut])
def list_seeds():
    return _fake_db