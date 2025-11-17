// app/(dashboard)/layout.tsx
'use client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen bg-background text-foreground">
      {children}
    </section>
  );
}