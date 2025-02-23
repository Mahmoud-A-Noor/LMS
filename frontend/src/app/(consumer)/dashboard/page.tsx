import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/user";

export default function Dashboard({ user }: { user: User }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>Role: {user.role}</p>
    </div>
  );
}
