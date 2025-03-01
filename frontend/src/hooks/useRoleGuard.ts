"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthGuard } from "./useAuthGuard";

export function useRoleGuard(allowedRoles: string[]) {
  const { user, loading } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user && !allowedRoles.includes(user.role)) {
      router.replace("/403");
    }
  }, [user, router, allowedRoles]);

  return { user, loading };
}
