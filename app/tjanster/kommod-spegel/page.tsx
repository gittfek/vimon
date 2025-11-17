// app/tjanster/montering-av-innerdorr/page.tsx
import Link from "next/link";
import Image from "next/image";
import { DoorClosed, Clock, Ruler, DollarSign, Info, MessageSquare } from "lucide-react";

export default function MonteringAvKommodspegelPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-8">
        <div className="w-16 h-16 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mx-auto mb-4">
          <DoorClosed className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Montering av kommod & spegel</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Att byta kommod och spegel är ett av de snabbaste sätten att ge badrummet en helt ny känsla. Våra certifierade hantverkare tar hand om hela jobbet – från nedmontering till färdig installation.
        </p>
      </section>

      {/* Snabbfakta */}
      <section className="mb-16 flex flex-col sm:flex-row justify-center items-center gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Tid: 2–5 timmar</span>
        </div>
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Nedmontering av gammal kommod ingår</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Pris: Fast pris</span>
        </div>
      </section>

      {/* Före / efter */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Före & efter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/images/kommod-fore.jpg"
              alt="Kommod och spegel före montering"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <p className="text-center text-muted-foreground mt-2">
              Före – gammal vattenskadad kommod
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/images/kommod-efter.jpg"
              alt="Kommod efter montering"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <p className="text-center text-muted-foreground mt-2">
              Efter – ny kommod och spegel redo att användas
            </p>
          </div>
        </div>
      </section>

      {/* Vad som ingår */}
      <section className="mb-16 space-y-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Vad som ingår</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Nedmontering av gammal kommod och spegel.</li>
          <li>Montering av ny kommod, spegel, blandare och avlopp.</li>
          <li>Inkoppling av el (utfört av certifierad partner).</li>
          <li>Justering och tätning enligt branschregler.</li>
          <li>Funktionstest av vatten, avlopp och belysning.</li>
        </ul>
      </section>

      {/* Varför välja oss */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Varför välja oss?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>✅ Installerar enligt nuvarande branschregler.</p>
          <p>✅ Elinstallation av auktoriserad partner.</p>
          <p>✅ Fast pris - inga överraskningar.</p>
          <p>✅ Snabb och smidig bokning.</p>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
          <Info className="w-5 h-5 text-[hsl(var(--primary))]" /> Tips innan montering
        </h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Produkten ska vara påplats, oöppnad och komplett.</li>
          <li>Väggar och golv måste vara fria från hinder.</li>
          <li>Ha koll på var vattenavstängningen sitter och så att den fungerar.</li>
        </ul>
      </section>

      {/* Kundcitat */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center flex justify-center items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[hsl(var(--primary))]" /> Kundcitat
        </h2>

        <div className="overflow-x-auto py-2 -mx-4 px-4">
          <div className="flex gap-6">
            {/*<div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Vimon monterade dörren helt perfekt. Den stängs tyst och ligger helt i linje.”
              </p>
              <p className="font-semibold text-foreground">– Marcus, Malmö</p>
            </div>
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Snabbt, proffsigt och riktigt snyggt resultat.”
              </p>
              <p className="font-semibold text-foreground">– Emma, Lund</p>
            </div>
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Dörren kärvade innan, nu går den helt smidigt!”
              </p>
              <p className="font-semibold text-foreground">– Johan, Helsingborg</p>
            </div>*/}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[hsl(var(--primary)/0.05)] py-12 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Redo att boka montering?
        </h2>
        <p className="text-muted-foreground mb-6">
          Skapa ett konto och beställ jobbet direkt – enkelt, tryggt och professionellt.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-6 py-3 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
        >
          Beställ montering av kommod & spegel
        </Link>
      </section>
    </main>
  );
}
