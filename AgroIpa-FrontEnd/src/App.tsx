// src/App.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <div className="bg-beige-50 min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main
        className={
          isAuthPage ? "flex-1" : "flex-1 container mx-auto px-4 py-6"
        }
      >
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;