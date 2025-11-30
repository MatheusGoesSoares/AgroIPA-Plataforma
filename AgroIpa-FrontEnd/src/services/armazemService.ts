import api from "./axios";
import { Armazem } from "../types/armazem";

export async function getArmazens(): Promise<Armazem[]> {
  const res = await api.get("/armazens");
  return res.data;
}
