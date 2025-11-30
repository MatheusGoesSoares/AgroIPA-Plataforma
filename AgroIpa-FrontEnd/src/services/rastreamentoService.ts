import api from "./axios";
import { RastreamentoEvento } from "../types/rastreamento";

export async function getRastreamentoLote(loteId: string): Promise<RastreamentoEvento[]> {
  const res = await api.get(`/lotes/${loteId}/rastreamento`);
  return res.data || [];
}
