from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional

router = APIRouter()


class RegisterInput(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    tipo: str


class LoginInput(BaseModel):
    email: EmailStr
    senha: str


class ProfileUpdate(BaseModel):
    nome: Optional[str] = None
    telefone: Optional[str] = None
    fazenda: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
    preferencias_alerta: Optional[str] = None


class UserOut(BaseModel):
    id: int
    nome: str
    email: EmailStr
    tipo: str
    telefone: Optional[str] = None
    fazenda: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
    preferencias_alerta: Optional[str] = None


_fake_users: List[dict] = []
_next_id = 1


@router.post("/auth/register", response_model=UserOut, status_code=201)
def register_user(data: RegisterInput):
    global _next_id

    for u in _fake_users:
        if u["email"] == data.email:
            raise HTTPException(status_code=400, detail="E-mail já cadastrado.")

    user = {
        "id": _next_id,
        "nome": data.nome,
        "email": data.email,
        "tipo": data.tipo,
        "telefone": None,
        "fazenda": None,
        "cidade": None,
        "estado": None,
        "preferencias_alerta": None,
    }

    _fake_users.append({**user, "senha": data.senha})
    _next_id += 1
    return user


@router.post("/auth/login", response_model=UserOut)
def login_user(data: LoginInput):
    for u in _fake_users:
        if u["email"] == data.email and u["senha"] == data.senha:
            return {
                "id": u["id"],
                "nome": u["nome"],
                "email": u["email"],
                "tipo": u["tipo"],
                "telefone": u.get("telefone"),
                "fazenda": u.get("fazenda"),
                "cidade": u.get("cidade"),
                "estado": u.get("estado"),
                "preferencias_alerta": u.get("preferencias_alerta"),
            }

    raise HTTPException(status_code=401, detail="Credenciais inválidas.")


@router.get("/auth/profile/{user_id}", response_model=UserOut)
def get_profile(user_id: int):
    for u in _fake_users:
        if u["id"] == user_id:
            return {
                "id": u["id"],
                "nome": u["nome"],
                "email": u["email"],
                "tipo": u["tipo"],
                "telefone": u.get("telefone"),
                "fazenda": u.get("fazenda"),
                "cidade": u.get("cidade"),
                "estado": u.get("estado"),
                "preferencias_alerta": u.get("preferencias_alerta"),
            }
    raise HTTPException(status_code=404, detail="Usuário não encontrado.")


@router.put("/auth/profile/{user_id}", response_model=UserOut)
def update_profile(user_id: int, data: ProfileUpdate):
    for u in _fake_users:
        if u["id"] == user_id:
            if data.nome is not None:
                u["nome"] = data.nome
            if data.telefone is not None:
                u["telefone"] = data.telefone
            if data.fazenda is not None:
                u["fazenda"] = data.fazenda
            if data.cidade is not None:
                u["cidade"] = data.cidade
            if data.estado is not None:
                u["estado"] = data.estado
            if data.preferencias_alerta is not None:
                u["preferencias_alerta"] = data.preferencias_alerta

            return {
                "id": u["id"],
                "nome": u["nome"],
                "email": u["email"],
                "tipo": u["tipo"],
                "telefone": u.get("telefone"),
                "fazenda": u.get("fazenda"),
                "cidade": u.get("cidade"),
                "estado": u.get("estado"),
                "preferencias_alerta": u.get("preferencias_alerta"),
            }

    raise HTTPException(status_code=404, detail="Usuário não encontrado.")