import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type WarehouseStatus = "ideal" | "atencao" | "critico";

type Warehouse = {
  id: string;
  nome: string;
  codigo: string;
  cidade: string;
  estado: string;
  capacidadeTotal: number;
  ocupacaoAtual: number;
  temperatura: number;
  umidade: number;
  status: WarehouseStatus;
  descricao: string;
};

const MOCK_WAREHOUSES: Warehouse[] = [
  {
    id: "ar-01",
    nome: "Silo Central - Garanhuns",
    codigo: "AR-01",
    cidade: "Garanhuns",
    estado: "PE",
    capacidadeTotal: 1200,
    ocupacaoAtual: 72,
    temperatura: 23,
    umidade: 58,
    status: "ideal",
    descricao: "Estoque equilibrado e dentro da faixa ideal."
  },
  {
    id: "ar-02",
    nome: "Galpão Nordeste - Petrolina",
    codigo: "AR-02",
    cidade: "Petrolina",
    estado: "PE",
    capacidadeTotal: 850,
    ocupacaoAtual: 88,
    temperatura: 27,
    umidade: 62,
    status: "atencao",
    descricao: "Monitorar umidade dos silos 2 e 3."
  },
  {
    id: "ar-03",
    nome: "Depósito Litoral - Ipojuca",
    codigo: "AR-03",
    cidade: "Ipojuca",
    estado: "PE",
    capacidadeTotal: 600,
    ocupacaoAtual: 51,
    temperatura: 24,
    umidade: 60,
    status: "ideal",
    descricao: "Boa rotação de estoque de milho."
  },
  {
    id: "ar-04",
    nome: "Silo Sertão - Ouricuri",
    codigo: "AR-04",
    cidade: "Ouricuri",
    estado: "PE",
    capacidadeTotal: 700,
    ocupacaoAtual: 96,
    temperatura: 29,
    umidade: 67,
    status: "critico",
    descricao: "Capacidade próxima do limite. Avaliar remanejamento."
  }
];

const WarehousesPage: React.FC = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<"todos" | WarehouseStatus>("todos");

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return MOCK_WAREHOUSES.filter((w) => {
      const matchTexto =
        termo.length === 0 ||
        w.nome.toLowerCase().includes(termo) ||
        w.cidade.toLowerCase().includes(termo) ||
        w.codigo.toLowerCase().includes(termo);

      const matchStatus = statusFiltro === "todos" || w.status === statusFiltro;

      return matchTexto && matchStatus;
    });
  }, [busca, statusFiltro]);

  const totalCapacidade = useMemo(
    () => MOCK_WAREHOUSES.reduce((acc, w) => acc + w.capacidadeTotal, 0),
    []
  );

  const ocupacaoMedia = useMemo(
    () =>
      Math.round(
        MOCK_WAREHOUSES.reduce((acc, w) => acc + w.ocupacaoAtual, 0) /
          MOCK_WAREHOUSES.length
      ),
    []
  );

  const ativos = MOCK_WAREHOUSES.length;
  const criticos = MOCK_WAREHOUSES.filter((w) => w.status === "critico").length;

  function labelStatus(status: WarehouseStatus) {
    if (status === "ideal") return "Condição ideal";
    if (status === "atencao") return "Atenção";
    return "Crítico";
  }

  function coresStatus(status: WarehouseStatus) {
    if (status === "ideal") {
      return {
        bg: "#ecfdf3",
        text: "#166534",
        border: "#bbf7d0"
      };
    }
    if (status === "atencao") {
      return {
        bg: "#fef9c3",
        text: "#854d0e",
        border: "#fde68a"
      };
    }
    return {
      bg: "#fee2e2",
      text: "#b91c1c",
      border: "#fecaca"
    };
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f5132 0, #052918 55%, #02140c 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "32px 24px",
        boxSizing: "border-box",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          backgroundColor: "rgba(248,247,242,0.98)",
          borderRadius: 24,
          boxShadow: "0 28px 70px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.4)",
          padding: 24,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 18
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#16a34a",
                margin: 0,
                fontWeight: 600
              }}
            >
              Gestão de armazenagem
            </p>
            <h1
              style={{
                margin: "4px 0 6px",
                fontSize: 24,
                fontWeight: 700,
                color: "#052e16"
              }}
            >
              Armazéns monitorados
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#4b5563",
                maxWidth: 480
              }}
            >
              Acompanhe capacidade, ocupação e indicadores de cada unidade de
              armazenagem da fazenda.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <button
              onClick={() => navigate("/armazens/novo")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg, #16a34a 0, #15803d 50%, #166534 100%)",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              + Novo armazém
            </button>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0,1fr))",
            gap: 12
          }}
        >
          <ResumoCard
            titulo="Armazéns ativos"
            valor={String(ativos)}
            detalhe="Unidades cadastradas na fazenda."
          />
          <ResumoCard
            titulo="Capacidade total"
            valor={`${totalCapacidade.toLocaleString("pt-BR")} t`}
            detalhe="Somatório da capacidade declarada."
          />
          <ResumoCard
            titulo="Ocupação média"
            valor={`${ocupacaoMedia}%`}
            detalhe="Média de ocupação entre armazéns."
          />
          <ResumoCard
            titulo="Em atenção / crítico"
            valor={`${criticos} com alerta`}
            detalhe="Avaliar remanejamento e condições."
          />
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 18,
            alignItems: "flex-start",
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 260,
              backgroundColor: "#ffffff",
              borderRadius: 18,
              border: "1px solid #e5e7eb",
              padding: 14,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 600,
                color: "#111827"
              }}
            >
              Filtros rápidos
            </h2>

            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, cidade ou código..."
              style={{
                width: "100%",
                borderRadius: 999,
                border: "1px solid #d1d5db",
                padding: "8px 11px",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box"
              }}
            />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 4
              }}
            >
              <FiltroChip
                label="Todos"
                ativo={statusFiltro === "todos"}
                onClick={() => setStatusFiltro("todos")}
              />
              <FiltroChip
                label="Condição ideal"
                ativo={statusFiltro === "ideal"}
                onClick={() => setStatusFiltro("ideal")}
              />
              <FiltroChip
                label="Em atenção"
                ativo={statusFiltro === "atencao"}
                onClick={() => setStatusFiltro("atencao")}
              />
              <FiltroChip
                label="Crítico"
                ativo={statusFiltro === "critico"}
                onClick={() => setStatusFiltro("critico")}
              />
            </div>

            <div
              style={{
                fontSize: 11,
                color: "#6b7280",
                marginTop: 4,
                backgroundColor: "#f9fafb",
                borderRadius: 12,
                padding: 8
              }}
            >
              Use a busca para localizar rapidamente por cidade ou código
              interno do armazém. O filtro de status ajuda a focar em unidades
              com maior risco.
            </div>
          </div>

          <div
            style={{
              flex: 2,
              minWidth: 360,
              backgroundColor: "#ffffff",
              borderRadius: 18,
              border: "1px solid #e5e7eb",
              padding: 14,
              boxSizing: "border-box",
              maxHeight: 420,
              overflowY: "auto"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#111827"
                }}
              >
                Lista de armazéns
              </h2>
              <span
                style={{
                  fontSize: 11,
                  color: "#6b7280"
                }}
              >
                Exibindo {filtrados.length} de {MOCK_WAREHOUSES.length}
              </span>
            </div>

            {filtrados.length === 0 && (
              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: "#f9fafb",
                  border: "1px dashed #e5e7eb"
                }}
              >
                Nenhum armazém encontrado para os filtros atuais. Ajuste a busca
                ou o status selecionado.
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10
              }}
            >
              {filtrados.map((w) => {
                const cores = coresStatus(w.status);
                return (
                  <div
                    key={w.id}
                    style={{
                      borderRadius: 14,
                      border: "1px solid #e5e7eb",
                      padding: 12,
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1.7fr) minmax(0,1.2fr)",
                      gap: 10,
                      alignItems: "center",
                      boxShadow: "0 4px 10px rgba(15,23,42,0.04)"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 2
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#111827"
                          }}
                        >
                          {w.nome}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: "#6b7280"
                          }}
                        >
                          · {w.cidade} - {w.estado}
                        </span>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 12,
                          color: "#6b7280"
                        }}
                      >
                        {w.descricao}
                      </p>
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: 11,
                          color: "#94a3b8"
                        }}
                      >
                        Código interno: {w.codigo}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        alignItems: "flex-end"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          flexWrap: "wrap",
                          justifyContent: "flex-end"
                        }}
                      >
                        <TagNumero
                          label="Capacidade"
                          valor={`${w.capacidadeTotal.toLocaleString("pt-BR")} t`}
                        />
                        <TagNumero
                          label="Ocupação"
                          valor={`${w.ocupacaoAtual}%`}
                        />
                        <TagNumero
                          label="Temp/Umi"
                          valor={`${w.temperatura}ºC · ${w.umidade}%`}
                        />
                      </div>

                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 999,
                          backgroundColor: cores.bg,
                          border: `1px solid ${cores.border}`,
                          color: cores.text,
                          fontSize: 11,
                          fontWeight: 500
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            backgroundColor: cores.text
                          }}
                        />
                        {labelStatus(w.status)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

type ResumoCardProps = {
  titulo: string;
  valor: string;
  detalhe: string;
};

const ResumoCard: React.FC<ResumoCardProps> = ({ titulo, valor, detalhe }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: "10px 12px",
        border: "1px solid #e3efe6",
        boxShadow: "0 6px 16px rgba(15,23,42,0.05)"
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 11,
          color: "#16a34a",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 600
        }}
      >
        {titulo}
      </p>
      <p
        style={{
          margin: "6px 0 2px",
          fontSize: 20,
          fontWeight: 600,
          color: "#052918"
        }}
      >
        {valor}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          color: "#4b5563"
        }}
      >
        {detalhe}
      </p>
    </div>
  );
};

type FiltroChipProps = {
  label: string;
  ativo: boolean;
  onClick: () => void;
};

const FiltroChip: React.FC<FiltroChipProps> = ({ label, ativo, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderRadius: 999,
        padding: "6px 12px",
        border: ativo ? "1px solid #16a34a" : "1px solid #d1d5db",
        backgroundColor: ativo ? "#dcfce7" : "#ffffff",
        fontSize: 12,
        color: ativo ? "#166534" : "#4b5563",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
};

type TagNumeroProps = {
  label: string;
  valor: string;
};

const TagNumero: React.FC<TagNumeroProps> = ({ label, valor }) => {
  return (
    <div
      style={{
        borderRadius: 999,
        padding: "4px 10px",
        backgroundColor: "#f9fafb",
        border: "1px solid #e5e7eb",
        fontSize: 11,
        color: "#4b5563",
        display: "inline-flex",
        gap: 4
      }}
    >
      <span>{label}:</span>
      <strong>{valor}</strong>
    </div>
  );
};

export default WarehousesPage;