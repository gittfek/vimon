import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, verifyToken } from '@/lib/auth/session';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const DASHBOARD_ROUTE = '/dashboard';
const ADMIN_ROUTE = '/admin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  const isDashboard = pathname.startsWith(DASHBOARD_ROUTE);
  const isAdmin = pathname.startsWith(ADMIN_ROUTE);

  // ===========================
  // 1️⃣ Skydda Dashboard (inloggning)
  // ===========================
  if (isDashboard && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // ===========================
  // 2️⃣ Skydda Admin (admin-roll)
  // ===========================
  let user = null;
  if (sessionCookie) {
    try {
      const session = await verifyToken(sessionCookie.value);

      // Hämta fullständig användare från DB
      [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, session.userId))
        .limit(1);

      if (!user) {
        if (isDashboard || isAdmin) {
          return NextResponse.redirect(new URL('/sign-in', request.url));
        }
      }

      // Kontrollera roll för admin
      if (isAdmin && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/403', request.url));
      }
    } catch (err) {
      console.error('Middleware: ogiltig session', err);
      if (isDashboard || isAdmin) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }
  } else if (isAdmin) {
    // ingen cookie men admin-route → redirect
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // ===========================
  // 3️⃣ Cookie-refresh för GET
  // ===========================
  const res = NextResponse.next();

  if (sessionCookie && request.method === 'GET' && user) {
    try {
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const token = await signToken({
        userId: user.id,
        expires: expiresInOneDay.toISOString(),
      });

      res.cookies.set({
        name: 'session',
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        expires: expiresInOneDay,
      });
    } catch (err) {
      console.error('Middleware: kunde inte uppdatera session', err);
      res.cookies.delete('session');
      if (isDashboard || isAdmin) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs',
};
