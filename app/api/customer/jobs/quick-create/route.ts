// app/api/customer/jobs/quick-create/route.ts

/*import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { users, customers, jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Genererar enkel slump-sträng till kundens åtkomstlänk
const generateAccessToken = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Alla fält måste fyllas i (namn, email, telefon)." },
        { status: 400 }
      );
    }

    // 1. Finns kund redan?
    const existingUser = await db
      .select({
        id: users.id,
        customerId: users.customerId,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((rows) => rows[0]);

    let customerId: number;

    if (existingUser?.customerId) {
      // Kund finns → återanvänd customerId
      customerId = existingUser.customerId;
    } else {
      // Skapa kund
      const [newCustomer] = await db
        .insert(customers)
        .values({
          name,
          email,
          phone,
          accessToken: generateAccessToken(),
        })
        .returning({ id: customers.id });

      customerId = newCustomer.id;

      // Skapa user kopplad till kund
      await db.insert(users).values({
        name,
        email,
        phone,
        customerId,
      });
    }

    // 2. Skapa jobbet
    const [newJob] = await db
      .insert(jobs)
      .values({
        customerId,
        title: "Nytt jobb",
        status: "pending",
        jobTypeId: null, // angiven av dig – sätts senare via kundens länk
      })
      .returning({ id: jobs.id });

    return NextResponse.json({
      success: true,
      message: "Jobbet har skapats!",
      jobId: newJob.id,
      customerId,
    });
  } catch (err) {
    console.error("Fel i quick-create:", err);
    return NextResponse.json(
      { error: "Serverfel vid skapande av jobb" },
      { status: 500 }
    );
  }
}
*/