'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['Work', 'About', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className={`
          flex items-center justify-between py-5 transition-all duration-500
          ${scrolled ? 'border-b border-border/50 backdrop-blur-sm bg-background/80' : ''}
        `}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground hover:opacity-60 transition-opacity"
        >
          MCK
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-foreground transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-px bg-foreground transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-foreground transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="block w-full text-left px-6 py-4 text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-border/50 last:border-0"
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
