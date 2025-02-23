"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "../../hooks/useTheme"; // Detect light/dark mode
import "react-toastify/dist/ReactToastify.css";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}
