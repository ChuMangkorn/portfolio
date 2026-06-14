'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Code } from 'lucide-react';

const projects = [
  {
    num: '01',
    title: 'E-commerce Platform',
    description: 'Research project submission system with real-time chat via Socket.IO and Line Notify. Built with Next.js frontend and NestJS backend.',
    tags: ['Next.js', 'NestJS', 'Tailwind CSS', 'Socket.IO'],
    liveUrl: null,
    repoUrl: null,
  },
  {
    num: '02',
    title: 'Pokemon Search App',
    description: 'Frontend app with REST API integration. Search Pokemon and view details with a clean, responsive interface.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    liveUrl: 'https://nextjs-tailwindcss-eight.vercel.app',
    repoUrl: 'https://github.com/ChuMangkorn/nextjs-tailwindcss',
  },
  {
    num: '03',
    title: 'Personal Portfolio',
    description: 'This website — built with Next.js 16 App Router, Framer Motion animations, and shadcn/ui components.',
    tags: ['Next.js 16', 'Framer Motion', 'shadcn/ui', 'TypeScript'],
    liveUrl: 'https://portfolio-omega-livid-27.vercel.app',
    repoUrl: 'https://github.com/ChuMangkorn/portfolio',
  },
  {
    num: '04',
    title: 'Ichiban Japan Agency',
    description: 'Informational site for Japanese language studies and study abroad programs. Developed using WordPress, PHP, MySQL.',
    tags: ['WordPress', 'PHP', 'MySQL', 'jQuery'],
    liveUrl: null,
    repoUrl: null,
  },
  {
    num: '05',
    title: 'Insurance Policy System',
    description: 'Integrated system for managing insurance operations — policy tracking, claims management, and reporting.',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
    liveUrl: null,
    repoUrl: null,
  },
  {
    num: '06',
    title: 'Tour Agency System',
    description: 'Web application for K.Star Travel — customer booking, admin panel, and itinerary management.',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
    liveUrl: null,
    repoUrl: null,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border border-border p-6 md:p-8 hover:border-foreground/30 transition-colors duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs tracking-[0.2em] text-muted-foreground font-mono">{project.num}</span>
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Code className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="outline"
            className="text-[10px] tracking-[0.1em] uppercase border-border text-muted-foreground">
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="px-6 md:px-12 py-32 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-16 pb-6 border-b border-border"
      >
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Selected Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-foreground">
            PROJECTS
          </h2>
        </div>
        <span className="text-xs text-muted-foreground font-mono hidden md:block">
          {String(projects.length).padStart(2, '0')} total
        </span>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {projects.map((project, i) => (
          <div key={project.num} className="bg-background">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
