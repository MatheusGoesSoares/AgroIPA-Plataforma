import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type SeedFormValues = {
  nomeSemente: string;
  cultivar: string;
  tipoCultura: string;
  categoria: string;
  loteOrigem: string;
  quantidadeKg: string;
  armazem: string;
  dataColheita: string;
  dataValidade: string;
  umidade: string;
  pureza: string;
  germinacao: string;
  observacoes: string;
};

type StoredSeed = {
  nomeSemente?: string;
  semente?: string;
  nome?: string;
  cultivar?: string;
  tipoCultura?: string;
  categoria?: string;
  loteOrigem?: string;
  lote?: string;
  quantidadeKg?: number | string;
  armazem?: string;
  dataColheita?: string;
  dataValidade?: string;
  umidade?: string;
  pureza?: string;
  germinacao?: string;
  observacoes?: string;
};

const SeedsFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const editIndexParam = searchParams.get("editIndex");
  const editIndex =
    editIndexParam !== null && !Number.isNaN(Number(editIndexParam))
      ? Number(editIndexParam)
      : null;
  const isEditing = editIndex !== null;

  const [values, setValues] = useState<SeedFormValues>({
    nomeSemente: "",
    cultivar: "",
    tipoCultura: "",
    categoria: "",
    loteOrigem: "",
    quantidadeKg: "",
    armazem: "",
    dataColheita: "",
    dataValidade: "",
    umidade: "",
    pureza: "",
    germinacao: "",
    observacoes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const stored = localStorage.getItem("agroipa-seeds");
    if (!stored) return;

    try {
      const parsed: StoredSeed[] = JSON.parse(stored);
      const seed = parsed[editIndex as number];
      if (!seed) return;

      setValues({
        nomeSemente: seed.nomeSemente ?? seed.semente ?? seed.nome ?? "",
        cultivar: seed.cultivar ?? "",
        tipoCultura: seed.tipoCultura ?? "",
        categoria: seed.categoria ?? "",
        loteOrigem: seed.loteOrigem ?? seed.lote ?? "",
        quantidadeKg:
          seed.quantidadeKg !== undefined && seed.quantidadeKg !== null
            ? String(seed.quantidadeKg)
            : "",
        armazem: seed.armazem ?? "",
        dataColheita: seed.dataColheita ?? "",
        dataValidade: seed.dataValidade ?? "",
        umidade: seed.umidade ?? "",
        pureza: seed.pureza ?? "",
        germinacao: seed.germinacao ?? "",
        observacoes: seed.observacoes ?? "",
      });
    } catch (e) {
      console.error("Erro ao carregar semente para edição", e);
    }
  }, [isEditing, editIndex]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function toNumberOrNull(v: string) {
    if (!v) return null;
    const n = Number(v.replace(",", "."));
    if (Number.isNaN(n)) return null;
    return n;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const stored = localStorage.getItem("agroipa-seeds");
      let parsed: StoredSeed[] = stored ? JSON.parse(stored) : [];

      const payload: StoredSeed = {
        nomeSemente: values.nomeSemente,
        cultivar: values.cultivar,
        tipoCultura: values.tipoCultura,
        categoria: values.categoria,
        loteOrigem: values.loteOrigem,
        quantidadeKg: toNumberOrNull(values.quantidadeKg) ?? "",
        armazem: values.armazem,
        dataColheita: values.dataColheita,
        dataValidade: values.dataValidade,
        umidade: values.umidade,
        pureza: values.pureza,
        germinacao: values.germinacao,
        observacoes: values.observacoes,
      };

      if (isEditing && editIndex !== null && parsed[editIndex]) {
        parsed[editIndex] = payload;
      } else {
        parsed.push(payload);
      }

      localStorage.setItem("agroipa-seeds", JSON.stringify(parsed));
      alert(
        isEditing
          ? "Semente atualizada com sucesso no banco local."
          : "Semente cadastrada com sucesso no banco local."
      );
      navigate("/sementes");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar semente no banco local.");
    } finally {
      setSubmitting(false);
    }
  }

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
          maxWidth: 1120,
          backgroundColor: "rgba(248,247,242,0.98)",
          borderRadius: 24,
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          padding: 28,
          boxSizing: "border-box",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
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
              {isEditing ? "Editar semente" : "Nova semente"}
            </p>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: "4px 0 4px",
                color: "#052e16",
              }}
            >
              {isEditing ? "Atualizar cadastro de semente" : "Cadastrar nova semente"}
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "#4b5563",
                margin: 0,
              }}
            >
              Preencha os dados da semente para controlar origem, validade,
              qualidade e localização no armazém.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap: 18,
              marginBottom: 12,
            }}
          >
            <section
              style={{
                borderRadius: 18,
                backgroundColor: "#ffffff",
                padding: 16,
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  margin: "0 0 10px",
                  color: "#111827",
                }}
              >
                Dados da semente
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 10,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#374151",
                      marginBottom: 4,
                      fontWeight: 500,
                    }}
                  >
                    Nome da semente
                  </label>
                  <input
                    name="nomeSemente"
                    value={values.nomeSemente}
                    onChange={handleChange}
                    placeholder="Ex: Milho híbrido"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#374151",
                      marginBottom: 4,
                      fontWeight: 500,
                    }}
                  >
                    Cultivar / variedade
                  </label>
                  <input
                    name="cultivar"
                    value={values.cultivar}
                    onChange={handleChange}
                    placeholder="Ex: AG 8088"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(0, 1fr) minmax(0, 1fr)",
                    gap: 10,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#374151",
                        marginBottom: 4,
                        fontWeight: 500,
                      }}
                    >
                      Tipo de cultura
                    </label>
                    <select
                      name="tipoCultura"
                      value={values.tipoCultura}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: "1px solid #d1d5db",
                        fontSize: 13,
                        boxSizing: "border-box",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <option value="">Selecione...</option>
                      <option value="Milho">Milho</option>
                      <option value="Soja">Soja</option>
                      <option value="Feijão">Feijão</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#374151",
                        marginBottom: 4,
                        fontWeight: 500,
                      }}
                    >
                      Categoria
                    </label>
                    <select
                      name="categoria"
                      value={values.categoria}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: "1px solid #d1d5db",
                        fontSize: 13,
                        boxSizing: "border-box",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <option value="">Selecione...</option>
                      <option value="Certificada">Certificada</option>
                      <option value="Salva na propriedade">
                        Salva na propriedade
                      </option>
                      <option value="Outras">Outras</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#374151",
                      marginBottom: 4,
                      fontWeight: 500,
                    }}
                  >
                    Lote de origem
                  </label>
                  <input
                    name="loteOrigem"
                    value={values.loteOrigem}
                    onChange={handleChange}
                    placeholder="Ex: Lote 1 - Recife"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(0, 1fr) minmax(0, 1fr)",
                    gap: 10,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#374151",
                        marginBottom: 4,
                        fontWeight: 500,
                      }}
                    >
                      Quantidade disponível (kg)
                    </label>
                    <input
                      name="quantidadeKg"
                      value={values.quantidadeKg}
                      onChange={handleChange}
                      placeholder="Ex: 200"
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: "1px solid #d1d5db",
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#374151",
                        marginBottom: 4,
                        fontWeight: 500,
                      }}
                    >
                      Armazém / local
                    </label>
                    <input
                      name="armazem"
                      value={values.armazem}
                      onChange={handleChange}
                      placeholder="Ex: Armazém 1 - Recife"
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: "1px solid #d1d5db",
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(0, 1fr) minmax(0, 1fr)",
                    gap: 10,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#374151",
                        marginBottom: 4,
                        fontWeight: 500,
                      }}
                    >
                      Data de colheita
                    </label>
                    <input
                      type="date"
                      name="dataColheita"
                      value={values.dataColheita}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: "1px solid #d1d5db",
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#374151",
                        marginBottom: 4,
                        fontWeight: 500,
                      }}
                    >
                      Data de validade
                    </label>
                    <input
                      type="date"
                      name="dataValidade"
                      value={values.dataValidade}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: "1px solid #d1d5db",
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section
              style={{
                borderRadius: 18,
                backgroundColor: "#ffffff",
                padding: 16,
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  margin: "0 0 10px",
                  color: "#111827",
                }}
              >
                Qualidade e observações
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, minmax(0, 1fr))",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#374151",
                      marginBottom: 4,
                      fontWeight: 500,
                    }}
                  >
                    Umidade (%)
                  </label>
                  <input
                    name="umidade"
                    value={values.umidade}
                    onChange={handleChange}
                    placeholder="Ex: 13"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#374151",
                      marginBottom: 4,
                      fontWeight: 500,
                    }}
                  >
                    Pureza (%)
                  </label>
                  <input
                    name="pureza"
                    value={values.pureza}
                    onChange={handleChange}
                    placeholder="Ex: 98"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#374151",
                      marginBottom: 4,
                      fontWeight: 500,
                    }}
                  >
                    Germinação (%)
                  </label>
                  <input
                    name="germinacao"
                    value={values.germinacao}
                    onChange={handleChange}
                    placeholder="Ex: 90"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#374151",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  Observações (lotes, análises, restrições)
                </label>
                <textarea
                  name="observacoes"
                  value={values.observacoes}
                  onChange={handleChange}
                  placeholder="Ex: Amostra enviada para laboratório em 05/04. Utilizar preferencialmente para plantio em área X."
                  style={{
                    width: "100%",
                    resize: "vertical",
                    minHeight: 80,
                    padding: "8px 10px",
                    borderRadius: 12,
                    border: "1px solid #d1d5db",
                    fontSize: 13,
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  backgroundColor: "#f9fafb",
                  borderRadius: 12,
                  padding: 8,
                  marginTop: 8,
                }}
              >
                Essas informações de qualidade são importantes para acompanhar o
                desempenho da semente ao longo das safras.
              </div>
            </section>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 12,
              borderTop: "1px dashed #e5e7eb",
              paddingTop: 10,
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/sementes")}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid #d1d5db",
                backgroundColor: "#ffffff",
                fontSize: 13,
                color: "#374151",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg, #16a34a 0, #15803d 50%, #166534 100%)",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting
                ? isEditing
                  ? "Salvando..."
                  : "Cadastrando..."
                : isEditing
                ? "Salvar alterações"
                : "Salvar semente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeedsFormPage;