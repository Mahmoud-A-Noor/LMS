"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthCard from "./components/AuthCard";
import { loginSchema } from "./validation/login";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/useToast";

export default function LoginForm() {
  const {login} = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { alertError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: {email: string, password: string}) => {
    setLoading(true);
    try {
      await login(data.email, data.password)
      window.location.href = "/";
    } catch (error: any) {
      alertError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email")} placeholder="Enter your email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")} placeholder="Enter your password" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthCard>
  );
}
