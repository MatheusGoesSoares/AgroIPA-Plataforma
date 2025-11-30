import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type LotStatus = "Em plantio" | "Em desenvolvimento" | "Em colheita" | "Concluído";

type Lot = {
  id: string;
  nome: string;
  cultura: string;
  area: string;
  safra: string;
  status: LotStatus;
};

const LOTS_DATA: Lot[] = [
  {
    id: "LT-01",
    nome: "Lote 01 - Talhão Norte",
    cultura: "Soja",
    area: "35 ha",
    safra: "2025/26",
    status: "Em desenvolvimento",
  },
  {
    id: "LT-02",
    nome: "Lote 02 - Silo 3",
    cultura: "Milho",
    area: "28 ha",
    safra: "2024/25",
    status: "Em colheita",
  },
  {
    id: "LT-03",
    nome: "Lote 03 - Gleba Leste",
    cultura: "Soja",
    area: "40 ha",
    safra: "2024/25",
    status: "Concluído",
  },
  {
    id: "LT-04",
    nome: "Lote 04 - Experimental",
    cultura: "Algodão",
    area: "12 ha",
    safra: "2025/26",
    status: "Em plantio",
  },
  {
    id: "LT-05",
    nome: "Lote 05 - Talhão Sul",
    cultura: "Milho",
    area: "30 ha",
    safra: "2025/26",
    status: "Em desenvolvimento",
  },
];

const LotsPage: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [culturaFilter, setCulturaFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const culturasDisponiveis = useMemo(
    () => Array.from(new Set(LOTS_DATA.map((l) => l.cultura))),
    []
  );

  const lotsFiltrados = useMemo(() => {
    return LOTS_DATA.filter((lot) => {
      if (culturaFilter && lot.cultura !== culturaFilter) return false;
      if (statusFilter && lot.status !== statusFilter) return false;

      if (search.trim()) {
        const termo = search.toLowerCase();
        const texto = `${lot.id} ${lot.nome} ${lot.cultura} ${lot.safra}`.toLowerCase();
        if (!texto.includes(termo)) return false;
      }

      return true;
    });
  }, [search, culturaFilter, statusFilter]);

  const handleNovoLote = () => {
    navigate("/lotes/novo");
  };

  const countAtivos = lotsFiltrados.length || LOTS_DATA.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f5132 0, #052918 55%, #02140c 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1150px",
          backgroundColor: "rgba(248, 247, 242, 0.96)",
          borderRadius: "24px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.5)",
          padding: "24px 32px 28px",
          fontFamily:
            "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          color: "#052918",
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#11623a",
                margin: 0,
                fontWeight: 600,
              }}
            >
              Lotes
            </p>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 600,
                margin: "4px 0 0",
                color: "#052918",
              }}
            >
              Gestão de lotes
            </h1>
            <p
              style={{
                marginTop: "4px",
                fontSize: "14px",
                color: "#335f48",
              }}
            >
              Visualize, filtre e acompanhe o ciclo de cada lote de sementes.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={handleNovoLote}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#0f5132",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              + Novo lote
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1px solid #cfe3d6",
                backgroundColor: "#f8f7f2",
                color: "#0f5132",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Exportar dados
            </button>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          {[
            {
              titulo: "Lotes ativos",
              valor: String(countAtivos),
              detalhe: "Em acompanhamento neste ciclo.",
            },
            {
              titulo: "Colheita prevista",
              valor: "3",
              detalhe: "Lotes com colheita neste mês.",
            },
            {
              titulo: "Área total",
              valor: "185 ha",
              detalhe: "Somatório da área plantada.",
            },
            {
              titulo: "Alertas",
              valor: "2",
              detalhe: "Umidade/validade fora da faixa ideal.",
            },
          ].map((card) => (
            <div
              key={card.titulo}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                padding: "12px 14px",
                border: "1px solid #e3efe6",
                boxShadow: "0 6px 18px rgba(0,0,0,0.03)",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#11623a",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {card.titulo}
              </p>
              <p
                style={{
                  margin: "6px 0 2px",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#052918",
                }}
              >
                {card.valor}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#426b53",
                }}
              >
                {card.detalhe}
              </p>
            </div>
          ))}
        </section>

        <section
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Buscar por nome do lote, cultura ou código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: "220px",
              padding: "8px 10px",
              borderRadius: "999px",
              border: "1px solid #d5e3da",
              fontSize: "13px",
              outline: "none",
            }}
          />
          <select
            value={culturaFilter}
            onChange={(e) => setCulturaFilter(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "999px",
              border: "1px solid #d5e3da",
              fontSize: "13px",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">Todas as culturas</option>
            {culturasDisponiveis.map((cultura) => (
              <option key={cultura} value={cultura}>
                {cultura}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "999px",
              border: "1px solid #d5e3da",
              fontSize: "13px",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">Todos os status</option>
            <option value="Em plantio">Em plantio</option>
            <option value="Em desenvolvimento">Em desenvolvimento</option>
            <option value="Em colheita">Em colheita</option>
            <option value="Concluído">Concluído</option>
          </select>
        </section>

        <section
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #e3efe6",
            padding: "14px 16px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 600,
                color: "#052918",
              }}
            >
              Lotes cadastrados
            </h2>
            <span
              style={{
                fontSize: "11px",
                color: "#426b53",
              }}
            >
              Exibindo {lotsFiltrados.length} de {LOTS_DATA.length} lotes
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px",
              }}
            >
              <thead>
                <tr
                  style={{
                    color: "#426b53",
                    borderBottom: "1px solid #e3efe6",
                  }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "6px 12px 6px 0",
                    }}
                  >
                    Lote
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "6px 12px 6px 0",
                    }}
                  >
                    Cultura
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "6px 12px 6px 0",
                    }}
                  >
                    Área
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "6px 12px 6px 0",
                    }}
                  >
                    Safra
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "6px 12px 6px 0",
                    }}
                  >
                    Situação
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "6px 0",
                    }}
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody style={{ color: "#052918" }}>
                {lotsFiltrados.map((lote) => {
                  let corStatus = "#fff7e6";
                  let corTexto = "#8a6116";

                  if (lote.status === "Em colheita") {
                    corStatus = "#e7f2ff";
                    corTexto = "#144a8c";
                  } else if (lote.status === "Concluído") {
                    corStatus = "#e8f5e9";
                    corTexto = "#0f5132";
                  } else if (lote.status === "Em plantio") {
                    corStatus = "#fff3cd";
                    corTexto = "#856404";
                  }

                  return (
                    <tr
                      key={lote.id}
                      style={{ borderBottom: "1px solid #f1f4f2" }}
                    >
                      <td style={{ padding: "6px 12px 6px 0" }}>
                        {lote.nome}
                      </td>
                      <td style={{ padding: "6px 12px 6px 0" }}>
                        {lote.cultura}
                      </td>
                      <td style={{ padding: "6px 12px 6px 0" }}>
                        {lote.area}
                      </td>
                      <td style={{ padding: "6px 12px 6px 0" }}>
                        {lote.safra}
                      </td>
                      <td style={{ padding: "6px 12px 6px 0" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor: corStatus,
                            color: corTexto,
                            fontSize: "11px",
                          }}
                        >
                          {lote.status}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "6px 0",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#11623a",
                            fontSize: "11px",
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                          onClick={() => navigate(`/lotes/${lote.id}`)}
                        >
                          Detalhes
                        </button>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#8a6116",
                            fontSize: "11px",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/lotes/${lote.id}/editar`)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {lotsFiltrados.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: "10px 0",
                        textAlign: "center",
                        color: "#426b53",
                      }}
                    >
                      Nenhum lote encontrado com os filtros atuais.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#426b53",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>
            Dica: use os filtros para focar em lotes com colheita ou alerta de
            qualidade.
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              to="/rastreamento"
              style={{
                color: "#11623a",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Ver cargas relacionadas →
            </Link>
            <Link
              to="/sementes"
              style={{
                color: "#11623a",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Ver sementes em estoque →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LotsPage;