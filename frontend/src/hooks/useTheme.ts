"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false); // Prevent hydration mismatch

  useEffect(() => {
    setMounted(true);

    // Check localStorage for user preference
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Use system preference if no user preference is set
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
