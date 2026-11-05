import { EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { contact, profile } from "@/lib/data";
import { Reveal } from "@/components/reveal";

const cvMail = `mailto:${profile.email}?subject=${encodeURIComponent("CV request")}`;

export function Contact() {
  return (
    <section id="contact" className="border-t bg-bg-tint">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <h2 className="font-display max-w-[20ch] text-5xl leading-[1.02] tracking-normal [word-spacing:0.06em] md:text-7xl">
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg-muted">{contact.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
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
          <p className="mt-6 font-mono text-sm text-fg-muted">{profile.email}</p>
        </Reveal>

        <footer className="mt-20 flex flex-col gap-4 border-t pt-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            {profile.name}, {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-5">
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <GithubLogoIcon size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <LinkedinLogoIcon size={16} /> LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
