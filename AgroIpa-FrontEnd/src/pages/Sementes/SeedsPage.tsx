import React from "react";
import { useNavigate } from "react-router-dom";

type SeedRow = {
  id: number;
  lote: string;
  semente: string;
  cultivar: string;
  armazem: string;
  quantidade: string;
  validade: string;
  status: string;
};

const mockSeeds: SeedRow[] = [
  {
    id: 1,
    lote: "LT-001",
    semente: "Milho híbrido",
    cultivar: "AG 8088",
    armazem: "Silo 1",
    quantidade: "12 t",
    validade: "10/2025",
    status: "Dentro da validade",
  },
  {
    id: 2,
    lote: "LT-014",
    semente: "Soja",
    cultivar: "TMG 7062 IPRO",
    armazem: "Galpão 3",
    quantidade: "8,5 t",
    validade: "03/2025",
    status: "Próxima do vencimento",
  },
  {
    id: 3,
    lote: "LT-022",
    semente: "Feijão carioca",
    cultivar: "BRS Estilo",
    armazem: "Silo 2",
    quantidade: "4,2 t",
    validade: "11/2024",
    status: "Dentro da validade",
  },
];

const SeedsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e5f3b 0, #0b331e 45%, #05160e 100%)",
        padding: "32px 24px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          backgroundColor: "rgba(255,255,255,0.98)",
          borderRadius: 24,
          boxShadow: "0 22px 60px rgba(0,0,0,0.35)",
          padding: 32,
          boxSizing: "border-box",
        }}
      >
        {/* Cabeçalho da página */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#0b331e",
                marginBottom: 4,
              }}
            >
              Sementes cadastradas
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#4b5563",
                maxWidth: 520,
              }}
            >
              Acompanhe a qualidade, validade e localização das sementes em
              estoque para planejar plantio e reposição com segurança.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid #d1d5db",
                backgroundColor: "#ffffff",
                fontSize: 13,
                color: "#374151",
                cursor: "pointer",
              }}
            >
              Exportar dados
            </button>
            <button
              type="button"
              onClick={() => navigate("/sementes/novo")}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "none",
                backgroundColor: "#0f766e",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Nova semente
            </button>
          </div>
        </header>

        {/* Cards de resumo */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: "#f1f5f9",
            }}
          >
            <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
              Sementes em estoque
            </p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0b331e" }}>
              3,4 t
            </p>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              Soma de todos os lotes ativos.
            </p>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: "#f1f5f9",
            }}
          >
            <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
              Variedades
            </p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0b331e" }}>
              3
            </p>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              Milho, soja e feijão cadastrados.
            </p>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: "#fefce8",
            }}
          >
            <p style={{ fontSize: 12, color: "#854d0e", marginBottom: 4 }}>
              Próximas do vencimento
            </p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#854d0e" }}>
              1 lote
            </p>
            <p style={{ fontSize: 12, color: "#854d0e", marginTop: 4 }}>
              Verifique validade e faça rodízio de estoque.
            </p>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: "#ecfeff",
            }}
          >
            <p style={{ fontSize: 12, color: "#036672", marginBottom: 4 }}>
              Armazéns
            </p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#036672" }}>
              2
            </p>
            <p style={{ fontSize: 12, color: "#036672", marginTop: 4 }}>
              Sementes distribuídas entre silos e galpões.
            </p>
          </div>
        </section>

        {/* Tabela de sementes */}
        <section
          style={{
            borderRadius: 16,
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f9fafb",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Lotes de sementes
            </span>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              {mockSeeds.length} lotes cadastrados
            </span>
          </div>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f9fafb",
                    textAlign: "left",
                    color: "#6b7280",
                  }}
                >
                  <th style={{ padding: "10px 16px" }}>Lote</th>
                  <th style={{ padding: "10px 16px" }}>Semente</th>
                  <th style={{ padding: "10px 16px" }}>Cultivar</th>
                  <th style={{ padding: "10px 16px" }}>Armazém</th>
                  <th style={{ padding: "10px 16px" }}>Quantidade</th>
                  <th style={{ padding: "10px 16px" }}>Validade</th>
                  <th style={{ padding: "10px 16px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockSeeds.map((seed) => (
                  <tr
                    key={seed.id}
                    style={{
                      borderTop: "1px solid #e5e7eb",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 16px",
                        fontWeight: 500,
                      }}
                    >
                      {seed.lote}
                    </td>
                    <td style={{ padding: "10px 16px" }}>{seed.semente}</td>
                    <td style={{ padding: "10px 16px" }}>{seed.cultivar}</td>
                    <td style={{ padding: "10px 16px" }}>{seed.armazem}</td>
                    <td style={{ padding: "10px 16px" }}>{seed.quantidade}</td>
                    <td style={{ padding: "10px 16px" }}>{seed.validade}</td>
                    <td style={{ padding: "10px 16px" }}>{seed.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeedsPage;