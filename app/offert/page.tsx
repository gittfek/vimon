// app/tjanster/ovrigt/page.tsx
import Link from "next/link";
import { Wrench, HelpCircle, ClipboardList, Lightbulb, MessageSquare } from "lucide-react";

export default function OffertPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-8">
        <div className="w-16 h-16 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mx-auto mb-4">
          <Wrench className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Offert & specialjobb
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Behöver du hjälp med något som inte finns som färdig tjänst?
          
          Skicka en offertförfrågan så återkommer vi snabbt med pris, planering och upplägg.
        </p>
      </section>

      {/* Snabb intro */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[hsl(var(--primary))]" /> 
          När är offert rätt väg?
        </h2>
        <p>
          Många projekt passar inte perfekt i en tjänstekatalog – därför erbjuder vi även arbeten som kräver offert. Oavsett om det handlar om en mindre justering, ett specialmontage eller ett helt rum som ska byggas om kan vi hjälpa dig hitta rätt lösning.

          Skicka en offertförfrågan så återkommer vi snabbt med pris, planering och upplägg.
        </p>
      </section>

      {/* Exempel */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Vad kan vi hjälpa till med?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-muted-foreground">
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
            <h2 className="text-1xl font-semibold text-foreground mb-6 text-center">
            Anpassning & fix i hemmet
          </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Montera hyllor, krokar eller småmöbler</li>
              <li>Byta blandare eller justera befintlig installation</li>
              <li>Justering av dörrar, luckor och beslag</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
          <h2 className="text-1xl font-semibold text-foreground mb-6 text-center">
            Utomhus & fasad
          </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Altan- och terrasstvätt (via vår partner)</li>
              <li>Taktvätt (via vår partner)</li>
              <li>Takinspektion med drönare</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
          <h2 className="text-1xl font-semibold text-foreground mb-6 text-center">
            Efter renovering eller ombyggnad
          </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Specialanpassningar</li>
              <li>Montering av inredning och detaljer</li>
              <li>Enklare rumskompletteringar där målning eller tyngre jobb inte krävs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Begränsningar */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-[hsl(var(--primary))]" />
          Vad ingår inte?
        </h2>
        <p className="text-muted-foreground">
          Vi tar inte uppdrag som kräver fullskalig renovering med flera discipliner som målning, betongarbete, totalrivning eller större konstruktioner.
          Men om du är osäker — fråga oss. Många uppdrag ligger i gränslandet och kan fortfarande lösas av oss eller av certifierad partner.
        </p>
      </section>

      {/* Fördelar */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-4 text-center flex items-center justify-center gap-2">
          <Lightbulb className="w-5 h-5 text-[hsl(var(--primary))]" /> 
          Varför be om offert?
        </h2>
        <div className="space-y-3 text-muted-foreground text-center max-w-2xl mx-auto">
          <p><strong>✓ Flexibelt upplägg:</strong> du beskriver behovet — vi föreslår smartaste lösningen.</p>
          <p><strong>✓ Tryggt pris:</strong> du får alltid ett fast pris eller ett tydligt intervall innan vi startar.</p>
          <p><strong>✓ Rätt kompetens:</strong> våra hantverkare och partners är certifierade inom respektive område (VVS, el, bygg).</p>
          <p><strong>✓ Snabb återkoppling:</strong> vi svarar normalt samma dag.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[hsl(var(--primary)/0.05)] py-12 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Redo att komma igång?
        </h2>
        <p className="text-muted-foreground mb-6">
          Skicka din offertförfrågan via formuläret nedan – gärna med bilder och en kort beskrivning av arbetet. Ju mer underlag du skickar, desto snabbare får du en exakt offert.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-6 py-3 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
        >
          Begär prisförslag
        </Link>
      </section>
    </main>
  );
}
