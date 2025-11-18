import { getUserFromSession } from './session';

export async function requireAdminAPI() {
  const user = await getUserFromSession();

  // Not signed in
  if (!user) {
    return { authorized: false, status: 401, error: 'Not authenticated' };
  }

  // Wrong role
  if (user.role !== 'admin') {
    return { authorized: false, status: 403, error: 'Forbidden' };
  }

  return { authorized: true, user };
}
