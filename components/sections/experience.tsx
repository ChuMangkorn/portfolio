import { education, experience } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <section id="experience" className="border-t bg-bg-raised">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2 className="font-display text-4xl tracking-tight md:text-6xl">Where I have worked</h2>
        </Reveal>

        <ol className="mt-12 max-w-3xl space-y-8">
          {experience.map((e, i) =>
            e.company ? (
              <Reveal key={e.period + e.company} delay={i * 0.05}>
                <li className="grid grid-cols-[7rem_1fr] gap-4">
                  <span className="pt-1 font-mono text-xs text-fg-faint">{e.period}</span>
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
                </li>
              </Reveal>
            ) : (
              <li
                key={e.period}
                className="grid grid-cols-[7rem_1fr] gap-4 font-mono text-xs text-fg-faint"
              >
                <span>{e.period}</span>
                <span>
                  {e.location}, {e.role.toLowerCase()}
                </span>
              </li>
            ),
          )}
          <Reveal delay={0.3}>
            <li className="grid grid-cols-[7rem_1fr] gap-4">
              <span className="pt-1 font-mono text-xs text-fg-faint">{education.period}</span>
              <h3 className="font-medium leading-snug">
                {education.degree}
                <span className="text-fg-muted"> at {education.school}</span>
              </h3>
            </li>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
