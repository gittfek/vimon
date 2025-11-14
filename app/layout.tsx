// app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser } from '@/lib/db/queries';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Vimon',
  description: 'Beställ byggjobb snabbt och enkelt!',
};

export const viewport: Viewport = { maximumScale: 1 };

const manrope = Manrope({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="sv" className={manrope.className}>
      <body className="min-h-[100dvh] flex flex-col bg-background text-foreground">
        <ClientLayout user={user}>{children}</ClientLayout>
      </body>
    </html>
  );
}