import React from "react";
import { useNavigate, useParams } from "react-router-dom";

type SeedDetail = {
  id: number;
  lote: string;
  semente: string;
  cultivar: string;
  cultura: string;
  categoria: string;
  armazem: string;
  quantidade: string;
  dataColheita: string;
  dataValidade: string;
  umidade: string;
  pureza: string;
  germinacao: string;
  status: "Dentro da validade" | "Próxima do vencimento";
};

// Mock só pra visual por enquanto – depois você troca pela API
const mockSeedsDetail: SeedDetail[] = [
  {
    id: 1,
    lote: "LT-001",
    semente: "Milho híbrido",
    cultivar: "AG 8088",
    cultura: "Milho",
    categoria: "Certificada",
    armazem: "Silo 1",
    quantidade: "12 t",
    dataColheita: "2024-03-10",
    dataValidade: "2025-10-01",
    umidade: "12,5%",
    pureza: "98%",
    germinacao: "92%",
    status: "Dentro da validade",
  },
  {
    id: 2,
    lote: "LT-014",
    semente: "Soja",
    cultivar: "TMG 7062 IPRO",
    cultura: "Soja",
    categoria: "Certificada",
    armazem: "Galpão 3",
    quantidade: "8,5 t",
    dataColheita: "2024-02-20",
    dataValidade: "2025-03-15",
    umidade: "13,0%",
    pureza: "97%",
    germinacao: "90%",
    status: "Próxima do vencimento",
  },
  {
    id: 3,
    lote: "LT-022",
    semente: "Feijão carioca",
    cultivar: "BRS Estilo",
    cultura: "Feijão",
    categoria: "Salva na propriedade",
    armazem: "Silo 2",
    quantidade: "4,2 t",
    dataColheita: "2023-11-05",
    dataValidade: "2024-11-30",
    umidade: "12,0%",
    pureza: "96%",
    germinacao: "88%",
    status: "Dentro da validade",
  },
];

const SeedsDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const idParam = params.id;

  const seed = React.useMemo(() => {
    const idNumber = Number(idParam);
    if (Number.isNaN(idNumber)) return undefined;
    return mockSeedsDetail.find((s) => s.id === idNumber);
  }, [idParam]);

  const statusColors =
    seed?.status === "Próxima do vencimento"
      ? {
          bg: "#FFFBEB",
          border: "#FACC15",
          text: "#92400E",
        }
      : {
          bg: "#DCFCE7",
          border: "#4ADE80",
          text: "#166534",
        };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #145c3a 0, #08331e 45%, #03150d 100%)",
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
          maxWidth: 980,
          backgroundColor: "rgba(248,247,242,0.98)",
          borderRadius: 24,
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          padding: 24,
          boxSizing: "border-box",
        }}
      >
        {/* Se não achar a semente */}
        {!seed && (
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#052e16",
                marginBottom: 8,
              }}
            >
              Semente não encontrada
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#4b5563",
                marginBottom: 16,
              }}
            >
              Não encontramos nenhuma semente com o identificador informado.
            </p>
            <button
              type="button"
              onClick={() => navigate("/sementes")}
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
              Voltar para lista de sementes
            </button>
          </div>
        )}

        {/* Se encontrou a semente */}
        {seed && (
          <>
            {/* CABEÇALHO */}
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                alignItems: "flex-start",
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#15803D",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  Detalhes da semente
                </p>
                <h1
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    margin: "4px 0 4px",
                    color: "#052e16",
                  }}
                >
                  {seed.semente} · {seed.cultivar}
                </h1>
                <p
                  style={{
                    fontSize: 13,
                    color: "#4b5563",
                    margin: 0,
                  }}
                >
                  Lote {seed.lote} — {seed.quantidade} em {seed.armazem}
                </p>

                <div
                  style={{
                    marginTop: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 11,
                    color: "#6b7280",
                  }}
                >
                  <span>
                    Cultura: <strong>{seed.cultura}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Categoria: <strong>{seed.categoria}</strong>
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {/* Status pill */}
                <span
                  style={{
                    alignSelf: "flex-end",
                    padding: "6px 10px",
                    borderRadius: 999,
                    backgroundColor: statusColors.bg,
                    border: `1px solid ${statusColors.border}`,
                    fontSize: 11,
                    color: statusColors.text,
                    fontWeight: 500,
                  }}
                >
                  {seed.status}
                </span>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => navigate("/sementes")}
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
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/sementes/editar/${seed.id}`)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 999,
                      border: "none",
                      background:
                        "linear-gradient(135deg, #16a34a 0, #15803d 50%, #166534 100%)",
                      color: "#ffffff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Editar semente
                  </button>
                </div>
              </div>
            </header>

            {/* GRID DE DETALHES */}
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
                gap: 18,
                marginBottom: 12,
              }}
            >
              {/* Bloco 1: informações gerais */}
              <div
                style={{
                  borderRadius: 18,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  padding: 14,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 10,
                  fontSize: 13,
                }}
              >
                <DetailItem label="Lote" value={seed.lote} />
                <DetailItem label="Quantidade" value={seed.quantidade} />
                <DetailItem label="Armazém" value={seed.armazem} />
                <DetailItem
                  label="Data de colheita"
                  value={formatDate(seed.dataColheita)}
                />
                <DetailItem
                  label="Data de validade"
                  value={formatDate(seed.dataValidade)}
                />
                <DetailItem label="Categoria" value={seed.categoria} />
              </div>

              {/* Bloco 2: qualidade */}
              <div
                style={{
                  borderRadius: 18,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  padding: 14,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 10,
                  fontSize: 13,
                }}
              >
                <DetailItem label="Umidade" value={seed.umidade} />
                <DetailItem label="Pureza" value={seed.pureza} />
                <DetailItem label="Germinação" value={seed.germinacao} />

                <div
                  style={{
                    gridColumn: "1 / -1",
                    fontSize: 11,
                    color: "#6b7280",
                    backgroundColor: "#f9fafb",
                    borderRadius: 12,
                    padding: 8,
                  }}
                >
                  Esses valores de qualidade podem ser integrados com laudos de
                  laboratório e usados para alertas de reanálise ou descarte.
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default SeedsDetailPage;

// ---------- COMPONENTE REUTILIZÁVEL ----------

function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div
      style={{
        padding: 8,
        borderRadius: 12,
        backgroundColor: "#F9FAFB",
        border: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#6b7280",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#111827",
          fontWeight: 500,
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}