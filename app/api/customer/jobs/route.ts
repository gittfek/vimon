// app/api/customer/jobs/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { jobs, jobTypes, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Inte inloggad" }, { status: 401 });
    }

    // Hämta kundens customerId
    const user = await db
      .select({ customerId: users.customerId })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user?.customerId) {
      return NextResponse.json({ jobs: [] });
    }

    const customerJobs = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        status: jobs.status,
        createdAt: jobs.createdAt,
        jobTypeName: jobTypes.name,
        jobTypeSlug: jobTypes.slug,
      })
      .from(jobs)
      .leftJoin(jobTypes, eq(jobs.jobTypeId, jobTypes.id))
      .where(eq(jobs.customerId, user.customerId))
      .orderBy(desc(jobs.createdAt));

    return NextResponse.json({ jobs: customerJobs });
  } catch (err) {
    console.error("Fel vid hämtning av kundens jobb:", err);
    return NextResponse.json({ error: "Serverfel" }, { status: 500 });
  }
}
