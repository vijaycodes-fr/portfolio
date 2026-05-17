'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

const projects = [
  {
    name: 'CloudBot AI',
    ai: true,
    description: 'Multi-tenant LLM + RAG chatbot across WhatsApp, Slack, and Web. Hybrid inference with Groq + vector databases.',
    tags: ['LLM', 'RAG', 'Groq', 'Node.js', 'MongoDB', 'WhatsApp API'],
    github: 'https://github.com/notshakti',
    demo: null,
  },
  {
    name: 'AI Cinematic Studio',
    ai: true,
    description: '"Figma for Video" — Scene Graph workflows for cinematic AI video. Multi-model orchestration with character consistency.',
    tags: ['Python', 'Scene Graphs', 'Video Gen', 'FastAPI', 'AI'],
    github: 'https://github.com/notshakti',
    demo: null,
  },
  {
    name: 'LeetCode Analytics Dashboard',
    ai: false,
    description: 'Automated profile syncing, CRON pipelines, JWT auth, and RBAC for competitive programmer analytics.',
    tags: ['Next.js', 'PostgreSQL', 'JWT', 'CRON', 'RBAC', 'TypeScript'],
    github: 'https://github.com/notshakti',
    demo: null,
  },
  {
    name: 'AuthentiQ',
    ai: false,
    description: 'SHA-256 certificate verification system with MongoDB indexing and drag-and-drop UI.',
    tags: ['SHA-256', 'MongoDB', 'Security', 'React', 'Node.js'],
    github: 'https://github.com/notshakti',
    demo: null,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" ref={ref} className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black text-white mb-4">Things I&apos;ve <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">Built</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] hover:border-[#00d4ff]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,212,255,0.1)] overflow-hidden"
            >
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />

              {/* Hover bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#00d4ff]/5 to-[#7c3aed]/5 rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  {p.ai && (
                    <span className="px-2 py-0.5 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/40 text-[#7c3aed] text-xs font-bold">AI</span>
                  )}
                </div>

                <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#94a3b8] text-xs">{t}</span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
