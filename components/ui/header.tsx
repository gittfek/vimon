'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, Moon, Sun, Settings, Activity, Shield, Users } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Dashboard-länkar som tidigare låg i sidobaren
const navItems = [
  { href: '/dashboard', icon: Users, label: 'Team' },
  { href: '/dashboard/general', icon: Settings, label: 'General' },
  { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
  { href: '/dashboard/security', icon: Shield, label: 'Security' }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsOpenMobile, setSettingsOpenMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { data: user, error } = useSWR('/api/user', fetcher);
  const isLoggedIn = !!user && !error;

  // Dark mode + localStorage
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

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
          setIsDark(true);
        } else {
          document.documentElement.classList.remove('dark');
          setIsDark(false);
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
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
            <span className="font-bold text-xl text-[hsl(var(--primary))]">
              Vimon Bygg
            </span>
          </Link>

          {/* Desktop Navigation */}
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

            {/* Settings dropdown (desktop) - only if logged in */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setSettingsOpen(prev => !prev)}
                  className="p-2 rounded-lg text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition"
                >
                  <Settings size={20} />
                </button>

                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-lg py-2 z-50">
                    {navItems.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSettingsOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 hover:bg-[hsl(var(--muted))] transition text-[hsl(var(--foreground))]"
                      >
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Auth */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.email[0].toUpperCase()}
                  </div>
                  <form action="/api/auth/signout" method="post">
                    <button className="text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive)/0.8)] transition">
                      <LogOut size={18} />
                    </button>
                  </form>
                </div>
              </div>
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

{/* Mobile action buttons (right side) */}
<div className="md:hidden flex items-center space-x-2">

  {/* Settings (mobile) */}
  {isLoggedIn && (
    <button
      onClick={() => {
        setSettingsOpenMobile(prev => !prev);
        setMobileMenuOpen(false);
      }}
      className="p-2 rounded-md text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
    >
      <Settings size={22} />
    </button>
  )}

  {/* Hamburger */}
  <button
    onClick={() => {
      setMobileMenuOpen(prev => !prev);
      setSettingsOpenMobile(false);
    }}
    className="p-2 rounded-md text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
  >
    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>

</div>

        </div>
      </div>

      {/* Mobile Menu */}
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

            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center px-3 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-md font-medium transition"
            >
              {isDark ? <Sun className="mr-2" size={18} /> : <Moon className="mr-2" size={18} />}
              {isDark ? 'Ljust läge' : 'Mörkt läge'}
            </button>

            <div className="pt-4 pb-3 border-t border-[hsl(var(--border))] mt-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)] rounded-md font-medium"
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
                      <button className="text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive)/0.8)]">
                        <LogOut size={20} />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left px-3 py-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)] rounded-md font-medium transition"
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
        </div>
      )}

      {/* Mobile Settings Dropdown */}
      {settingsOpenMobile && isLoggedIn && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSettingsOpenMobile(false)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-[hsl(var(--muted))] rounded-md text-[hsl(var(--foreground))]"
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}