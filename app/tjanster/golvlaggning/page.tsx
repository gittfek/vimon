// app/tjanster/golvlaggning/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Hammer, Clock, Layers, DollarSign, Info, MessageSquare } from "lucide-react";

export default function GolvlaggningPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-8">
        <div className="w-16 h-16 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mx-auto mb-4">
          <Hammer className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Golvläggning</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Vi lägger parkett, laminat och vinyl med noggrannhet och finish i världsklass. 
          Oavsett storlek på rummet levererar vi ett golv som både känns och ser perfekt ut.
        </p>
      </section>

      {/* Snabbfakta */}
      <section className="mb-16 flex flex-col sm:flex-row justify-center items-center gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Tid: 1–3 dagar</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Typ av golv: Parkett, Laminat, Vinyl</span>
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
              src="/images/golv-fore.jpg"
              alt="Golvet före läggning"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <p className="text-center text-muted-foreground mt-2">Före – slitet och ojämnt golv</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/images/golv-efter.jpg"
              alt="Golvet efter läggning"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <p className="text-center text-muted-foreground mt-2">Efter – nytt, jämnt och elegant golv</p>
          </div>
        </div>
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

      {/* Tips & skötsel */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
          <Info className="w-5 h-5 text-[hsl(var(--primary))]" /> Tips & skötsel
        </h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Torka upp spill omedelbart för att undvika fläckar eller skador.</li>
          <li>Använd filtkuddar under möbler för att skydda ytan.</li>
          <li>Dammsug eller sopa regelbundet för att hålla golvet rent och fint.</li>
          <li>Använd rekommenderade rengöringsmedel för just ditt golvtyp.</li>
        </ul>
      </section>

{/* Kundcitat - scroll/karusell */}
<section className="mb-16">
  <h2 className="text-2xl font-semibold text-foreground mb-6 text-center flex justify-center items-center gap-2">
    <MessageSquare className="w-5 h-5 text-[hsl(var(--primary))]" /> Kundcitat
  </h2>
  
  <div className="overflow-x-auto py-2 -mx-4 px-4">
    <div className="flex gap-6 min-w-max">
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 min-w-[300px] flex-shrink-0">
        <p className="text-muted-foreground mb-4">
          “Vimon gjorde ett fantastiskt jobb med vårt vardagsrumsgolv! Snabbt, smidigt och väldigt noggrant.”
        </p>
        <p className="font-semibold text-foreground">– Anna, Malmö</p>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 min-w-[300px] flex-shrink-0">
        <p className="text-muted-foreground mb-4">
          “Vi är supernöjda med golvläggningen. Tydlig kommunikation och snygg finish. Rekommenderas starkt!”
        </p>
        <p className="font-semibold text-foreground">– Johan, Lund</p>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 min-w-[300px] flex-shrink-0">
        <p className="text-muted-foreground mb-4">
          “Otroligt proffsigt arbete. Golvet ser ut precis som vi drömt om.”
        </p>
        <p className="font-semibold text-foreground">– Sara, Helsingborg</p>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 min-w-[300px] flex-shrink-0">
        <p className="text-muted-foreground mb-4">
          “Rekommenderar Vimon till alla som vill ha ett golv gjort på rätt sätt.”
        </p>
        <p className="font-semibold text-foreground">– Erik, Malmö</p>
      </div>
    </div>
  </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === activeIndex
                ? "bg-[hsl(var(--primary))]"
                : "bg-muted-foreground/50"
            }`}
          />
        ))}
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