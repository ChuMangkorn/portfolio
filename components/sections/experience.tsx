import { education, experience } from "@/lib/data";
import { Reveal } from "@/components/reveal";

// Below sm the date sits above the role so the role gets the full width.
const ROW = "grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4";
const DATE = "whitespace-nowrap font-mono text-label text-fg-faint sm:pt-1";

export function Experience() {
  return (
    <section id="experience" className="border-t bg-bg-raised">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:grid md:grid-cols-12 md:gap-12 md:py-28">
        <Reveal className="md:col-span-4">
          <h2 className="font-display text-4xl tracking-normal [word-spacing:0.06em] md:text-6xl">Where I have worked</h2>
        </Reveal>

        <ol className="mt-12 space-y-8 md:col-span-8 md:mt-0">
          {experience.map((e, i) => {
            // The gap years have no employer; they read as a quieter entry, with their own summary.
            const quiet = !e.company;
            return (
              <Reveal as="li" key={e.period + e.role} delay={i * 0.05} className={ROW}>
                <span className={DATE}>{e.period}</span>
                <div>
                  <h3
                    className={
                      quiet ? "font-medium leading-snug text-fg-muted" : i === 0 ? "text-xl font-semibold leading-snug" : "font-medium leading-snug"
                    }
                  >
                    {e.role}
                    <span className="text-fg-muted">
                      {quiet ? ` in ${e.location}` : ` at ${e.company}${e.location ? `, ${e.location}` : ""}`}
                    </span>
                  </h3>
                  <p className={`mt-2 leading-relaxed ${quiet ? "text-sm text-fg-faint" : i === 0 ? "text-base text-fg-muted" : "text-sm text-fg-muted"}`}>
                    {e.summary}
                  </p>
                </div>
              </Reveal>
            );
          })}
          <Reveal as="li" delay={0.3} className={ROW}>
            <span className={DATE}>{education.period}</span>
            <h3 className="font-medium leading-snug">
              {education.degree}
              <span className="text-fg-muted"> at {education.school}</span>
            </h3>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
