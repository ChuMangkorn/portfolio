'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto w-full">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-muted-foreground" />
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Frontend Developer · Based in Japan
          </span>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
          {/* Name block */}
          <div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display text-[clamp(72px,14vw,180px)] font-black leading-[0.88] tracking-[-0.04em] text-foreground"
              >
                MANG
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="font-display text-[clamp(72px,14vw,180px)] font-black leading-[0.88] tracking-[-0.04em] text-foreground"
              >
                KORN
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              Building high-quality web experiences with React, Next.js, and a passion for UI craft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex items-center gap-6 mt-10"
            >
              <button
                onClick={scrollToWork}
                className="group flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                View Work
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </button>
              <a
                href="https://github.com/ChuMangkorn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub ↗
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 border border-border overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Mangkorn Chulaprungrueang"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
            {/* Decorative corner */}
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b border-r border-muted-foreground/30" />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border"
        >
          {[
            { num: '6+', label: 'Projects Built' },
            { num: 'JLPT N3', label: 'Japanese Level' },
            { num: 'React · Next.js', label: 'Core Stack' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-sm font-semibold text-foreground">{num}</div>
              <div className="text-xs text-muted-foreground mt-0.5 tracking-[0.1em] uppercase">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
