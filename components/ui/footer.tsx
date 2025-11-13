// components/ui/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-primary-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Vimon Bygg AB. Alla rättigheter förbehållna.
        </p>
        <p className="text-xs mt-2">
          Kontakt:{' '}
          <a href="mailto:info@vimon.se" className="text-accent-400 hover:underline">
            info@vimon.se
          </a>{' '}
          | Tel: 08-123 45 67
        </p>
      </div>
    </footer>
  );
}