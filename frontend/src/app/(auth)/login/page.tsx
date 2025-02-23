import ParticleBackground from "@/components/background/ParticleBackground";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <ParticleBackground />
      <LoginForm />
    </div>
  );
}
