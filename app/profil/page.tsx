'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Edit } from 'lucide-react';
import useSWR from 'swr';
import { Suspense } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function AccountSkeleton() {
  return (
    <Card className="mb-8 h-[160px]">
      <CardHeader>
        <CardTitle>Dina uppgifter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-4 mt-1">
          <div className="h-4 w-32 bg-muted/50 rounded"></div>
          <div className="h-4 w-48 bg-muted/50 rounded"></div>
          <div className="h-4 w-28 bg-muted/50 rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
}

function AccountForm() {
  const { data: user } = useSWR('/api/customer/me', fetcher);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(null);
    setError(null);

    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch('/api/customer/me/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Något gick fel vid sparande');
      setSuccess('Uppgifter sparade!');
    } catch (err: any) {
      setError(err.message || 'Något gick fel');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Dina uppgifter</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              defaultValue={user?.name || ''}
              placeholder="Namn"
              required
            />
          </div>
          <div>
            <Input
              name="email"
              type="email"
              defaultValue={user?.email || ''}
              placeholder="E-post"
              required
            />
          </div>
          <div>
            <Input
              name="phone"
              defaultValue={user?.phone || ''}
              placeholder="Telefonnummer"
            />
          </div>
          {error && <p className="text-destructive">{error}</p>}
          {success && <p className="text-[hsl(var(--primary))]">{success}</p>}
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sparar...
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Spara ändringar
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(null);
    setError(null);

    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch('/api/customer/me/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Kunde inte uppdatera lösenord');
      setSuccess('Lösenord uppdaterat!');
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.message || 'Något gick fel');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Byt lösenord</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input name="currentPassword" type="password" placeholder="Nuvarande lösenord" required />
          </div>
          <div>
            <Input name="newPassword" type="password" placeholder="Nytt lösenord" required />
          </div>
          <div>
            <Input name="confirmPassword" type="password" placeholder="Bekräfta nytt lösenord" required />
          </div>
          {error && <p className="text-destructive">{error}</p>}
          {success && <p className="text-[hsl(var(--primary))]">{success}</p>}
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sparar...
              </>
            ) : (
              <>Spara nytt lösenord</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AccountPage() {
  return (
    <section className="flex-1 p-4 lg:p-8 bg-background">
      <h1 className="text-lg lg:text-2xl font-medium text-foreground mb-6">
        Mitt konto
      </h1>

      <Suspense fallback={<AccountSkeleton />}>
        <AccountForm />
      </Suspense>

      <PasswordForm />
    </section>
  );
}