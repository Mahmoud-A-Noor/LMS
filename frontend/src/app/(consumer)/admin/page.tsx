"use client"
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { useAuthStore, useUser } from "@/store/authStore";

export default function Dashboard() {
  const { user, loading }  = useRoleGuard(["admin"])

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
