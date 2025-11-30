import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRastreamentoLote } from "../../services/rastreamentoService";
import { RastreamentoEvento } from "../../types/rastreamento";

const TrackingPage: React.FC = () => {
  const { loteId } = useParams<{ loteId: string }>();
  const [eventos, setEventos] = useState<RastreamentoEvento[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loteId) {
      getRastreamentoLote(loteId).then((data) => {
        setEventos(data);
        setLoading(false);
      });
    }
  }, [loteId]);

  if (loading) return <div>Carregando rastreamento...</div>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Rastreamento do Lote</h2>
      <ul className="timeline border-l-2">
        {eventos.map(ev => (
          <li key={ev.id} className="mb-4 ml-4">
            <div className="font-bold">{ev.tipo}</div>
            <div className="text-sm">{ev.descricao}</div>
            <div className="text-xs text-marrom-400">{new Date(ev.data).toLocaleString("pt-BR")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackingPage;
