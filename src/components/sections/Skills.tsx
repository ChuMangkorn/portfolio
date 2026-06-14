'use client';

import { motion } from 'framer-motion';

const technical = [
  { name: 'JavaScript (ES6+)', level: 'Advanced' },
  { name: 'React', level: 'Advanced' },
  { name: 'Next.js (App Router)', level: 'Intermediate' },
  { name: 'Tailwind CSS', level: 'Advanced' },
  { name: 'HTML5 & CSS3', level: 'Advanced' },
  { name: 'TypeScript', level: 'Intermediate' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'Git & GitHub', level: 'Advanced' },
  { name: 'UI/UX Design', level: 'Basic' },
];

const languages = [
  { name: 'Thai', level: 'Native' },
  { name: 'Japanese', level: 'JLPT N3' },
  { name: 'English', level: 'Intermediate' },
];

const levelMap: Record<string, number> = {
  'Advanced': 100,
  'Intermediate': 66,
  'Basic': 33,
  'Native': 100,
  'JLPT N3': 60,
};

function SkillRow({ name, level, index }: { name: string; level: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-between py-3.5 border-b border-border/50 group"
    >
      <span className="text-sm text-foreground font-medium">{name}</span>
      <div className="flex items-center gap-4">
        <div className="w-24 h-px bg-border overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: levelMap[level] / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.05 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-foreground origin-left"
          />
        </div>
        <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground w-20 text-right">
          {level}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-12 py-32 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 pb-6 border-b border-border"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Expertise</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-foreground">
            SKILLS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-16 md:gap-24">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">Technical</p>
            {technical.map((s, i) => (
              <SkillRow key={s.name} name={s.name} level={s.level} index={i} />
            ))}
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">Languages</p>
            {languages.map((s, i) => (
              <SkillRow key={s.name} name={s.name} level={s.level} index={i} />
            ))}

            <div className="mt-12">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">Education</p>
              {[
                { year: '2025', title: 'Next.js Cert', org: 'Futureskill' },
                { year: '2015–20', title: 'B.Sc. Computer IS', org: 'RMUTL' },
                { year: '2013–15', title: 'Vocational Cert', org: 'Lanna CTC' },
              ].map(({ year, title, org }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="py-3.5 border-b border-border/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{org}</p>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
