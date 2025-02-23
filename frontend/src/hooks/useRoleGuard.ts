"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRoleGuard(allowedRoles: string[]) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/401"); // Not logged in
    } else if (!allowedRoles.includes(user.role)) {
      router.replace("/403"); // Not authorized
    }
  }, [user, router, allowedRoles]);

  return { user };
}
