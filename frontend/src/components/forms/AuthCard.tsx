import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-[500px] mx-auto border border-gray-200 dark:border-gray-700 shadow-lg z-20">
      <CardHeader>
        <CardTitle className="text-center text-5xl font-semibold mb-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
