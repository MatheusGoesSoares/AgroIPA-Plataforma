from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class UserType(str, enum.Enum):
    AGRICULTOR = "AGRICULTOR"
    FORNECEDOR = "FORNECEDOR"

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[UserType] = mapped_column(Enum(UserType), nullable=False)

    seeds = relationship("Semente", back_populates="fornecedor")
    lotes = relationship("Lote", back_populates="fornecedor")
