import { profile } from "@/lib/data";
import { NavLinks } from "@/components/nav-links";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact", cta: true },
];

export function Nav() {
  return (
    <header className="tall:sticky top-0 z-40 border-b bg-bg print:hidden">
      {/* Wraps instead of overflowing when the reader enlarges text. */}
      <nav aria-label="Sections" className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-4 px-5 sm:px-8">
        {/* A plain anchor: next/link treats a bare "#" as a no-op and leaves the page where it is. */}
        <a href="#" className="inline-flex min-h-11 items-center text-sm font-medium tracking-tight sm:text-base">
          {profile.shortName}
        </a>
        <NavLinks links={links} />
      </nav>
    </header>
  );
}
