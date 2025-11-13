'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: user, error } = useSWR('/api/user', fetcher);
  const isLoggedIn = !!user && !error;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Vimon Bygg" className="w-9 h-9" />
            <span className="font-bold text-xl text-[hsl(var(--primary))]">
              Vimon Bygg
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/tjanster" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Beställ jobb
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)/0.8)] font-medium transition"
                >
                  Mina jobb
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.email[0].toUpperCase()}
                  </div>
                  <form action="/api/auth/signout" method="post">
                    <button className="text-gray-600 hover:text-red-600 transition">
                      <LogOut size={18} />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)/0.8)] font-medium transition"
                >
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

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/tjanster"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beställ jobb
            </Link>
            

            {/* Mobile Auth */}
            <div className="pt-4 pb-3 border-t border-gray-200 mt-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)] rounded-md font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mina jobb
                  </Link>
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.email[0].toUpperCase()}
                      </div>
                      <span className="font-medium text-[hsl(var(--primary))]">
                        {user.email}
                      </span>
                    </div>
                    <form action="/api/auth/signout" method="post">
                      <button className="text-red-600 hover:text-red-700">
                        <LogOut size={20} />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="block w-full text-left px-3 py-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)] rounded-md font-medium transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Logga in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block w-full text-left mt-2 px-3 py-2 bg-[hsl(var(--accent))] text-white rounded-md font-medium hover:bg-[hsl(var(--accent)/0.9)] transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Registrera
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
