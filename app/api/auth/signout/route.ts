// app/api/auth/signout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete('session', {
    path: '/',      // lägg till så det matchar cookiens faktiska path
  });

  return NextResponse.redirect('/sign-in');
}