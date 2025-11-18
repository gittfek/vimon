import { db } from './drizzle';
import { jobs, customers, jobTypes, users } from './schema';
import { and, eq, isNull } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';


export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) return null;

  const sessionData = await verifyToken(sessionCookie.value);
  if (!sessionData?.user?.id) return null;
  if (new Date(sessionData.expires) < new Date()) return null;

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1)
    .then(rows => rows[0] || null);

  return user;
}


// Hämta alla jobb för en viss kund
export async function getCustomerJobs(customerId: number) {
  return db
    .select({
      jobId: jobs.id,
      status: jobs.status,
      jobTypeId: jobs.jobTypeId,
      jobTypeSlug: jobTypes.slug,
      jobTypeName: jobTypes.name,
      createdAt: jobs.createdAt,
    })
    .from(jobs)
    .leftJoin(jobTypes, eq(jobTypes.id, jobs.jobTypeId))
    .where(eq(jobs.customerId, customerId))
    .orderBy(jobs.createdAt);
}

// Hämta ett jobb via slug (tjänst)
export async function getJobsBySlug(slug: string) {
  return db
    .select({
      jobId: jobs.id,
      status: jobs.status,
      customerName: customers.name,
      customerEmail: customers.email,
      jobTypeSlug: jobTypes.slug,
      jobTypeName: jobTypes.name,
      createdAt: jobs.createdAt,
    })
    .from(jobs)
    .leftJoin(customers, eq(customers.id, jobs.customerId))
    .leftJoin(jobTypes, eq(jobTypes.id, jobs.jobTypeId))
    .where(eq(jobTypes.slug, slug as string)) // ← cast här
    .orderBy(jobs.createdAt);
}


// Hämta kunddata kopplat till användare
export async function getCustomerByUserId(userId: number) {
  return db
    .select({
      customerId: customers.id,
      name: customers.name,
      email: customers.email,
      phone: customers.phone,
    })
    .from(customers)
    .leftJoin(users, eq(users.customerId, customers.id))
    .where(eq(users.id, userId))
    .limit(1)
    .then(rows => rows[0] || null);
}

// Hämta ett specifikt jobb via ID
export async function getJobById(jobId: number) {
  return db
    .select({
      jobId: jobs.id,
      status: jobs.status,
      customerName: customers.name,
      customerEmail: customers.email,
      jobTypeSlug: jobTypes.slug,
      jobTypeName: jobTypes.name,
      createdAt: jobs.createdAt,
    })
    .from(jobs)
    .leftJoin(customers, eq(customers.id, jobs.customerId))
    .leftJoin(jobTypes, eq(jobTypes.id, jobs.jobTypeId))
    .where(eq(jobs.id, jobId))
    .limit(1)
    .then(rows => rows[0] || null);
}








/*import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { users, customers, jobs, jobTypes } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date()
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(userId: number) {
  const result = await db
    .select({
      user: users,
      teamId: teamMembers.teamId
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}
    */

/*export async function getTeamForUser() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const result = await db.query.teamMembers.findFirst({
    where: eq(teamMembers.userId, user.id),
    with: {
      team: {
        with: {
          teamMembers: {
            with: {
              user: {
                columns: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      }
    }
  });

  return result?.team || null;
}
*/