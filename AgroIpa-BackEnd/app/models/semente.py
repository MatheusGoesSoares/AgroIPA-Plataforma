from sqlalchemy import String, Integer, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Semente(Base):
    __tablename__ = "sementes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    variety: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    culture: Mapped[str] = mapped_column(String(80), nullable=False)
    notes: Mapped[str] = mapped_column(Text, nullable=True)
    fornecedor_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    fornecedor = relationship("User", back_populates="seeds")
    lotes = relationship("Lote", back_populates="semente")
