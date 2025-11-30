import React, { useState, FormEvent } from "react";
import api from "../../services/api";

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

const SeedsFormPage: React.FC = () => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function parseOptionalNumber(raw: string): number | null {
    if (!raw) return null;
    const normalized = raw.replace(",", ".").trim();
    if (!normalized) return null;
    const n = Number(normalized);
    if (Number.isNaN(n)) return null;
    return n;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.nomeSemente.trim()) {
      alert("Informe pelo menos o nome da semente.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      nomeSemente: values.nomeSemente.trim(),
      cultivar: values.cultivar.trim() || null,
      tipoCultura: values.tipoCultura || null,
      categoria: values.categoria || null,
      loteOrigem: values.loteOrigem.trim() || null,
      quantidadeKg: parseOptionalNumber(values.quantidadeKg),
      armazem: values.armazem.trim() || null,
      dataColheita: values.dataColheita || null,
      dataValidade: values.dataValidade || null,
      umidade: parseOptionalNumber(values.umidade),
      pureza: parseOptionalNumber(values.pureza),
      germinacao: parseOptionalNumber(values.germinacao),
      observacoes: values.observacoes.trim() || null,
    };

    try {
      const response = await api.post("/sementes", payload);
      const nome = response.data?.nomeSemente || payload.nomeSemente;
      alert(`Semente "${nome}" cadastrada com sucesso.`);
      setValues({
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
    } catch (err: any) {
      console.error(err);
      let msg = "Erro ao cadastrar semente.";
      const detail = err?.response?.data?.detail || err?.response?.data?.message;
      if (Array.isArray(detail)) {
        msg += " " + detail.map((d: any) => d.msg || d.message || "").join(" ");
      } else if (typeof detail === "string") {
        msg += " " + detail;
      } else if (err?.message) {
        msg += " " + err.message;
      }
      alert(msg.trim());
    } finally {
      setIsSubmitting(false);
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
          backgroundColor: "rgba(248, 247, 242, 0.98)",
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
              Cadastro de semente
            </p>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 700,
                margin: "4px 0 6px",
                color: "#052e16",
              }}
            >
              Nova semente / edição
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "#4b5563",
                maxWidth: 460,
                margin: 0,
              }}
            >
              Preencha os dados principais da semente, lote de origem e
              informações de qualidade para manter o estoque rastreável.
            </p>
          </div>

          <div
            style={{
              padding: 10,
              borderRadius: 16,
              backgroundColor: "#ecfdf3",
              border: "1px solid #bbf7d0",
              fontSize: 11,
              color: "#166534",
              maxWidth: 230,
            }}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>
              Dica rápida
            </strong>
            Use sempre o mesmo padrão de nome para facilitar busca e rastreio,
            ex: <em>“Soja · TMG 7062 · 2025”</em>.
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1.1fr)",
              gap: 20,
              marginBottom: 18,
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
                <Field
                  label="Nome da semente"
                  name="nomeSemente"
                  value={values.nomeSemente}
                  onChange={handleChange}
                  placeholder="Ex: Soja, Milho híbrido, Feijão carioca..."
                  required
                />

                <Field
                  label="Cultivar / variedade"
                  name="cultivar"
                  value={values.cultivar}
                  onChange={handleChange}
                  placeholder="Ex: TMG 7062 IPRO, AG 8088..."
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 10,
                  }}
                >
                  <SelectField
                    label="Tipo de cultura"
                    name="tipoCultura"
                    value={values.tipoCultura}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Selecione..." },
                      { value: "soja", label: "Soja" },
                      { value: "milho", label: "Milho" },
                      { value: "feijao", label: "Feijão" },
                      { value: "algodao", label: "Algodão" },
                      { value: "outros", label: "Outra" },
                    ]}
                  />
                  <SelectField
                    label="Categoria"
                    name="categoria"
                    value={values.categoria}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Selecione..." },
                      { value: "basica", label: "Básica" },
                      { value: "certificada", label: "Certificada" },
                      { value: "fiscalizada", label: "Fiscalizada" },
                      { value: "salva_propria", label: "Salva na propriedade" },
                    ]}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
                    gap: 10,
                  }}
                >
                  <Field
                    label="Lote de origem"
                    name="loteOrigem"
                    value={values.loteOrigem}
                    onChange={handleChange}
                    placeholder="Ex: LT-2025-001"
                  />
                  <Field
                    label="Quantidade disponível (kg)"
                    name="quantidadeKg"
                    value={values.quantidadeKg}
                    onChange={handleChange}
                    placeholder="Ex: 1.200"
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
                    gap: 10,
                  }}
                >
                  <Field
                    label="Armazém / local"
                    name="armazem"
                    value={values.armazem}
                    onChange={handleChange}
                    placeholder="Ex: Silo 1, Galpão 3..."
                  />
                  <Field
                    label="Data de colheita"
                    name="dataColheita"
                    type="date"
                    value={values.dataColheita}
                    onChange={handleChange}
                  />
                </div>

                <Field
                  label="Data de validade"
                  name="dataValidade"
                  type="date"
                  value={values.dataValidade}
                  onChange={handleChange}
                />
              </div>
            </section>

            <section
              style={{
                borderRadius: 18,
                backgroundColor: "#ffffff",
                padding: 16,
                border: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                gap: 10,
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
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 10,
                }}
              >
                <Field
                  label="Umidade (%)"
                  name="umidade"
                  value={values.umidade}
                  onChange={handleChange}
                  placeholder="Ex: 12,5"
                />
                <Field
                  label="Pureza (%)"
                  name="pureza"
                  value={values.pureza}
                  onChange={handleChange}
                  placeholder="Ex: 98"
                />
                <Field
                  label="Germinação (%)"
                  name="germinacao"
                  value={values.germinacao}
                  onChange={handleChange}
                  placeholder="Ex: 92"
                />
              </div>

              <div>
                <label
                  htmlFor="observacoes"
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
                  id="observacoes"
                  name="observacoes"
                  value={values.observacoes}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Ex: Amostra enviada para laboratório em 05/04. Utilizar preferencialmente para plantio em área X."
                  style={{
                    width: "100%",
                    resize: "vertical",
                    minHeight: 90,
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
                  marginTop: 4,
                }}
              >
                Essas informações de qualidade são importantes para acompanhar o
                desempenho da semente ao longo das safras.
              </div>
            </section>
          </div>

          <footer
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              marginTop: 6,
              borderTop: "1px dashed #e5e7eb",
              paddingTop: 12,
              fontSize: 12,
            }}
          >
            <div style={{ color: "#6b7280" }}>
              <span style={{ fontWeight: 500 }}>Status:</span>{" "}
              <span>os dados serão enviados para a API ao salvar.</span>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
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
                onClick={() => window.history.back()}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
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
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? "Salvando..." : "Salvar semente"}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default SeedsFormPage;

type FieldProps = {
  label: string;
  name: keyof SeedFormValues | string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{
          display: "block",
          fontSize: 12,
          color: "#374151",
          marginBottom: 4,
          fontWeight: 500,
        }}
      >
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
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
  );
}

type SelectFieldProps = {
  label: string;
  name: keyof SeedFormValues | string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  options: { value: string; label: string }[];
};

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{
          display: "block",
          fontSize: 12,
          color: "#374151",
          marginBottom: 4,
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
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
        {options.map((opt) => (
          <option key={opt.value || opt.label} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}