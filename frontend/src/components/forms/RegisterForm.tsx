"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthCard from "./components/AuthCard";
import { registerSchema } from "./validation/register";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/useToast";


export default function RegisterForm() {
  const {registerUser} = useAuthStore()
  const {alertSuccess, alertError} = useToast()
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data)
    console.log(loading)
    try {
      await registerUser(data.username, data.email, data.password)
      alertSuccess("Registration successful!");
      window.location.href = "/login";
    } catch (error) {
      alertError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div>
          <Label>Name</Label>
          <Input type="text" {...register("username")} placeholder="Enter your username" />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

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
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </AuthCard>
  );
}
