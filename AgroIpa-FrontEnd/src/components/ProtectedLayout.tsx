import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, loadingAuth } = useAuthStore();

  if (loadingAuth) return <div className="text-center py-8">Carregando...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
