// app/api/auth/signout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('session', { path: '/' });

  return NextResponse.redirect(new URL('/', request.url));
}