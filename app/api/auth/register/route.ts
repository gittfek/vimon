import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { users, customers } from '@/lib/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    // 1. Kolla om användaren redan finns
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then(rows => rows[0]);

    if (existingUser) {
      return NextResponse.json({ error: 'E-post används redan' }, { status: 400 });
    }

    // 2. Hasha lösenord
    const passwordHash = await hash(password, 10);

    // 3. Kolla om kund redan finns
    let customer = await db
      .select()
      .from(customers)
      .where(eq(customers.email, email))
      .limit(1)
      .then(rows => rows[0]);

    // Om kunden inte finns, skapa den
    if (!customer) {
      customer = await db
        .insert(customers)
        .values({ name, email })
        .returning()
        .then(rows => rows[0]);
    }

    // 4. Skapa användare kopplad till customer
    const newUser = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        role: 'customer',
        customerId: customer.id,
      })
      .returning()
      .then(rows => rows[0]);

    return NextResponse.json({ success: true, userId: newUser.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Serverfel' }, { status: 500 });
  }
}
