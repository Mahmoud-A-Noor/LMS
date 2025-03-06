import { cookies } from 'next/headers';

export async function getUserFromServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  console.log(cookieStore.get('accessToken')?.value)

  if (!token) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    cache: 'no-store',
    credentials: "include"
  });

  if (!response.ok) return null;
  return response.json();
}