/*import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { jobs, jobStatusLogs, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth/sessions';

function canChangeStatus(user, job, desiredStatus) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (user.role === 'customer' && job.customerId === user.id) {
    // customers allowed to accept offer -> APPROVED, maybe CANCEL
    return ['APPROVED', 'CANCELLED'].includes(desiredStatus);
  }
  return false;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { newStatus, note } = body;
    const jobId = Number(params.id);

    const jobRes = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
    if (!jobRes.length) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    const job = jobRes[0];

    // fetch user
    const userRes = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);
    const user = userRes[0];
    if (!canChangeStatus(user, job, newStatus)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const oldStatus = job.status;

    // update job
    await db.update(jobs).set({ status: newStatus, updatedAt: new Date() }).where(eq(jobs.id, jobId));

    // log status change
    await db.insert(jobStatusLogs).values({
      jobId,
      oldStatus,
      newStatus,
      changedBy: user.id,
      note,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error updating status', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
*/