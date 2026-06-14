'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-32 border-t border-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">About Me</p>
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            WHO<br />I AM
          </h2>
        </motion.div>

        <div className="space-y-8">
          {[
            {
              delay: 0.1,
              text: "I'm a Frontend Developer committed to continuous learning — currently studying in Japan while consistently practicing and building to refine my craft.",
            },
            {
              delay: 0.2,
              text: "I hold JLPT N3 Japanese proficiency and functional English skills, enabling me to work effectively in international teams and environments.",
            },
            {
              delay: 0.3,
              text: "I'm enthusiastic about applying my skills to real-world challenges and contributing to a forward-thinking company where design and engineering intersect.",
            },
          ].map(({ delay, text }, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4 grid grid-cols-2 gap-6 border-t border-border"
          >
            {[
              { label: 'Location', value: 'Thailand / Japan' },
              { label: 'Languages', value: 'TH · JP (N3) · EN' },
              { label: 'Degree', value: 'B.Sc. Computer IS' },
              { label: 'Email', value: 'chu.mangkorn@gmail.com' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">{label}</p>
                <p className="text-sm text-foreground font-medium">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
