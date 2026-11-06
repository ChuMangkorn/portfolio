import { ArrowUpRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { contact, profile } from "@/lib/data";
import { CopyEmail } from "@/components/copy-email";
import { Reveal } from "@/components/reveal";

const cvMail = `mailto:${profile.email}?subject=${encodeURIComponent("CV request")}`;
const bare = (url: string) => url.replace(/^https?:\/\//, "");

/* Offers a line break after each slash, so a long address never splits inside a word. */
function Breakable({ text }: { text: string }) {
  const parts = text.split("/");
  return (
    <>
      {parts.map((part, i) => (
        <span key={part + i}>
          {part}
          {i < parts.length - 1 && (
            <>
              /<wbr />
            </>
          )}
        </span>
      ))}
    </>
  );
}

const profiles = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
];

export function Contact() {
  return (
    <section id="contact" className="border-t bg-bg-tint">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-5xl leading-[1.02] md:text-7xl">
              {contact.heading}
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg-muted">{contact.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3 print:hidden">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 text-sm font-medium text-accent-ink transition-transform hover:brightness-105 active:scale-[0.98]"
              >
                <EnvelopeSimpleIcon size={18} weight="bold" />
                {contact.cta}
              </a>
              <a
                href={cvMail}
                className="inline-flex h-12 items-center rounded-control border px-6 text-sm font-medium text-fg transition-colors hover:border-fg-faint"
              >
                {contact.cvLabel}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5 md:pt-4">
            <ul className="divide-y divide-line border-y">
              <li>
                <CopyEmail email={profile.email} />
              </li>
              {profiles.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-accent"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm text-fg-faint">{p.label}</span>
                      <span className="mt-1 block break-words font-mono text-base tracking-tight text-fg group-hover:text-accent">
                        <Breakable text={bare(p.href)} />
                      </span>
                    </span>
                    <ArrowUpRightIcon size={20} className="shrink-0 text-fg-muted group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="mt-20 flex flex-col gap-4 border-t pt-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between print:hidden">
          <span>
            {profile.name}, {new Date().getFullYear()}
          </span>
          <a href="#" className="inline-flex min-h-11 items-center hover:text-fg">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
