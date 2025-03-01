"use client"
import { Theme, ThemeState } from "@/types/theme-state";
import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      mounted: false,

      setTheme: (theme) => {
        set({ theme });
        if (theme !== "system") {
          localStorage.setItem("theme", theme);
        }
      },

      toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        get().setTheme(newTheme);
      },

      hydrateTheme: () => {
        if (get().mounted) return;

        const storedTheme = localStorage.getItem("theme") as Theme | null;

        if (storedTheme) {
          set({ theme: storedTheme });
        } else {
          const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          set({ theme: systemPrefersDark ? "dark" : "light" });
        }

        set({ mounted: true });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
