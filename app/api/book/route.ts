/*import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { users, jobs, jobStatusLogs } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, setSession } from '@/lib/auth/sessions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, title, description, address, scheduledAt } = body;

    if (!email || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1) find or create user
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    let user = existing[0];

    if (!user) {
      // create a random temporary password (we'll encourage magic link later)
      const temporaryPassword = Math.random().toString(36).slice(-12);
      const passwordHash = await hashPassword(temporaryPassword);

      const insertRes = await db
        .insert(users)
        .values({
          name,
          email,
          passwordHash,
          role: 'customer',
        })
        .returning();

      user = insertRes[0];
      // Option: send email with magic link / set password flow (implement separately)
    }

    // 2) create job
    const newJob = await db
      .insert(jobs)
      .values({
        title,
        description,
        customerId: user.id,
        createdBy: user.id,
        address,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: 'NEW',
      })
      .returning();

    // 3) create status log
    await db.insert(jobStatusLogs).values({
      jobId: newJob[0].id,
      oldStatus: null,
      newStatus: 'NEW',
      changedBy: user.id,
    });

    // 4) set session cookie so customer can return
    await setSession(user);

    return NextResponse.json({ jobId: newJob[0].id }, { status: 201 });
  } catch (err) {
    console.error('Error in /api/book', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
*/