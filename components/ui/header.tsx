// components/ui/Header.tsx
'use client'; // ← VIKTIGT! För useState i Next.js App Router

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Installera: npm install lucide-react

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Vimon Bygg" className="w-9 h-9" />
            <span className="font-bold text-xl text-[hsl(var(--primary))]">Vimon Bygg</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Beställ jobb
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Min profil
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Projekt
            </Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
          <button className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)/0.8)] font-medium transition">
              Logga in
          </button>
          <button className="bg-[hsl(var(--accent))] text-white px-4 py-2 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm">
              Registrera
          </button>
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
              href="/jobs"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beställ jobb
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Min profil
            </Link>
            <Link
              href="/projects"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projekt
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200 mt-3">
              {/* MOBILMENY – KNAPPAR */}
                <div className="pt-4 pb-3 border-t border-gray-200 mt-3">
                  <button className="block w-full text-left px-3 py-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)] rounded-md font-medium transition">
                    Logga in
                  </button>
                  <button className="block w-full text-left mt-2 px-3 py-2 bg-[hsl(var(--accent))] text-white rounded-md font-medium hover:bg-[hsl(var(--accent)/0.9)] transition">
                    Registrera
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}