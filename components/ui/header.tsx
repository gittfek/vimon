















'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import useSWR from 'swr';
import { UserMenu } from "@/components/ui/user-menu";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { data: user, error } = useSWR('/api/user', fetcher);
  const isLoggedIn = !!user && !error;

  // Dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Vimon Bygg" className="w-9 h-9" />
            <span className="font-bold text-xl text-[hsl(var(--primary))]">Vimon Bygg</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/tjanster"
              className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] font-medium transition"
            >
              Beställ jobb
            </Link>
          </nav>

          {/* Desktop right section */}
          <div className="hidden md:flex items-center space-x-3">

            {/* Dark mode button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Link href="/sign-in" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)/0.8)] font-medium transition">
                  Logga in
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-[hsl(var(--accent))] text-white px-4 py-2 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
                >
                  Registrera
                </Link>
              </>
            )}

          </div>

          {/* Mobile action buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark mode */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-md text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/tjanster"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-md font-medium"
            >
              Beställ jobb
            </Link>

            {isLoggedIn ? (
              <div className="pt-4 pb-3 border-t border-[hsl(var(--border))] mt-3">
                <Link
                  href="/profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)] rounded-md font-medium"
                >
                  Min profil
                </Link>
                <form action="/api/auth/signout" method="post">
                  <button className="mt-2 text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive)/0.8)] flex items-center space-x-2">
                    <LogOut size={20} /> <span>Logga ut</span>
                  </button>
                </form>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-3 py-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)] rounded-md font-medium"
                >
                  Logga in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left mt-2 px-3 py-2 bg-[hsl(var(--accent))] text-white rounded-md font-medium hover:bg-[hsl(var(--accent)/0.9)] transition"
                >
                  Registrera
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
