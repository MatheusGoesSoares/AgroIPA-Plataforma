from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter(tags=["seeds"])

class SeedIn(BaseModel):
    nomeSemente: str
    cultivar: str
    tipoCultura: str
    categoria: str
    loteOrigem: str
    quantidadeKg: float
    armazem: str
    dataColheita: str
    dataValidade: str
    umidade: float
    pureza: float
    germinacao: float
    observacoes: str

class SeedOut(SeedIn):
    id: int

fake_seeds_db: list[SeedOut] = []
next_id = 1

@router.get("/sementes", response_model=List[SeedOut])
def list_seeds():
    return fake_seeds_db

@router.post("/sementes", response_model=SeedOut, status_code=201)
def create_seed(seed: SeedIn):
    global next_id
    new_seed = SeedOut(id=next_id, **seed.dict())
    next_id += 1
    fake_seeds_db.append(new_seed)
    return new_seed

@router.delete("/sementes/{seed_id}", status_code=204)
def delete_seed(seed_id: int):
    global fake_seeds_db
    for seed in fake_seeds_db:
        if seed.id == seed_id:
            fake_seeds_db = [s for s in fake_seeds_db if s.id != seed_id]
            return
    raise HTTPException(status_code=404, detail="Semente não encontrada")