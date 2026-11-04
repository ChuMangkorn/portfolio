import Image from "next/image";
import { ArrowDownIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/reveal";

// Must match --portrait in globals.css and the md breakpoint.
const PORTRAIT_SIZES = "(min-width: 768px) 380px, 100vw"; // ds-allow-hardcode

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:min-h-[calc(100dvh-4rem)] md:grid-cols-12 md:pb-24 md:pt-20">
      <Reveal className="md:col-span-7">
        <p className="mb-5 text-sm text-fg-muted">{profile.role}</p>
        <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {profile.headline}
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-fg-muted">
          {profile.tagline}
        </p>
        <p lang="ja" className="mt-3 text-sm text-fg-faint">
          {profile.jp}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex h-11 items-center gap-2 rounded-card bg-accent px-5 text-sm font-medium text-accent-ink transition-transform hover:brightness-105 active:scale-[0.98]"
          >
            See the work
            <ArrowDownIcon size={16} weight="bold" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-11 w-11 items-center justify-center rounded-card border text-fg-muted transition-colors hover:border-fg-faint hover:text-fg"
          >
            <GithubLogoIcon size={20} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center rounded-card border text-fg-muted transition-colors hover:border-fg-faint hover:text-fg"
          >
            <LinkedinLogoIcon size={20} />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="md:col-span-5 md:flex md:justify-end">
        <div className="relative aspect-[4/5] w-full max-w-portrait overflow-hidden rounded-card border bg-bg-raised">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes={PORTRAIT_SIZES}
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
