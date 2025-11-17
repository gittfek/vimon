// app/tjanster/byte-av-wc-stol/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Wrench, Clock, ShieldCheck, DollarSign, Info, MessageSquare } from "lucide-react";

export default function ByteAvWCStolPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-8">
        <div className="w-16 h-16 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mx-auto mb-4">
          <Wrench className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Byte av WC-stol</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Vi byter din gamla toalettstol mot en ny – snabbt, tryggt och helt fackmannamässigt. 
          Perfekt om du vill uppgradera, slippa läckage eller bara få en fräschare badrumskänsla.
        </p>
      </section>

      {/* Snabbfakta */}
      <section className="mb-16 flex flex-col sm:flex-row justify-center items-center gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Tid: 45–90 minuter</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
          <span>Fackmannamässigt & tryggt</span>
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
              src="/images/wc-fore.jpg"
              alt="WC före byte"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <p className="text-center text-muted-foreground mt-2">Före – sliten eller läckande wc-stol</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/images/wc-efter.jpg"
              alt="WC efter byte"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <p className="text-center text-muted-foreground mt-2">Efter – ny, stabil och vattensäker wc-stol</p>
          </div>
        </div>
      </section>

      {/* Om tjänsten */}
      <section className="mb-16 space-y-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Vad som ingår</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Demontering av din gamla wc-stol.</li>
          <li>Montering av ny toalett enligt tillverkarens anvisningar.</li>
          <li>Kontroll av avloppsanslutning och vattenanslutning.</li>
          <li>Test av funktion, täthet och stabilitet.</li>
          <li>Bortforsling av gamla wc-stolen (valfritt tillägg).</li>
        </ul>
      </section>

      {/* Varför välja oss */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Varför välja Vimon?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>✅ Säker installation – minimerar risk för läckage och försäkringsproblem.</p>
          <p>✅ Snabbt & smidigt – ett vanligt byte tar under 1,5 timme.</p>
          <p>✅ Fast pris – inga dolda kostnader.</p>
          <p>✅ Erfarenhet av alla vanliga wc-modeller och fabrikat.</p>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-16 bg-[hsl(var(--primary)/0.05)] p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
          <Info className="w-5 h-5 text-[hsl(var(--primary))]" /> Tips innan installation
        </h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Säkerställ att du köpt en wc-stol som passar ditt avlopp (golv/vägg).</li>
          <li>Rensa området runt toaletten så vi kommer åt ordentligt.</li>
          <li>Fundera på om du vill lägga till mjukstängande sits eller andra tillval.</li>
        </ul>
      </section>

      {/* Kundcitat */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center flex justify-center items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[hsl(var(--primary))]" /> Kundcitat
        </h2>

        <div className="overflow-x-auto py-2 -mx-4 px-4">
          <div className="flex gap-6">
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Snabbt och proffsigt! Byte av wc-stolen tog mindre än en timme.”
              </p>
              <p className="font-semibold text-foreground">– Lina, Malmö</p>
            </div>
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Allt kändes tryggt och enkelt. Mycket bättre än att göra det själv.”
              </p>
              <p className="font-semibold text-foreground">– Tomas, Lund</p>
            </div>
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex-shrink-0 w-full sm:w-[300px]">
              <p className="text-muted-foreground mb-4">
                “Toppenservice! Inga läckor, snygg montering och bra pris.”
              </p>
              <p className="font-semibold text-foreground">– Eva, Helsingborg</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[hsl(var(--primary)/0.05)] py-12 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Redo att boka byte av wc-stol?
        </h2>
        <p className="text-muted-foreground mb-6">
          Skapa ett konto och beställ jobbet direkt – enkelt, tryggt och professionellt.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-6 py-3 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
        >
          Beställ wc-byte
        </Link>
      </section>
    </main>
  );
}
