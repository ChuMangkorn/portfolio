import { education, experience } from "@/lib/data";
import { Reveal } from "@/components/reveal";

const ROW = "grid grid-cols-[6.5rem_1fr] gap-4 sm:grid-cols-[7rem_1fr]";
const MONO = "font-mono text-xs text-fg-faint";
const DATE = `whitespace-nowrap ${MONO}`;

export function Experience() {
  return (
    <section id="experience" className="border-t bg-bg-raised">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:grid md:grid-cols-12 md:gap-12 md:py-28">
        <Reveal className="md:col-span-4">
          <h2 className="font-display text-4xl tracking-normal [word-spacing:0.06em] md:text-6xl">Where I have worked</h2>
        </Reveal>

        <ol className="mt-12 space-y-8 md:col-span-8 md:mt-0">
          {experience.map((e, i) =>
            e.company ? (
              <Reveal as="li" key={e.period + e.company} delay={i * 0.05} className={ROW}>
                <span className={`pt-1 ${DATE}`}>{e.period}</span>
                <div>
                  <h3 className={i === 0 ? "text-xl font-semibold leading-snug" : "font-medium leading-snug"}>
                    {e.role}
                    <span className="text-fg-muted">
                      {" at "}
                      {e.company}
                      {e.location ? `, ${e.location}` : ""}
                    </span>
                  </h3>
                  <p className={`mt-2 leading-relaxed text-fg-muted ${i === 0 ? "text-base" : "text-sm"}`}>{e.summary}</p>
                </div>
              </Reveal>
            ) : (
              <li key={e.period} className={`${ROW} ${MONO}`}>
                <span className="whitespace-nowrap">{e.period}</span>
                <span>
                  {e.location}, {e.role.toLowerCase()}
                </span>
              </li>
            ),
          )}
          <Reveal as="li" delay={0.3} className={ROW}>
            <span className={`pt-1 ${DATE}`}>{education.period}</span>
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
