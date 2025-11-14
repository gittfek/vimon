// app/tjanster/akustikpaneler/page.tsx
import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft, Clock, Layers, DollarSign, Info, MessageSquare } from "lucide-react";

export default function AkustikpanelerPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-8">
        <div className="w-16 h-16 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mx-auto mb-4">
          <PanelsTopLeft className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Montering av akustikpaneler</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Förbättra både ljudmiljö och estetik med våra professionellt monterade akustikpaneler. 
          Vi hjälper dig hela vägen från planering till färdig installation.
        </p>
      </section>

      {/* Snabbfakta */}
      <section className="mb-16 flex flex-col sm:flex-row justify-center items-center gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Tid: 1–2 dagar per rum</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Material: Träpaneler, tygklädda paneler</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Pris: Fast pris per rum</span>
        </div>
      </section>

      {/* Före / efter */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Före & efter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/images/panel-fore.jpg"
              alt="Rummet före montering"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <p className="text-center text-muted-foreground mt-2">Före – ekot och ljudproblem</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/images/panel-efter.jpg"
              alt="Rummet efter montering"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <p className="text-center text-muted-foreground mt-2">Efter – bättre ljudmiljö och snygg finish</p>
          </div>
        </div>
      </section>

      {/* Om tjänsten */}
      <section className="mb-16 space-y-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Vad vi erbjuder</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Planering och rådgivning för bästa ljudabsorption och estetik.</li>
          <li>Professionell montering av trä- och tygpaneler.</li>
          <li>Anpassning efter rumsstorlek och layout.</li>
          <li>Fast pris – inga överraskningar.</li>
          <li>Tips för underhåll och rengöring av panelerna.</li>
        </ul>
      </section>

      {/* Varför välja oss */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Varför välja Vimon?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>✅ Tryggt och pålitligt – vi håller tider och priser.</p>
          <p>✅ Erfarenhet – många installerade paneler i hem, kontor och studior.</p>
          <p>✅ Snabbt och smidigt – vi tar hand om hela processen från start till slut.</p>
          <p>✅ Personlig service – vi hjälper dig välja rätt paneler för just ditt rum.</p>
        </div>
      </section>

      {/* Tips & skötsel */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
          <Info className="w-5 h-5 text-[hsl(var(--primary))]" /> Tips & skötsel
        </h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Dammsug försiktigt panelerna regelbundet för att hålla dem rena.</li>
          <li>Undvik direkt solljus på tygpaneler för att förhindra blekning.</li>
          <li>Kontrollera fästen och skruvar efter längre perioder.</li>
          <li>Rengör fläckar försiktigt med mild rengöring rekommenderad för materialet.</li>
        </ul>
      </section>

      {/* Kundcitat - scroll/karusell */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center flex justify-center items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[hsl(var(--primary))]" /> Kundcitat
        </h2>
        
        <div className="overflow-x-auto py-2 -mx-4 px-4">
          <div className="flex gap-6">
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Panelerna gjorde underverk med akustiken i vår hemmastudio. Vimon var proffsiga hela vägen.”
              </p>
              <p className="font-semibold text-foreground">– Mikael, Malmö</p>
            </div>
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Fantastisk service och snygg installation. Nu låter vårt kontor mycket bättre.”
              </p>
              <p className="font-semibold text-foreground">– Lina, Lund</p>
            </div>
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Vi rekommenderar Vimon varmt! Panelerna sitter perfekt och ser stilrena ut.”
              </p>
              <p className="font-semibold text-foreground">– Erik, Helsingborg</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[hsl(var(--primary)/0.05)] py-12 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Redo att boka montering av akustikpaneler?
        </h2>
        <p className="text-muted-foreground mb-6">
          Skapa ett konto och beställ jobbet direkt – enkelt, snabbt och tryggt.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-6 py-3 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
        >
          Beställ montering
        </Link>
      </section>
    </main>
  );
}