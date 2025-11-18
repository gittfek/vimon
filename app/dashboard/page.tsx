// app/(dashboard)/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Hammer, ClipboardList } from 'lucide-react';
//import { requireAdmin } from '@/lib/auth/requireAdmin';


export default async function AdminDashboardPage() {
  // Server-side kontroll av admin
  //const user = await requireAdmin();

  // Placeholder-data
  const newJobs = [
    { id: 1, type: 'Golvläggning', status: 'pending' },
    { id: 2, type: 'Badrumsrenovering', status: 'pending' },
    { id: 3, type: 'Målning', status: 'pending' },
  ];

  const ongoingJobs = [
    { id: 4, type: 'Snickeri', status: 'in progress' },
    { id: 5, type: 'Elektriker', status: 'assigned' },
  ];

  const availableWorkers = [
    { id: 1, name: 'Erik Svensson', trade: 'Snickare' },
    { id: 2, name: 'Anna Karlsson', trade: 'Elektriker' },
    { id: 3, name: 'Johan Nilsson', trade: 'Målare' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="flex-1 p-4 lg:p-8 bg-background space-y-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Admin Dashboard
      </h1>

      {/* ---------------- New Jobs ---------------- */}
      <Card className="w-full shadow-sm">
        <CardHeader className="flex items-center space-x-2">
          <ClipboardList className="w-5 h-5 text-muted-foreground" />
          <CardTitle>Nya, inkomna jobb</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {newJobs.map((job) => (
            <div
              key={job.id}
              className="flex justify-between items-center p-3 border rounded hover:shadow-sm transition"
            >
              <div className="flex items-center space-x-3">
                <Hammer className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">{job.type}</p>
              </div>
              <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ---------------- Ongoing Jobs ---------------- */}
      <Card className="w-full shadow-sm">
        <CardHeader className="flex items-center space-x-2">
          <ClipboardList className="w-5 h-5 text-muted-foreground" />
          <CardTitle>Pågående jobb</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ongoingJobs.map((job) => (
            <div
              key={job.id}
              className="flex justify-between items-center p-3 border rounded hover:shadow-sm transition"
            >
              <div className="flex items-center space-x-3">
                <Hammer className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">{job.type}</p>
              </div>
              <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ---------------- Available Workers ---------------- */}
      <Card className="w-full shadow-sm">
        <CardHeader className="flex items-center space-x-2">
          <User className="w-5 h-5 text-muted-foreground" />
          <CardTitle>Lediga hantverkare</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableWorkers.map((worker) => (
            <div
              key={worker.id}
              className="flex justify-between items-center p-3 border rounded hover:shadow-sm transition"
            >
              <div>
                <p className="font-medium text-foreground">{worker.name}</p>
                <p className="text-sm text-muted-foreground">{worker.trade}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
