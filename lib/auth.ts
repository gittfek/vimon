// app/lib/auth.ts  (skapa filen om den inte finns)

import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

export const authOptions: NextAuthConfig = {
  providers: [
    // lägg till dina providers här senare, t.ex. Credentials, Google, etc.
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);