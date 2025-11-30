from sqlalchemy import String, Integer, Float
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Armazem(Base):
    __tablename__ = "armazens"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    address: Mapped[str] = mapped_column(String(200), nullable=False)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str] = mapped_column(String(50), nullable=False)
    latitude: Mapped[float] = mapped_column(Float)
    longitude: Mapped[float] = mapped_column(Float)
    capacity: Mapped[float] = mapped_column(Float)
