import { Button } from '@/components/ui/button';
import { ArrowRight, Database, CreditCard } from 'lucide-react';
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Välkommen till Vimon
                <span className="block text-[hsl(var(--accent))]">Byggtjänster på dina villkor</span>
              </h1>
              <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl text-muted-foreground">
                Beställ små byggjobb enkelt, följ ditt projekt och håll kontakten med vårt team – allt i samma app.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Button 
                  size="lg" 
                  className="text-lg rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent)/0.9)]" 
                  asChild
                >
                  <Link href="/sign-up">
                    Skapa konto
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hur det funkar */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Så fungerar Vimon</h2>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mb-4">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Enkel beställning</h3>
              <p className="text-muted-foreground">
                Välj tjänst, beskriv ditt jobb och skicka din beställning på några sekunder.
              </p>
            </div>

            <div className="flex flex-col items-center text-center mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Smidiga betalningar</h3>
              <p className="text-muted-foreground">
                Betala tryggt direkt i appen med vår Stripe-integration.
              </p>
            </div>

            <div className="flex flex-col items-center text-center mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mb-4">
                <ArrowRight className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Följ ditt projekt</h3>
              <p className="text-muted-foreground">
                Se status på jobbet, chatta med vårt team och få uppdateringar i realtid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Redo att komma igång?</h2>
          <p className="text-muted-foreground mb-8">
            Skapa ett konto idag och beställ ditt första jobb på några minuter.
          </p>
          <Button 
            size="lg" 
            className="text-lg rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent)/0.9)]"
            asChild
          >
            <Link href="/sign-up">
              Skapa konto
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}