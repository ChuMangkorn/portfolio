'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Link, Code } from 'lucide-react';

const links = [
  { icon: Mail, label: 'Email', value: 'chu.mangkorn@gmail.com', href: 'mailto:chu.mangkorn@gmail.com' },
  { icon: Code, label: 'GitHub', value: 'ChuMangkorn', href: 'https://github.com/ChuMangkorn' },
  { icon: Link, label: 'LinkedIn', value: 'chulaprungrueang-mangkorn', href: 'https://www.linkedin.com/in/chulaprungrueang-mangkorn' },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-32 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
            LET&apos;S<br />CONNECT
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg text-muted-foreground max-w-lg mb-16 leading-relaxed"
        >
          Open to new opportunities, collaborations, and interesting projects. Reach out through any of the channels below.
        </motion.p>

        <div className="space-y-px bg-border border border-border">
          {links.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-center justify-between bg-background px-6 md:px-8 py-6 hover:bg-muted transition-colors duration-200"
            >
              <div className="flex items-center gap-5">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
