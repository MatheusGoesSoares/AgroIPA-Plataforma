from sqlalchemy import Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime
from app.db.base import Base

class Rastreamento(Base):
    __tablename__ = "rastreamentos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    lote_id: Mapped[int] = mapped_column(ForeignKey("lotes.id"))
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    event_date: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow)
    notes: Mapped[str] = mapped_column(Text, nullable=True)
    origin: Mapped[str] = mapped_column(String(100), nullable=True)
    destiny: Mapped[str] = mapped_column(String(100), nullable=True)

    lote = relationship("Lote", back_populates="rastreamentos")
