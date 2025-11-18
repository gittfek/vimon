import { requireAdminAPI } from '@/lib/auth/requireAdminAPI';

export async function POST(req: Request) {
  const auth = await requireAdminAPI();

  if (!auth.authorized) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { user } = auth; // optional

  // ... admin-only logic here
  return new Response(JSON.stringify({ success: true }));
}
