import useUser from "./useUser";
import { NextResponse } from "next/server";

export async function useRoleGuard(allowedRoles: string[]) {
  const user = await useUser();

  if(!user) return new NextResponse(null, {status: 401})

  if (user && !allowedRoles.includes(user.role)) return new NextResponse(null, {status: 403})

  return user;
}
