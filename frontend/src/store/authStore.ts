import { env } from "@/env/env.mjs";
import { AuthState } from "@/types/auth-state";
import API, { setLogoutFunction } from "@/utils/api";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: undefined, // Initially undefined
      loading: true, // Track auth state loading

      login: async (email: string, password: string) => {
        try {
          set({ loading: true }); // Start loading
          const res = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
          if (res.status === 200) {
            set({ user: res.data.user, loading: false });
          }
        } catch (error) {
          console.error("Login failed", error);
          set({ loading: false });
          throw error;
        }
      },

      registerUser: async (username: string, email: string, password: string) => {
        try {
          set({ loading: true });
          await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/register`, { username, email, password });
          set({ loading: false });
        } catch (error) {
          console.error("Register failed", error);
          set({ loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          await API.post("/auth/logout");
        } catch (error) {
          console.error("Logout failed", error);
        } finally {
          set({ user: null, loading: false });
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          window.location.href = "/login";
        }
      },

      setUser: (user) => set({ user, loading: false }),

      // ✅ Handle Zustand hydration (set loading false when restored)
      hydrateAuth: () => {
        if (get().user === undefined) {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state) => {
        state?.hydrateAuth(); // Ensure `loading` is false after hydration
      },
    }
  )
);
