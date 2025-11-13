import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import Header from '@/components/ui/header';     // ← NYTT
import Footer from '@/components/ui/footer';     // ← NYTT

export const metadata: Metadata = {
  title: 'Vimon Bygg – Boka byggtjänster enkelt',
  description: 'Skapa profil, beställ jobb och följ dina projekt med Vimon Bygg.',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sv"  // ← Ändrat till svenska!
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50 flex flex-col">
        <SWRConfig
          value={{
            fallback: {
              '/api/user': getUser(),
              '/api/team': getTeamForUser()
            }
          }}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SWRConfig>
      </body>
    </html>
  );
}