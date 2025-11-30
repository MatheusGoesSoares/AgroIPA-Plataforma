import { create } from "zustand";
import { AuthUser, loginUser, registerUser, UserRole } from "../services/authService";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (nome: string, email: string, senha: string, tipo: UserRole) => Promise<boolean>;
  logout: () => void;
  hydrateFromStorage: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,

  async login(email, senha) {
    set({ loading: true });
    try {
      const user = await loginUser(email, senha);
      set({
        user,
        token: null,
        isAuthenticated: true,
        loading: false,
      });
      localStorage.setItem("agroipa_user", JSON.stringify(user));
      return true;
    } catch {
      set({ loading: false, isAuthenticated: false, user: null, token: null });
      return false;
    }
  },

  async register(nome, email, senha, tipo) {
    set({ loading: true });
    try {
      const user = await registerUser({ nome, email, senha, tipo });
      set({
        user,
        token: null,
        isAuthenticated: true,
        loading: false,
      });
      localStorage.setItem("agroipa_user", JSON.stringify(user));
      return true;
    } catch {
      set({ loading: false });
      return false;
    }
  },

  logout() {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("agroipa_user");
  },

  hydrateFromStorage() {
    const raw = localStorage.getItem("agroipa_user");
    if (!raw) return;
    try {
      const user = JSON.parse(raw) as AuthUser;
      set({ user, token: null, isAuthenticated: true });
    } catch {
      localStorage.removeItem("agroipa_user");
    }
  },
}));