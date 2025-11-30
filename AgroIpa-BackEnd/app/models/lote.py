from sqlalchemy import String, Integer, Enum, ForeignKey, Date, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
import enum

class LoteStatus(str, enum.Enum):
    PRODUCAO = "PRODUCAO"
    DISPONIVEL = "DISPONIVEL"
    ENVIADO = "ENVIADO"
    ENTREGUE = "ENTREGUE"

class Lote(Base):
    __tablename__ = "lotes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    code: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    semente_id: Mapped[int] = mapped_column(ForeignKey("sementes.id"))
    fornecedor_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    quantity: Mapped[float] = mapped_column(Float, nullable=False)
    unit: Mapped[str] = mapped_column(String(20), nullable=False)
    production_date: Mapped[Date] = mapped_column(Date, nullable=False)
    expiration_date: Mapped[Date] = mapped_column(Date, nullable=False)
    status: Mapped[LoteStatus] = mapped_column(Enum(LoteStatus), nullable=False)

    semente = relationship("Semente", back_populates="lotes")
    fornecedor = relationship("User", back_populates="lotes")
    rastreamentos = relationship("Rastreamento", back_populates="lote", cascade="all, delete-orphan")
