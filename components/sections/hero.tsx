import Image from "next/image";
import { ArrowDownIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/data";

// Must match --portrait in globals.css and the md breakpoint.
const PORTRAIT_SIZES = "(min-width: 768px) 440px, 100vw"; // ds-allow-hardcode

/* The hero is above the fold, so it renders without a reveal animation.
   From md the five stages run as a rail under both columns and the portrait stands on its line. */
export function Hero() {
  const last = profile.pipeline.length - 1;
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 px-5 pt-16 sm:px-8 md:min-h-[min(calc(100dvh-4.25rem),46rem)] md:grid-cols-12 md:grid-rows-[1fr_auto] md:pt-20 md:short:pt-10 print:min-h-0 print:pt-8">
      <div className="order-1 md:col-span-7 md:row-start-1 md:self-center md:pb-12 md:short:pb-6">
        <p className="mb-5 flex flex-wrap gap-x-3 text-sm md:short:mb-3">
          <span className="font-medium text-fg">{profile.name}</span>
          <span className="text-fg-muted">{profile.role}</span>
        </p>
        <h1 className="font-display text-hero tracking-normal [word-spacing:0.06em] [text-wrap:balance]">{profile.headline}</h1>
        <p lang="ja" className="mt-6 font-jp text-lg font-medium leading-relaxed text-fg [text-wrap:balance] [word-break:auto-phrase] md:short:mt-4">
          {profile.jp}
        </p>
        <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-fg-muted">{profile.tagline}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3 md:short:mt-6 print:hidden">
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
      </div>

      <ol
        aria-label="How a project moves"
        className="order-2 mt-10 flex flex-wrap items-start gap-x-1 gap-y-2 font-jp text-sm text-fg-faint md:order-none md:col-span-12 md:row-start-2 md:mt-0 md:grid md:grid-cols-5 md:gap-x-0 md:border-t"
      >
        {profile.pipeline.map((step, i) => (
          <li
            key={step.ja}
            className="pipeline-step relative flex items-start gap-1 whitespace-nowrap md:justify-between md:py-5 md:short:py-3 md:pr-4 md:before:absolute md:before:-top-px md:before:left-0 md:before:h-0.5 md:before:w-10 md:before:bg-accent"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <span className="flex flex-col leading-tight">
              <span lang="ja" className="text-label md:text-base lg:text-xl">
                {step.ja}
              </span>
              <span className="text-xs md:mt-1 md:text-label">{step.en}</span>
            </span>
            {i < last && (
              <span aria-hidden className="text-accent max-[22.4rem]:hidden md:max-lg:hidden lg:text-xl">
                {"→"}
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="order-3 md:order-none md:col-span-5 md:col-start-8 md:row-start-1 md:flex md:justify-end md:self-end">
        {/* Cut-out portrait: no box. The glow stays inside its own box; the base stands on the rail from md. */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-portrait-sm [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)] md:max-w-portrait">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_closest-side_at_50%_42%,color-mix(in_oklab,var(--accent)_38%,transparent)_0%,transparent_100%)]"
          />
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes={PORTRAIT_SIZES}
            className="object-contain object-bottom grayscale contrast-110 max-md:[mask-image:linear-gradient(to_top,transparent,black_16%)]"
          />
        </div>
      </div>
    </section>
  );
}
