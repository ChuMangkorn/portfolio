import Link from "next/link";
import { profile } from "@/lib/data";
import { NavLinks } from "@/components/nav-links";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/80 backdrop-blur print:hidden">
      <nav aria-label="Sections" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="#main" className="text-sm font-medium tracking-tight sm:text-base">
          {profile.shortName}
        </Link>
        <NavLinks links={links} />
      </nav>
    </header>
  );
}
