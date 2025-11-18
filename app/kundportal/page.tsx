'use client';

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, PlusCircle } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(async (res) => {
  const json = await res.json();
  // Om servern returnerar felobjekt, kasta så SWR hamnar i error
  if (!res.ok) {
    const message = json?.error || 'Nätverksfel';
    const err: any = new Error(message);
    err.status = res.status;
    throw err;
  }
  // Förväntat format: { jobs: [...] }
  return json;
});

function JobsSkeleton() {
  return (
    <Card className="mb-8 animate-pulse">
      <CardHeader>
        <CardTitle>Dina jobb</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-4 w-1/3 bg-muted rounded" />
          <div className="h-3 w-2/3 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustomerJobsPage() {
  return (
    <section className="flex-1 p-4 lg:p-8 bg-background">
      <h1 className="text-lg lg:text-2xl font-medium text-foreground mb-6">Mina jobb</h1>

      <JobsList />

      <QuickJobForm />
    </section>
  );
}

function JobsList() {
  const { data, error, isLoading } = useSWR('/api/customer/jobs', fetcher);

  if (isLoading) {
    return <JobsSkeleton />;
  }

  if (error) {
    // Visar ett tydligt felmeddelande och CTA (reload)
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dina jobb</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive mb-4">Kunde inte hämta jobb: {String(error.message)}</p>
          <Button onClick={() => mutate('/api/customer/jobs')}>Försök igen</Button>
        </CardContent>
      </Card>
    );
  }

  const jobs = data?.jobs ?? [];

  if (!jobs.length) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dina jobb</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Inga jobb skapade ännu. Kolla våra tjänster för att se vad vi erbjuder —{' '}
            <a href="/tjanster" className="underline">/tjanster</a>.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Dina jobb</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {jobs.map((job: any) => (
            <li key={job.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{(job.jobTypeName?.[0] ?? job.title?.[0] ?? 'J').toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{job.title || 'Jobb utan namn'}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {job.status || 'Status okänd'} • <span className="lowercase">{job.jobTypeName ?? 'Okänd tjänst'}</span>
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={`/kundportal/job/${job.id}`}>Visa jobb</a>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function QuickJobForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/customer/jobs/quick-create', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || 'Något gick fel vid skapande');
      }

      setSuccess('Jobbet har skapats! Kontrollera din mail för länk.');
      (e.currentTarget as HTMLFormElement).reset();

      mutate('/api/customer/jobs');
    } catch (err: any) {
      setError(err.message || 'Något gick fel');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Skapa jobb snabbt</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Namn" required />
          <Input name="email" type="email" placeholder="E-post" required />
          <Input name="phone" placeholder="Telefonnummer" required />

          {error && <p className="text-destructive">{error}</p>}
          {success && <p className="text-[hsl(var(--primary))]">{success}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Skapar...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Skapa jobb
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Fyll i dina kontaktuppgifter för att snabbt skapa ett jobb. Du får sedan en länk via mail för att fylla i fler detaljer.
        </p>
      </CardFooter>
    </Card>
  );
}
