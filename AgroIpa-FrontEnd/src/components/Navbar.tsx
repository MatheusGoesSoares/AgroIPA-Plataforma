import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background:
          "linear-gradient(to right, rgba(2,20,12,0.98), rgba(8,51,30,0.98))",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily:
            "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          color: "#f8f7f2",
        }}
      >
        {}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 20%, #7bf59a, #1f8a4f 60%, #0b3a23 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f8f7f2",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
            }}
          >
            Ag
          </div>
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              AgroIPA Analítica
            </div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.8,
              }}
            >
              Gestão de sementes, lotes e armazéns
            </div>
          </div>
        </div>

        {/* Navegação */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 13,
          }}
        >
          <Link
            to="/dashboard/agricultor"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              textDecoration: "none",
              color: "#f8f7f2",
              backgroundColor: isActive("/dashboard") ? "#145c39" : "transparent",
              border: isActive("/dashboard")
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid transparent",
            }}
          >
            Painel
          </Link>

          <Link
            to="/lotes"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              textDecoration: "none",
              color: "#f8f7f2",
              backgroundColor: isActive("/lotes") ? "#145c39" : "transparent",
              border: isActive("/lotes")
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid transparent",
            }}
          >
            Lotes
          </Link>

          <Link
            to="/sementes"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              textDecoration: "none",
              color: "#f8f7f2",
              backgroundColor: isActive("/sementes") ? "#145c39" : "transparent",
              border: isActive("/sementes")
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid transparent",
            }}
          >
            Sementes
          </Link>

          <Link
            to="/armazens"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              textDecoration: "none",
              color: "#f8f7f2",
              backgroundColor: isActive("/armazens") ? "#145c39" : "transparent",
              border: isActive("/armazens")
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid transparent",
            }}
          >
            Armazéns
          </Link>

          <Link
            to="/perfil"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              textDecoration: "none",
              color: "#f8f7f2",
              backgroundColor: isActive("/perfil") ? "#145c39" : "transparent",
              border: isActive("/perfil")
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid transparent",
            }}
          >
            Meu perfil
          </Link>

          <div
            style={{
              width: 1,
              height: 20,
              backgroundColor: "rgba(248,247,242,0.25)",
              marginLeft: 4,
              marginRight: 2,
            }}
          />

          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid rgba(248,247,242,0.65)",
              backgroundColor: "transparent",
              color: "#f8f7f2",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Sair
          </button>

          {user && (
            <span
              style={{
                marginLeft: 6,
                fontSize: 11,
                opacity: 0.8,
              }}
            >
              {user.nome ?? "AgProdutor conectado"}
            </span>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;