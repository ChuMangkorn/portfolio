import Link from "next/link";
import { profile } from "@/lib/data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="#main" className="font-medium tracking-tight">
          {profile.shortName}
        </Link>
        <ul className="flex items-center gap-4 text-sm text-fg-muted sm:gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-6 items-center py-2 transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
