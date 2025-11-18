// app/api/jobs/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { customers, jobs, jobTypes } from '@/lib/db/schema';
import { users } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, slug } = await req.json();

    // 1. Kolla först om e-posten tillhör en registrerad user
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1)
      .then(rows => rows[0]);

    let customer;

    if (existingUser && existingUser.customerId) {
      // Användaren finns och har redan en customer kopplad → använd den!
      [customer] = await db
        .select()
        .from(customers)
        .where(eq(customers.id, existingUser.customerId))
        .limit(1);

      // Uppdatera namn/telefon ifall de ändrats (bra för synk)
      if (customer) {
        await db
          .update(customers)
          .set({ name, phone })
          .where(eq(customers.id, customer.id));
      }
    } else {
      // 2. Annars – kolla om vi redan har en customer med denna e-post
      [customer] = await db
        .select()
        .from(customers)
        .where(eq(customers.email, email.toLowerCase().trim()))
        .limit(1);

      // 3. Skapa ny customer om ingen fanns
      if (!customer) {
        [customer] = await db
          .insert(customers)
          .values({ name, email: email.toLowerCase().trim(), phone })
          .returning();
      }

      // 4. Om det fanns en user (men utan customer_id) → koppla nu!
      if (existingUser && !existingUser.customerId) {
        await db
          .update(users)
          .set({ customerId: customer.id })
          .where(eq(users.id, existingUser.id));
      }
    }

    // Nu har vi alltid rätt customer i variabeln "customer"

    const [jobType] = await db
      .select()
      .from(jobTypes)
      .where(eq(jobTypes.slug, slug))
      .limit(1);

    if (!jobType) {
      return NextResponse.json({ error: 'Tjänsten finns inte' }, { status: 400 });
    }

    const title = `${jobType.name} – ${name}`;

    const [newJob] = await db
      .insert(jobs)
      .values({
        customerId: customer.id,
        jobTypeId: jobType.id,
        title,
        status: 'NEW',
      })
      .returning();

    return NextResponse.json({ success: true, job: newJob });

  } catch (err: any) {
    console.error('API /jobs/create fel:', err);
    return NextResponse.json({ error: 'Kunde inte skapa bokning' }, { status: 500 });
  }
}