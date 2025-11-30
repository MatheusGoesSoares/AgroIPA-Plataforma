import api from "./axios";
import { Semente } from "../types/semente";

export async function getSementes(): Promise<Semente[]> {
  const res = await api.get("/sementes");
  return res.data;
}

export async function createSemente(data: { nome: string; descricao: string }): Promise<void> {
  await api.post("/sementes", data);
}

export async function getSementeById(id: string): Promise<Semente> {
  const res = await api.get(`/sementes/${id}`);
  return res.data;
}
