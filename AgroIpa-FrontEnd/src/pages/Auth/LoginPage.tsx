// src/pages/Auth/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    try {
      const ok = await login(email, senha);

      if (!ok) {
        setErro("E-mail ou senha inválidos.");
        return;
      }

      const currentUser: any = useAuthStore.getState().user;
      const tipo = currentUser?.tipo || currentUser?.role;

      if (tipo === "FORNECEDOR") {
        navigate("/dashboard/fornecedor");
      } else {
        navigate("/dashboard/agricultor");
      }
    } catch (err: any) {
      setErro(err?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    background:
      "radial-gradient(circle at top, #0f3d28 0, #04140e 40%, #020806 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const cardWrapperStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 960,
    padding: "0 16px",
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: 28,
    background:
      "radial-gradient(circle at 0 0, rgba(236,253,245,0.9), #f9fafb)",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(15,118,110,0.1)",
    border: "1px solid rgba(148,163,184,0.35)",
    padding: "28px 28px 26px",
    maxWidth: 520,
    margin: "0 auto",
  };

  const logoCircleStyle: React.CSSProperties = {
    width: 64,
    height: 64,
    borderRadius: 20,
    background:
      "radial-gradient(circle at 20% 0%, rgba(52,211,153,0.32), transparent 60%), rgba(4,120,87,0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ecfdf5",
    fontWeight: 700,
    fontSize: 18,
    boxShadow: "0 18px 32px rgba(4,120,87,0.55)",
    margin: "0 auto 18px",
  };

  const headerTextStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: 18,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 600,
    color: "#022c22",
    marginBottom: 4,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 1.5,
  };

  const formStyle: React.CSSProperties = {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    color: "#475569",
    marginBottom: 4,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    padding: "9px 11px",
    fontSize: 13,
    outline: "none",
    backgroundColor: "rgba(248,250,252,0.96)",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 999,
    border: "none",
    padding: "10px 14px",
    background: "linear-gradient(to right, #065f46, #16a34a)",
    color: "#ecfdf5",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    marginTop: 4,
    boxShadow: "0 16px 32px rgba(4,120,87,0.6)",
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    opacity: 0.7,
    cursor: "default",
  };

  const errorBoxStyle: React.CSSProperties = {
    marginTop: 6,
    padding: "8px 10px",
    borderRadius: 10,
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    fontSize: 12,
  };

  const footerStyle: React.CSSProperties = {
    marginTop: 14,
    textAlign: "center",
    fontSize: 12,
    color: "#64748b",
  };

  const linkButtonStyle: React.CSSProperties = {
    border: "none",
    background: "none",
    padding: 0,
    marginLeft: 4,
    color: "#047857",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: 3,
    fontSize: 12,
  };

  return (
    <div style={pageStyle}>
      <div style={cardWrapperStyle}>
        <div style={cardStyle}>
          <div style={logoCircleStyle}>Ag</div>

          <div style={headerTextStyle}>
            <h1 style={titleStyle}>AgroIPA Analítica</h1>
            <p style={subtitleStyle}>
              Acesse o painel com seu e-mail institucional para acompanhar
              lotes, sementes e armazéns em tempo real.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            <div>
              <label style={labelStyle}>E-mail institucional</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@ipa.pe.gov.br"
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
                required
              />
            </div>

            {erro && <div style={errorBoxStyle}>{erro}</div>}

            <button
              type="submit"
              style={loading ? disabledButtonStyle : buttonStyle}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div style={footerStyle}>
            Ainda não possui conta?
            <Link to="/cadastro" style={linkButtonStyle as React.CSSProperties}>
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;