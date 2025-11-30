import React from "react";
import { Link } from "react-router-dom";

const SupplierDashboard: React.FC = () => {
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
          maxWidth: "1100px",
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
        {/* Cabeçalho */}
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
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 10px",
                borderRadius: "999px",
                backgroundColor: "#e6f4ea",
                color: "#0f5132",
                fontSize: "12px",
                fontWeight: 500,
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "999px",
                  backgroundColor: "#0f5132",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Ag
              </span>
              Fornecedor conectado
            </div>

            <h1
              style={{
                fontSize: "26px",
                fontWeight: 600,
                margin: 0,
                color: "#052918",
              }}
            >
              Painel do Fornecedor
            </h1>
            <p
              style={{
                marginTop: "4px",
                fontSize: "14px",
                color: "#335f48",
              }}
            >
              Acompanhe pedidos, estoques e transportes de sementes em tempo real.
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
              Novo envio
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
              Ver pedidos
            </button>
          </div>
        </header>

        {/* Cards de resumo */}
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
              titulo: "Pedidos pendentes",
              valor: "5",
              detalhe: "Aguardando confirmação ou agendamento de envio.",
            },
            {
              titulo: "Sementes em trânsito",
              valor: "2,1 t",
              detalhe: "Cargas com rastreamento ativo para produtores.",
            },
            {
              titulo: "Contratos ativos",
              valor: "9",
              detalhe: "Produtores vinculados a este fornecedor.",
            },
            {
              titulo: "Alertas de qualidade",
              valor: "1",
              detalhe: "Lote com validade próxima do vencimento.",
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

        {/* Ações rápidas */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <Link
            to="/sementes"
            style={{
              textDecoration: "none",
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              padding: "14px 16px",
              border: "1px solid #e3efe6",
              boxShadow: "0 6px 18px rgba(0,0,0,0.03)",
              color: "#052918",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Catálogo de sementes
              </h2>
              <p
                style={{
                  marginTop: "4px",
                  fontSize: "12px",
                  color: "#426b53",
                }}
              >
                Organize variedades, classificações e condições comerciais.
              </p>
            </div>
            <span
              style={{
                marginTop: "8px",
                fontSize: "11px",
                fontWeight: 500,
                color: "#11623a",
              }}
            >
              Gerenciar catálogo →
            </span>
          </Link>

          <Link
            to="/rastreamento"
            style={{
              textDecoration: "none",
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              padding: "14px 16px",
              border: "1px solid #e3efe6",
              boxShadow: "0 6px 18px rgba(0,0,0,0.03)",
              color: "#052918",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Cargas em transporte
              </h2>
              <p
                style={{
                  marginTop: "4px",
                  fontSize: "12px",
                  color: "#426b53",
                }}
              >
                Acompanhe status, origem, destino e previsão de entrega.
              </p>
            </div>
            <span
              style={{
                marginTop: "8px",
                fontSize: "11px",
                fontWeight: 500,
                color: "#11623a",
              }}
            >
              Ver rastreamento →
            </span>
          </Link>

          <Link
            to="/armazens"
            style={{
              textDecoration: "none",
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              padding: "14px 16px",
              border: "1px solid #e3efe6",
              boxShadow: "0 6px 18px rgba(0,0,0,0.03)",
              color: "#052918",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Armazéns e silos
              </h2>
              <p
                style={{
                  marginTop: "4px",
                  fontSize: "12px",
                  color: "#426b53",
                }}
              >
                Veja ocupação, temperatura, umidade e lotes armazenados.
              </p>
            </div>
            <span
              style={{
                marginTop: "8px",
                fontSize: "11px",
                fontWeight: 500,
                color: "#11623a",
              }}
            >
              Acessar armazéns →
            </span>
          </Link>
        </section>

        {/* Últimas operações */}
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
              Últimas operações
            </h2>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#11623a",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              Ver todas
            </button>
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
                <tr style={{ color: "#426b53", borderBottom: "1px solid #e3efe6" }}>
                  <th style={{ textAlign: "left", padding: "6px 12px 6px 0" }}>
                    Data
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 12px 6px 0" }}>
                    Tipo
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 12px 6px 0" }}>
                    Descrição
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 0" }}>Status</th>
                </tr>
              </thead>
              <tbody style={{ color: "#052918" }}>
                <tr style={{ borderBottom: "1px solid #f1f4f2" }}>
                  <td style={{ padding: "6px 12px 6px 0" }}>28/11/2025</td>
                  <td style={{ padding: "6px 12px 6px 0" }}>Pedido</td>
                  <td style={{ padding: "6px 12px 6px 0" }}>
                    Confirmação de envio para <strong>Fazenda Boa Esperança</strong>.
                  </td>
                  <td style={{ padding: "6px 0" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        backgroundColor: "#d1f2e0",
                        color: "#0f5132",
                        fontSize: "11px",
                      }}
                    >
                      Em separação
                    </span>
                  </td>
                </tr>

                <tr style={{ borderBottom: "1px solid #f1f4f2" }}>
                  <td style={{ padding: "6px 12px 6px 0" }}>27/11/2025</td>
                  <td style={{ padding: "6px 12px 6px 0" }}>Transporte</td>
                  <td style={{ padding: "6px 12px 6px 0" }}>
                    Saída de carga de <strong>sementes de milho híbrido</strong>.
                  </td>
                  <td style={{ padding: "6px 0" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        backgroundColor: "#fff7e6",
                        color: "#8a6116",
                        fontSize: "11px",
                      }}
                    >
                      Em trânsito
                    </span>
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: "6px 12px 0 0" }}>25/11/2025</td>
                  <td style={{ padding: "6px 12px 0 0" }}>Qualidade</td>
                  <td style={{ padding: "6px 12px 0 0" }}>
                    Revisão de validade do lote <strong>Soja Premium 23/24</strong>.
                  </td>
                  <td style={{ padding: "6px 0 0" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        backgroundColor: "#e8f5e9",
                        color: "#0f5132",
                        fontSize: "11px",
                      }}
                    >
                      Concluído
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupplierDashboard;