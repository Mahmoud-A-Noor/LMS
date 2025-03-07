import useUser from "@/hooks/server-hooks/useUser";
import { User } from "@/types/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes and roles
const protectedRoutes: Record<string, string[]> = {
  "/admin": ["admin"],
  "/dashboard": ["admin", "user"],
};

export async function middleware(req: NextRequest) {
    
    const user: User | null = await useUser()

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based access control
  const pathname = req.nextUrl.pathname;
  const allowedRoles = protectedRoutes[pathname];

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirect unauthorized users
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/dashboard"],
};
