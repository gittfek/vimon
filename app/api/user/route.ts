// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';

export async function GET() {
  const user = await getUser();
  return NextResponse.json(user || null);
}
