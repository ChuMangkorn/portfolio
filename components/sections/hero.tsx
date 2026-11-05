import Image from "next/image";
import { ArrowDownIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/data";

// Must match --portrait in globals.css and the md breakpoint.
const PORTRAIT_SIZES = "(min-width: 768px) 380px, 100vw"; // ds-allow-hardcode

/* The hero is above the fold, so it renders without a reveal animation. */
export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-12 px-5 pb-20 pt-16 sm:px-8 md:min-h-[calc(100dvh-4rem)] md:grid-cols-12 md:pb-0 md:pt-20">
      <div className="self-center md:col-span-7 md:pb-24">
        <p className="mb-5 text-sm text-fg-muted">{profile.role}</p>
        <h1 className="font-display text-6xl leading-[0.98] tracking-tight [text-wrap:balance] sm:text-7xl lg:text-8xl">
          {profile.headline}
        </h1>
        <p lang="ja" className="mt-6 font-jp text-base font-medium leading-relaxed text-fg [text-wrap:balance] [word-break:auto-phrase]">
          {profile.jp}
        </p>
        <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-fg-muted">{profile.tagline}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-medium text-accent-ink transition-transform hover:brightness-105 active:scale-[0.98]"
          >
            See the work
            <ArrowDownIcon size={16} weight="bold" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control border text-fg-muted transition-colors hover:border-fg-faint hover:text-fg"
          >
            <GithubLogoIcon size={20} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control border text-fg-muted transition-colors hover:border-fg-faint hover:text-fg"
          >
            <LinkedinLogoIcon size={20} />
          </a>
        </div>
        <ol aria-label="How a project moves" className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 font-jp text-sm text-fg-faint">
          {profile.pipeline.map((step, i) => (
            <li
              key={step.ja}
              className="pipeline-step flex items-center gap-2 whitespace-nowrap"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {i > 0 && (
                <span aria-hidden className="text-accent">
                  {"\u2192"}
                </span>
              )}
              <span className="flex flex-col leading-tight">
                <span lang="ja">{step.ja}</span>
                {step.en !== step.ja && <span className="text-xs">{step.en}</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="md:col-span-5 md:flex md:justify-end">
        {/* Cut-out portrait: no box. The glow sits behind the head and the shoulders land on the section edge. */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-portrait-sm [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)] md:max-w-portrait">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_40%,color-mix(in_oklab,var(--accent)_40%,transparent)_0%,transparent_65%)]"
          />
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes={PORTRAIT_SIZES}
            className="object-contain object-bottom [mask-image:linear-gradient(to_top,transparent,black_16%)]"
          />
        </div>
      </div>
    </section>
  );
}
