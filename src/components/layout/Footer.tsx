export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-8 mt-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
          © 2025 Chulaprungrueang Mangkorn
        </p>
        <p className="text-xs text-muted-foreground">
          Built with Next.js 16 · Tailwind v4 · Framer Motion
        </p>
      </div>
    </footer>
  );
}
