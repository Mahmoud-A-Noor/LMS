import useUser from "./useUser";
import { NextResponse } from "next/server";

export async function useAuthGuard() {
  const user = await useUser();

  if(!user) return new NextResponse(null, {status: 401})

  return user;
}
