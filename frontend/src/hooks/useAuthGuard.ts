"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard() {
  const { user, loading } = useAuthStore(); // ✅ Now tracking loading state
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // ✅ Prevent redirecting while Zustand is hydrating
    if (user === null) {
      router.replace("/401");
    }
  }, [user, router, loading]);

  return { user, loading };
}
