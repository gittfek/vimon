// lib/auth/requireAdmin.ts
import { redirect } from 'next/navigation';
import { getUserFromSession } from './session';

export async function requireAdmin() {
  const user = await getUserFromSession();

  // Not signed in
  if (!user) {
    redirect('/sign-in');
  }

  // Signed in but not admin
  if (user.role !== 'admin') {
    redirect('/403');
  }

  return user; // Return so data can be used in the page
}
