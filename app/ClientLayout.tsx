// app/ClientLayout.tsx
'use client';

import { useEffect } from 'react';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { SWRConfig } from 'swr';

export default function ClientLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  // Synka <html>.dark → <body>.dark
  useEffect(() => {
    const syncDarkMode = () => {
      const html = document.documentElement;
      const body = document.body;
      if (html.classList.contains('dark')) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    };

    syncDarkMode();

    const observer = new MutationObserver(syncDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/user': user,
          '/api/team': user ? Promise.resolve([]) : null, // eller din logik
        },
      }}
    >
      <Header />
      <main className="flex-1 bg-background text-foreground">{children}</main>
      {!user && <Footer />}
    </SWRConfig>
  );
}