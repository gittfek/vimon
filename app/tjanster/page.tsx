// app/tjanster/page.tsx
import Link from "next/link";
import {
  Hammer,
  DoorClosed,
  Toilet,
  PanelsTopLeft,
  Wrench,
  Package,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: <Hammer className="w-6 h-6 text-[hsl(var(--primary))]" />,
      title: "Golvläggning",
      desc: "Vi lägger parkett, laminat och vinyl – alltid med noggrann finish.",
      slug: "golvlaggning",
    },
    {
      icon: <DoorClosed className="w-6 h-6 text-[hsl(var(--primary))]" />,
      title: "Montering av innerdörr",
      desc: "Byt eller installera nya innerdörrar snabbt och korrekt.",
      slug: "dorrmontering",
    },
    {
      icon: <Toilet className="w-6 h-6 text-[hsl(var(--primary))]" />,
      title: "Byte av toalettstol",
      desc: "Fast pris inklusive demontering och montering av ny toalett.",
      slug: "byte-wc-stol",
    },
    {
      icon: <PanelsTopLeft className="w-6 h-6 text-[hsl(var(--primary))]" />,
      title: "Montering av akustikpanel",
      desc: "Förbättra både ljud och estetik med moderna träpaneler.",
      slug: "akustikpaneler",
    },
    {
      icon: <Wrench className="w-6 h-6 text-[hsl(var(--primary))]" />,
      title: "Montering av kommod & spegel",
      desc: "Vi hjälper dig montera badrumsmöbler säkert och snyggt.",
      slug: "kommod-spegel",
    },
    {
      icon: <Package className="w-6 h-6 text-[hsl(var(--primary))]" />,
      title: "Be om offert",
      desc: "Kontakta oss för andra enklare bygg- och monteringsjobb.",
      slug: "../offert",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Våra tjänster</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Vimon specialiserar sig på mindre jobb till fastpris. Enkelt, snabbt
          och tryggt — utan att behöva boka totalentreprenad.
        </p>
      </section>

{/* Tjänsteexempel */}
<section className="py-16 bg-card">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-foreground text-center mb-12">Våra mest populära tjänster</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, i) => (
        <Link
          key={i}
          href={`/tjanster/${service.slug}`}
          className="group bg-background border border-border rounded-2xl p-6 flex flex-col items-center hover:shadow-md transition"
        >
          <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--primary)/0.15)] transition">
            {service.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-[hsl(var(--primary))] transition">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-center">
            Läs mer och beställ direkt
          </p>
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* CTA */}
      <section className="text-center bg-[hsl(var(--primary)/0.05)] py-12 rounded-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Redo att boka ditt nästa projekt?
        </h2>
        <p className="text-muted-foreground mb-6">
          Skapa ett konto på under en minut och beställ ditt jobb direkt.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-6 py-3 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
        >
          Kom igång
        </Link>
      </section>
    </main>
  );
}