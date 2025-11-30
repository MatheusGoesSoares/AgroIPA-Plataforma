import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import FarmerDashboard from "../pages/Dashboard/FarmerDashboard";
import SupplierDashboard from "../pages/Dashboard/SupplierDashboard";
import SeedsPage from "../pages/Sementes/SeedsPage";
import SeedsFormPage from "../pages/Sementes/SeedsFormPage";
import SeedsDetailPage from "../pages/Sementes/SeedsDetailPage";
import LotsPage from "../pages/Lotes/LotsPage";
import TrackingPage from "../pages/Rastreamento/TrackingPage";
import WarehousesPage from "../pages/Armazens/WarehousesPage";
import ProfilePage from "../pages/Perfil/ProfilePage";
import ProtectedLayout from "../components/ProtectedLayout";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/cadastro" element={<RegisterPage />} />

    <Route element={<ProtectedLayout />}>
      <Route path="/dashboard/agricultor" element={<FarmerDashboard />} />
      <Route path="/dashboard/fornecedor" element={<SupplierDashboard />} />
      <Route path="/sementes" element={<SeedsPage />} />
      <Route path="/sementes/novo" element={<SeedsFormPage />} />
      <Route path="/sementes/:id" element={<SeedsDetailPage />} />
      <Route path="/lotes/*" element={<LotsPage />} />
      <Route path="/rastreamento/:loteId" element={<TrackingPage />} />
      <Route path="/armazens" element={<WarehousesPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
    </Route>

    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRoutes;
