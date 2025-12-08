# app/models.py
from sqlalchemy import Column, Integer, String, Float, Text
from app.database import Base


class Seed(Base):
    __tablename__ = "sementes"

    id = Column(Integer, primary_key=True, index=True)
    nomeSemente = Column(String(255), nullable=False)
    cultivar = Column(String(255), nullable=True)
    tipoCultura = Column(String(100), nullable=True)
    categoria = Column(String(100), nullable=True)
    loteOrigem = Column(String(100), nullable=True)
    quantidadeKg = Column(Float, nullable=True)
    armazem = Column(String(150), nullable=True)
    dataColheita = Column(String(20), nullable=True)
    dataValidade = Column(String(20), nullable=True)
    umidade = Column(Float, nullable=True)
    pureza = Column(Float, nullable=True)
    germinacao = Column(Float, nullable=True)
    observacoes = Column(Text, nullable=True)