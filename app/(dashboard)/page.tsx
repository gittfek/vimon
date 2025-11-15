import { Button } from '@/components/ui/button';
import { ArrowRight, Database, CreditCard, Hammer, PanelsTopLeft, Toilet } from 'lucide-react';
import Link from "next/link";

export default function HomePage() {
  const services = [
    { icon: <Hammer className="w-6 h-6 text-[hsl(var(--primary))]" />, title: "Golvläggning", slug: "/tjanster/golvlaggning" },
    { icon: <PanelsTopLeft className="w-6 h-6 text-[hsl(var(--primary))]" />, title: "Akustikpaneler", slug: "/tjanster/akustikpaneler" },
    { icon: <Toilet className="w-6 h-6 text-[hsl(var(--primary))]" />, title: "Byte av toalettstol", slug: "/tjanster/byte-wc-stol" },
  ];

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            Byggtjänster på dina villkor
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Beställ små byggjobb enkelt, följ projektet och få hjälp av vårt team – utan totalentreprenad.
          </p>
          <Button size="lg" className="text-lg rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent)/0.9)]" asChild>
            <Link href="/tjanster">Se våra tjänster</Link>
          </Button>
        </div>
      </section>

      {/* Tjänsteexempel */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Våra mest populära tjänster</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Link key={i} href={`/tjanster/${service.slug}`} className="bg-background border border-border rounded-2xl p-6 flex flex-col items-center hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-center">Läs mer och beställ direkt</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hur det funkar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Så fungerar Vimon</h2>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mb-4">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Enkel beställning</h3>
              <p className="text-muted-foreground">Välj tjänst, beskriv jobbet och skicka beställningen.</p>
            </div>
            <div className="flex flex-col items-center text-center mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Smidiga betalningar</h3>
              <p className="text-muted-foreground">Betala tryggt direkt i appen.</p>
            </div>
            <div className="flex flex-col items-center text-center mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mb-4">
                <ArrowRight className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Följ ditt projekt</h3>
              <p className="text-muted-foreground">Se status, chatta med teamet och få uppdateringar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kundcitat */}
      <section className="py-16 bg-[hsl(var(--primary)/0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Vad våra kunder säger</h2>
          <div className="overflow-x-auto py-2 -mx-4 px-4">
            <div className="flex gap-6">
              <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
                <p className="text-muted-foreground mb-4">“Vimon gjorde ett fantastiskt jobb med golvet och badrummet. Rekommenderas!”</p>
                <p className="font-semibold text-foreground">– Anna, Malmö</p>
              </div>
              <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
                <p className="text-muted-foreground mb-4">“Snabbt, smidigt och proffsigt. Vi är supernöjda med monteringen av panelerna.”</p>
                <p className="font-semibold text-foreground">– Johan, Lund</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4">Redo att boka ditt nästa projekt?</h2>
          <p className="text-muted-foreground mb-8">Välj tjänst, beskriv jobbet och beställ direkt – enkelt och tryggt.</p>
          <Button size="lg" className="text-lg rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent)/0.9)]" asChild>
            <Link href="/tjanster">Se våra tjänster</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}