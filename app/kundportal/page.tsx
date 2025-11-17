'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, PlusCircle } from 'lucide-react';
import useSWR from 'swr';
import { Suspense, useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function JobsSkeleton() {
  return (
    <Card className="mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Dina jobb</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-4 mt-1">
          <div className="h-4 w-32 bg-muted/50 rounded"></div>
          <div className="h-3 w-20 bg-muted/50 rounded mt-2"></div>
        </div>
      </CardContent>
    </Card>
  );
}

function JobsList() {
  const { data: jobs } = useSWR<any[]>('/api/customer/jobs', fetcher);

  if (!jobs?.length) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dina jobb</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Inga jobb skapade ännu.</p>
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
          {jobs.map((job) => (
            <li key={job.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{job.category?.[0] || 'J'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{job.title || 'Jobb utan namn'}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {job.status || 'Status okänd'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Visa jobb
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
      if (!res.ok) throw new Error('Något gick fel');
      setSuccess('Jobbet har skapats! Kontrollera din mail för länk.');
      e.currentTarget.reset();
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
          <div>
            <Input name="name" placeholder="Namn" required />
          </div>
          <div>
            <Input name="email" type="email" placeholder="E-post" required />
          </div>
          <div>
            <Input name="phone" placeholder="Telefonnummer" required />
          </div>
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

export default function CustomerJobsPage() {
  return (
    <section className="flex-1 p-4 lg:p-8 bg-background">
      <h1 className="text-lg lg:text-2xl font-medium text-foreground mb-6">
        Mina jobb
      </h1>

      <Suspense fallback={<JobsSkeleton />}>
        <JobsList />
      </Suspense>

      <QuickJobForm />
    </section>
  );
}