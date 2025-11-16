// app/api/auth/signout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'; // Ta bort denna om fail


export async function POST() {
  const cookieStore = await cookies();

	cookieStore.delete('session'); // eller 'auth-token'

//  return Response.json({ success: true }); // Lägg till denna om fail
  return NextResponse.redirect('/'); //Ta bort denna om fail


}