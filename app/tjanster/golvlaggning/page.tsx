// app/tjanster/golvlaggning/page.tsx
import Link from "next/link";
import { Hammer } from "lucide-react";

export default function GolvlaggningPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="w-16 h-16 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mx-auto mb-4">
          <Hammer className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Golvläggning</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Vi lägger parkett, laminat och vinyl med noggrannhet och finish i världsklass. 
          Oavsett storlek på rummet levererar vi ett golv som både känns och ser perfekt ut.
        </p>
      </section>

      {/* Om tjänsten */}
      <section className="mb-16 space-y-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Vad vi erbjuder</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Parkett, laminat och vinyl – färdigt att användas direkt.</li>
          <li>Noggrann mätning och underlagskontroll innan läggning.</li>
          <li>Professionell installation med minimalt stök.</li>
          <li>Fast pris – inga överraskningar.</li>
          <li>Rådgivning kring materialval och skötsel.</li>
        </ul>
      </section>

      {/* Varför välja oss */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Varför välja Vimon?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>✅ Tryggt och pålitligt – vi håller tider och priser.</p>
          <p>✅ Erfarenhet – tusentals kvadratmeter golv lagda sedan starten.</p>
          <p>✅ Snabbt och smidigt – vi tar hand om hela processen från start till slut.</p>
          <p>✅ Personlig service – vi hjälper dig välja rätt golv för just ditt hem.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[hsl(var(--primary)/0.05)] py-12 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Redo att boka golvläggning?
        </h2>
        <p className="text-muted-foreground mb-6">
          Skapa ett konto och beställ jobbet direkt – enkelt, snabbt och tryggt.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-6 py-3 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
        >
          Beställ golvläggning
        </Link>
      </section>
    </main>
  );
}