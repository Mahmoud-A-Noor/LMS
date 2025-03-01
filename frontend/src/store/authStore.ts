"use client";
import { env } from "@/env/env.mjs";
import { AuthState } from "@/types/auth-state";
import API, { setLogoutFunction } from "@/utils/api";
import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,

      login: async (email: string, password: string) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
          if (res.status === 200) {
            set({ user: res.data.user, loading: false });
          }
        } catch (error: any) {
          throw error?.response?.data?.message;
        }finally{
          set({ loading: false });
        }
      },

      registerUser: async (username: string, email: string, password: string) => {
        try {
          set({ loading: true });
          await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/register`, { username, email, password });
        } catch (error: any) {
          throw error?.response?.data?.message;
        }finally{
          set({ loading: false });
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
          localStorage.removeItem("auth-storage");
        }
      },

      setUser: (user) => set({ user, loading: false }),

      hydrateAuth: () => {
        const storedData = localStorage.getItem("auth-storage");
        if (storedData) {
            const parsedData = JSON.parse(storedData).state; // Zustand stores state under "state"
            if (parsedData?.user) {
                set({ user: parsedData.user, loading: false });
            } else {
                set({ loading: false });
            }
        } else {
            set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.hydrateAuth();
      },
    }
  )
);

setLogoutFunction(useAuthStore.getState().logout);
// this is an optimized way to use zustand 
// because when we use this hook inside a component the component will only rerender if the user changes
export const useUser = () =>  useAuthStore((state) => state.user) ?? null; 