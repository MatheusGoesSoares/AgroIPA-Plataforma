import api from "./api";

export type UserRole = "AGRICULTOR" | "FORNECEDOR";

export type AuthUser = {
  id: number;
  nome: string;
  email: string;
  tipo: UserRole | string;
};

export async function loginUser(email: string, senha: string) {
  const response = await api.post<AuthUser>("/auth/login", {
    email,
    senha,
  });

  return response.data;
}

export async function registerUser(data: {
  nome: string;
  email: string;
  senha: string;
  tipo: UserRole | string;
}) {
  const response = await api.post<AuthUser>("/auth/register", {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    tipo: data.tipo,
  });

  return response.data;
}