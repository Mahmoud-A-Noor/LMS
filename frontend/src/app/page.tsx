"use client";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Home() {
  const { user, loading } = useAuthGuard();

  if (loading) return <p>Loading...</p>; // Prevent flashing of protected content

  return <h1>Hi, this is our home page</h1>;
}
