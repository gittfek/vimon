import { compare, hash } from 'bcryptjs';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { NewUser } from '@/lib/db/schema';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return compare(plainTextPassword, hashedPassword);
}

/**
 * Session-data i token
 * Endast userId + expires
 */
type SessionData = {
  userId: number;
  expires: string;
};

/**
 * Skapa JWT med endast userId + expires
 */
export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(key);
}

/**
 * Verifiera token och returnera SessionData
 */
export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, { algorithms: ['HS256'] });
  return payload as SessionData;
}

/**
 * Hämta session från cookie
 */
export async function getSession(): Promise<SessionData | null> {
  const sessionCookie = (await cookies()).get('session')?.value;
  if (!sessionCookie) return null;
  return await verifyToken(sessionCookie);
}

/**
 * Skapa session-cookie för inloggad user
 */
export async function setSession(user: NewUser) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: SessionData = {
    userId: user.id!,
    expires: expiresInOneDay.toISOString(),
  };

  const encryptedSession = await signToken(session);

  (await cookies()).set('session', encryptedSession, {
    path: '/',
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
}

/**
 * Hämta fullständig user från session
 * Returnerar null om cookie saknas eller user inte finns
 */
export async function getUserFromSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) return null;

  // Hämta userId från token
  let session: SessionData;
  try {
    session = await verifyToken(sessionCookie);
  } catch {
    return null;
  }

  // Hämta användare från DB
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  return user || null;
}
