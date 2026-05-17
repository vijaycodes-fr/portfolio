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
  },
  {
    name: 'AI Cinematic Studio',
    ai: true,
    description: '"Figma for Video" — Scene Graph workflows for cinematic AI video. Multi-model orchestration with character consistency.',
    tags: ['Python', 'Scene Graphs', 'Video Gen', 'FastAPI', 'AI'],
    github: 'https://github.com/notshakti',
  },
  {
    name: 'LeetCode Analytics Dashboard',
    ai: false,
    description: 'Automated profile syncing, CRON pipelines, JWT auth, and RBAC for competitive programmer analytics.',
    tags: ['Next.js', 'PostgreSQL', 'JWT', 'CRON', 'RBAC', 'TypeScript'],
    github: 'https://github.com/notshakti',
  },
  {
    name: 'AuthentiQ',
    ai: false,
    description: 'SHA-256 certificate verification system with MongoDB indexing and drag-and-drop UI.',
    tags: ['SHA-256', 'MongoDB', 'Security', 'React', 'Node.js'],
    github: 'https://github.com/notshakti',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right, #00d4ff, #7c3aed)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              style={{
                position: 'relative',
                padding: '1.75rem',
                borderRadius: '16px',
                background: '#111118',
                border: '1px solid rgba(255,255,255,0.12)',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(0,212,255,0.4)';
                el.style.boxShadow = '0 20px 60px rgba(0,212,255,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.12)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Top gradient border */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, #00d4ff, #7c3aed)' }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{p.name}</h3>
                {p.ai && (
                  <span style={{ padding: '2px 10px', borderRadius: '9999px', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.5)', color: '#7c3aed', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, marginLeft: '8px' }}>AI</span>
                )}
              </div>

              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>{p.description}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8', fontSize: '0.7rem' }}>{t}</span>
                ))}
              </div>

              <a href={p.github} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#00d4ff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
              >
                <GithubIcon size={14} /> GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
