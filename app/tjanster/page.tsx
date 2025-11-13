// app/services/page.tsx
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
      title: "Övriga småjobb",
      desc: "Kontakta oss för andra enklare bygg- och monteringsjobb.",
      slug: "ovrigt",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Våra tjänster</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vimon specialiserar sig på mindre jobb till fastpris. Enkelt, snabbt
          och tryggt — utan att behöva boka totalentreprenad.
        </p>
      </section>

      {/* Service grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
            </div>
            <Link
              href={`/tjanster/${service.slug}`}
              className="mt-auto inline-block text-[hsl(var(--primary))] font-medium hover:underline"
            >
              Beställ jobb →
            </Link>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center bg-[hsl(var(--primary)/0.05)] py-12 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-3">
          Redo att boka ditt nästa projekt?
        </h2>
        <p className="text-gray-600 mb-6">
          Skapa ett konto på under en minut och beställ ditt jobb direkt.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-[hsl(var(--accent))] text-white px-6 py-3 rounded-lg font-medium hover:bg-[hsl(var(--accent)/0.9)] transition shadow-sm"
        >
          Kom igång
        </Link>
      </section>
    </main>
  );
}
