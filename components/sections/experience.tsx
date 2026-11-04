import { education, experience } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <section id="experience" className="border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Experience</h2>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {experience.map((e, i) => (
            <Reveal key={e.period + e.company} delay={i * 0.05}>
              <li className="grid grid-cols-[7rem_1fr] gap-4">
                <span className="pt-1 font-mono text-xs text-fg-faint">{e.period}</span>
                <div>
                  <h3 className="font-medium leading-snug">
                    {e.role}
                    <span className="text-fg-muted">
                      {" "}
                      at {e.company}
                      {e.location ? `, ${e.location}` : ""}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{e.summary}</p>
                </div>
              </li>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <li className="grid grid-cols-[7rem_1fr] gap-4">
              <span className="pt-1 font-mono text-xs text-fg-faint">{education.period}</span>
              <div>
                <h3 className="font-medium leading-snug">
                  {education.degree}
                  <span className="text-fg-muted"> at {education.school}</span>
                </h3>
              </div>
            </li>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
