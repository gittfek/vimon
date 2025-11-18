// app/components/ui/jobslist.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Job = {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  jobTypeName: string;
  jobTypeSlug: string;
};

function JobsSkeleton() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Dina jobb</CardTitle> </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 p-4 animate-pulse">
              <div className="h-12 w-12 rounded-full bg-muted/50" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-64 bg-muted/50 rounded" />
                <div className="h-3 w-32 bg-muted/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function JobsList() {
  const { data: jobs, error, isLoading } = useSWR<Job[]>('/api/customer/jobs', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });

  if (error) {
    return (
      <Card className="mb-8 border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Kunde inte hämta jobb</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Kontrollera att du är inloggad.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) return <JobsSkeleton />;

  if (!jobs || jobs.length === 0) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dina jobb</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Du har inga bokade jobb ännu
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            När du bokar en tjänst via formuläret kommer den dyka upp här automatiskt.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':          return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':  return 'bg-amber-100 text-amber-800';
      case 'COMPLETED':    return 'bg-green-100 text-green-800';
      case 'CANCELLED':    return 'bg-red-100 text-red-800';
      default:             return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'NEW':          return 'Ny bokning';
      case 'IN_PROGRESS':  return 'Pågående';
      case 'COMPLETED':    return 'Klart';
      case 'CANCELLED':    return 'Avbokat';
      default:             return status;
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Dina jobb ({jobs.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-5">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors border"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-background">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                    {job.jobTypeName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{job.jobTypeName}</span>
                    <span>•</span>
                    <span>{new Date(job.createdAt).toLocaleDateString('sv-SE')}</span>
                  </div>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {getStatusText(job.status)}
                  </span>
                </div>
              </div>

              <Button asChild variant="default" size="sm">
                <a href={`/portal/jobb/${job.id}`}>
                  Visa detaljer
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}