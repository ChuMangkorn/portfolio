import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDownIcon, ArrowRightIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/data";
import { RunGate } from "@/components/run-gate";
import { RunPanel } from "@/components/run-panel";

// Must match --portrait in globals.css (27.5rem, growing to about 34rem on a large monitor) and the md breakpoint.
const PORTRAIT_SIZES = "(min-width: 1600px) 550px, (min-width: 768px) 440px, 100vw"; // ds-allow-hardcode

/* The hero opens with one scripted run of about four seconds (timing in globals.css): the headline lands word by word,
   the portrait is lit, an amber line travels the five stages, and a panel replays how this page was built, its checks
   and its score landing as the line reaches each stage. It is all in the HTML and finishes at rest, so a reader who
   never sees it still gets the whole page.
   From md the stages run as a rail under both columns and the portrait stands on its line. The panel sits over the
   portrait's lower left from xl, and between md and xl on a window shorter than 58rem (a rule in globals.css), where
   above the portrait it would push the rail off the first screen; in a taller window it sits above the portrait. On a phone it comes straight
   after the buttons. Under md the large portrait is not shown at all: a 72 px one sits beside the name instead, because the
   large one would sit below the first screen as a cropped head and repeat the face. The large one is lazy for the same
   reason: a browser does not fetch a lazy image that is display:none, so a phone never downloads it. */
export function Hero() {
  const last = profile.pipeline.length - 1;
  const words = profile.headline.split(" ");
  const [before, after] = profile.tagline.split(profile.taglineEmphasis);
  const [roleBefore, roleAfter] = profile.role.split(profile.roleEmphasis);
  return (
    <section className="hero-recede mx-auto grid max-w-6xl grid-cols-1 gap-x-12 px-5 pt-9 sm:px-8 md:min-h-[min(calc(100dvh-4.25rem),42rem)] md:grid-cols-12 md:grid-rows-[1fr_auto] md:pt-20 md:short:pt-10 print:min-h-0 print:pt-8">
      <div className="order-1 md:col-span-7 md:row-start-1 md:self-center md:pb-12 md:short:pb-6">
        <div className="hero-fade hero-fade--lead mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-5 md:short:mb-3">
          {/* On a phone the large portrait sits below the first screen, so the face is here as well. It is lazy on purpose:
              a browser does not fetch a lazy image that is display:none, so a wide screen never downloads it. */}
          <span className="relative block h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-full border-2 border-accent/50 bg-bg-raised md:hidden">
            <Image src={profile.photo} alt="" fill sizes="72px" className="object-cover object-[50%_0%]" />
          </span>
          <p className="flex min-w-0 flex-col gap-0.5 text-sm [overflow-wrap:anywhere] md:flex-row md:flex-wrap md:gap-x-3 md:text-base">
            <span className="font-medium text-fg">{profile.name}</span>
            <span className="text-fg-muted">
              {roleBefore}
              <span className="font-medium text-accent">{profile.roleEmphasis}</span>
              {roleAfter}
            </span>
          </p>
        </div>
        <h1 className="font-display text-hero [letter-spacing:-0.035em] [text-wrap:balance] [word-spacing:0.08em]">
          {words.map((word, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              <span className="hero-word" style={{ "--w": i } as CSSProperties}>
                {word}
              </span>
            </Fragment>
          ))}
        </h1>
        <p
          lang="ja"
          style={{ "--k": 0 } as CSSProperties}
          className="hero-fade mt-5 font-jp text-lg font-medium leading-relaxed text-fg [overflow-wrap:anywhere] [text-wrap:balance] [word-break:keep-all] supports-[word-break:auto-phrase]:[word-break:auto-phrase] md:mt-6 md:short:mt-4"
        >
          {/* Safari has no auto-phrase: it breaks only at the <wbr>, so "納品まで" is never split. */}
          {profile.jpPhrases.map((phrase, i) => (
            <Fragment key={phrase}>
              {i > 0 && <wbr />}
              {phrase}
            </Fragment>
          ))}
          <span lang="en" className="ml-2 whitespace-nowrap text-sm font-medium text-fg-muted">
            {profile.jlpt}
          </span>
        </p>
        <p style={{ "--k": 1 } as CSSProperties} className="hero-fade mt-3 max-w-[56ch] text-lg leading-relaxed text-fg-muted">
          {before}
          <span className="mark-ai font-medium text-fg">{profile.taglineEmphasis}</span>
          {after}
        </p>
        <div style={{ "--k": 2 } as CSSProperties} className="hero-fade mt-7 flex flex-wrap items-center gap-3 md:mt-9 md:short:mt-6 print:hidden">
          <a
            href="#work"
            className="inline-flex h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-medium text-accent-ink transition-transform hover:brightness-105 active:scale-[0.98]"
          >
            See the work
            <ArrowDownIcon size={16} weight="bold" />
          </a>
          {/* The GitHub icon is not here yet: the profile it leads to has no name, no bio and no pinned repositories, which
              costs more than the icon earns. It comes back beside this one when the profile is ready (the contact section
              lists GitHub meanwhile). */}
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

      <RunGate
        as="ol"
        label="How a project moves"
        className="rail order-3 mb-10 mt-6 flex flex-wrap max-md:border-t max-md:pt-4 items-start gap-x-3 gap-y-2 font-jp text-sm text-fg-muted min-[22.4rem]:gap-x-1 md:order-none md:col-span-12 md:row-start-2 md:mb-0 md:mt-0 md:grid md:grid-cols-5 md:gap-x-0 md:border-t"
      >
        {profile.pipeline.map((step, i) => (
          <li
            key={step.ja}
            className={`pipeline-step relative flex items-start gap-1 whitespace-nowrap md:justify-between md:py-5 md:short:py-3 md:pr-4 md:before:absolute md:before:-top-px md:before:left-0 md:before:h-0.5 md:before:w-10 ${
              i === last ? "text-fg md:before:bg-accent" : "md:before:bg-accent/45"
            }`}
            style={{ "--i": i } as CSSProperties}
          >
            <span className="flex flex-col leading-tight">
              <span lang="ja" className="text-label md:text-base lg:text-xl">
                {step.ja}
              </span>
              <span className="text-xs md:mt-1 md:text-label">{step.en}</span>
            </span>
            {i < last && (
              <span aria-hidden className="mt-[0.2em] text-fg-faint max-[22.4rem]:hidden md:max-lg:hidden lg:text-xl">
                <ArrowRightIcon size="1em" weight="bold" />
              </span>
            )}
          </li>
        ))}
      </RunGate>

      <div className="relative order-2 max-md:mt-6 md:order-none md:col-span-5 md:col-start-8 md:row-start-1 md:flex md:flex-col md:items-end md:justify-end md:self-end">
        <RunPanel className="mx-auto mb-6 w-full max-w-sm md:mx-0 md:max-w-portrait xl:absolute xl:-left-24 xl:bottom-3 xl:z-10 xl:mb-0 xl:w-[21.5rem] xl:max-w-none" />
        {/* Cut-out portrait: no box and no glow; the base stands on the rail from md. */}
        <div className="hero-portrait relative mx-auto hidden aspect-[4/5] w-full max-w-portrait-sm [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] md:mx-0 md:block md:max-w-portrait">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes={PORTRAIT_SIZES}
            className="object-contain object-bottom max-md:[mask-image:linear-gradient(to_top,transparent,black_16%)]"
          />
        </div>
      </div>
    </section>
  );
}
