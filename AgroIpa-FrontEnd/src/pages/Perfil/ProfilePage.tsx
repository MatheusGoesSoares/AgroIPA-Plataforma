import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../services/api";

type ProfileFormValues = {
  nome: string;
  email: string;
  telefone: string;
  fazenda: string;
  cidade: string;
  estado: string;
  preferencias_alerta: string;
};

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  const [form, setForm] = useState<ProfileFormValues>({
    nome: user?.nome || "",
    email: user?.email || "",
    telefone: "",
    fazenda: "",
    cidade: "",
    estado: "",
    preferencias_alerta: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    setInitialLoading(true);

    api
      .get(`/auth/profile/${user.id}`)
      .then((res) => {
        const data = res.data;
        setForm({
          nome: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
          fazenda: data.fazenda || "",
          cidade: data.cidade || "",
          estado: data.estado || "",
          preferencias_alerta: data.preferencias_alerta || "",
        });
      })
      .catch(() => {})
      .finally(() => setInitialLoading(false));
  }, [user?.id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) {
      setError("Nenhum usuário autenticado.");
      return;
    }

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const payload = {
        nome: form.nome,
        telefone: form.telefone || null,
        fazenda: form.fazenda || null,
        cidade: form.cidade || null,
        estado: form.estado || null,
        preferencias_alerta: form.preferencias_alerta || null,
      };

      const res = await api.put(`/auth/profile/${user.id}`, payload);
      const updated = res.data;

      setForm({
        nome: updated.nome || "",
        email: updated.email || "",
        telefone: updated.telefone || "",
        fazenda: updated.fazenda || "",
        cidade: updated.cidade || "",
        estado: updated.estado || "",
        preferencias_alerta: updated.preferencias_alerta || "",
      });

      useAuthStore.setState((prev) => ({
        ...prev,
        user: updated,
        isAuthenticated: true,
      }));

      setSuccess("Dados salvos com sucesso.");
    } catch (err: any) {
      setError("Erro ao salvar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #145c3a 0, #08331e 45%, #03150d 100%)",
    padding: "32px 24px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 1120,
    backgroundColor: "rgba(248, 247, 242, 0.98)",
    borderRadius: 24,
    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
    padding: 28,
    boxSizing: "border-box",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 20,
    flexWrap: "wrap",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 24,
    fontWeight: 700,
    margin: "4px 0 6px",
    color: "#052e16",
  };

  const sectionCardStyle: React.CSSProperties = {
    borderRadius: 18,
    backgroundColor: "#ffffff",
    padding: 16,
    border: "1px solid #e5e7eb",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    color: "#374151",
    marginBottom: 4,
    fontWeight: 500,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    fontSize: 13,
    boxSizing: "border-box",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    resize: "vertical",
    minHeight: 80,
    padding: "8px 10px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 13,
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const buttonPrimaryStyle: React.CSSProperties = {
    padding: "8px 18px",
    borderRadius: 999,
    border: "none",
    background:
      "linear-gradient(135deg, #16a34a 0, #15803d 50%, #166534 100%)",
    color: "#ffffff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    opacity: loading ? 0.7 : 1,
  };

  const statusTextStyle: React.CSSProperties = {
    fontSize: 12,
    marginTop: 8,
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <header style={headerStyle}>
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
              Perfil do usuário
            </p>
            <h1 style={titleStyle}>
              Olá, {form.nome || user?.nome || "Produtor(a)"} 👋
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "#4b5563",
                maxWidth: 480,
                margin: 0,
              }}
            >
              Ajuste seus dados pessoais, informações da propriedade e
              preferências de contato. Esses dados serão usados para alertas e
              comunicações da AgroIPA.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1.1fr)",
              gap: 20,
            }}
          >
            <section style={sectionCardStyle}>
              <h2
                style={{
                  fontSize: 14,
                  margin: "0 0 10px",
                  color: "#111827",
                }}
              >
                Dados pessoais e da propriedade
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 10,
                }}
              >
                <div>
                  <label style={labelStyle}>Nome completo</label>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Ex: João Silva"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>E-mail</label>
                  <input
                    name="email"
                    value={form.email}
                    disabled
                    style={{
                      ...inputStyle,
                      backgroundColor: "#f3f4f6",
                      color: "#6b7280",
                    }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Telefone / WhatsApp</label>
                  <input
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(xx) xxxxx-xxxx"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Nome da fazenda / propriedade</label>
                  <input
                    name="fazenda"
                    value={form.fazenda}
                    onChange={handleChange}
                    placeholder="Ex: Fazenda Boa Vista"
                    style={inputStyle}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(0, 1.2fr) minmax(0, 0.8fr)",
                    gap: 10,
                  }}
                >
                  <div>
                    <label style={labelStyle}>Cidade</label>
                    <input
                      name="cidade"
                      value={form.cidade}
                      onChange={handleChange}
                      placeholder="Ex: Garanhuns"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Estado</label>
                    <input
                      name="estado"
                      value={form.estado}
                      onChange={handleChange}
                      placeholder="Ex: PE"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section style={sectionCardStyle}>
              <h2
                style={{
                  fontSize: 14,
                  margin: "0 0 10px",
                  color: "#111827",
                }}
              >
                Preferências de comunicação
              </h2>

              <div>
                <label style={labelStyle}>
                  Canais e tipos de alerta desejados
                </label>
                <textarea
                  name="preferencias_alerta"
                  value={form.preferencias_alerta}
                  onChange={handleChange}
                  placeholder="Ex: Receber alertas de validade por WhatsApp e e-mail. Alertas climáticos apenas para a fazenda principal."
                  style={textareaStyle}
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
                Essas preferências serão usadas para personalizar as notificações
                de clima, estoque e validade das sementes.
              </div>
            </section>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 12,
              marginTop: 16,
              borderTop: "1px dashed #e5e7eb",
              paddingTop: 12,
            }}
          >
            {error && (
              <span
                style={{
                  ...statusTextStyle,
                  color: "#b91c1c",
                  backgroundColor: "#fee2e2",
                  borderRadius: 999,
                  padding: "4px 10px",
                }}
              >
                {error}
              </span>
            )}

            {success && !error && (
              <span
                style={{
                  ...statusTextStyle,
                  color: "#166534",
                  backgroundColor: "#dcfce7",
                  borderRadius: 999,
                  padding: "4px 10px",
                }}
              >
                {success}
              </span>
            )}

            <button type="submit" disabled={loading} style={buttonPrimaryStyle}>
              {loading || initialLoading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;