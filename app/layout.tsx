import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export const metadata: Metadata = {
  title: 'Vimon',
  description: 'Beställ byggjobb snabbt och enkelt!',
};

export const viewport: Viewport = { maximumScale: 1 };

const manrope = Manrope({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <html lang="sv" className={manrope.className}>
      <body className="min-h-[100dvh] bg-gray-50 text-gray-900 flex flex-col">
        <SWRConfig
          value={{
            fallback: {
              '/api/user': user,
              '/api/team': getTeamForUser(),
            },
          }}
        >
          <Header />
          <main className="flex-1">{children}</main>
          {!user && <Footer />}
        </SWRConfig>
      </body>
    </html>
  );
}
