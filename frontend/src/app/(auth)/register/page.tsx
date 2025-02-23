import ParticleBackground from "@/components/background/ParticleBackground";
import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <ParticleBackground />
      <RegisterForm />
    </div>
  );
}
