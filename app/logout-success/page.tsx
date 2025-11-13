// app/logout-success/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Home } from 'lucide-react';

export default function LogoutSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center">
          <LogOut className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-[hsl(var(--primary))]">
          Du är nu utloggad
        </h1>
        <p className="text-gray-600">
          Tack för besöket! Du omdirigeras till startsidan om <strong>2 sekunder</strong>...
        </p>
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 bg-[hsl(var(--accent))] text-white px-6 py-3 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
        >
          <Home size={18} />
          Tillbaka till startsidan
        </button>
      </div>
    </div>
  );
}