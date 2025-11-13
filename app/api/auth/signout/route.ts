// app/api/auth/signout/route.ts
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('session'); // eller 'auth-token'

  return Response.json({ success: true });
}