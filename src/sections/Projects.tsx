'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GithubIcon } from '@/components/ui/Icons';

const projects = [
  {
    name: 'CloudBot AI',
    ai: true,
    emoji: '🤖',
    description: 'Multi-tenant LLM + RAG chatbot across WhatsApp, Slack, and Web. Hybrid inference with Groq + vector databases.',
    tags: ['LLM','RAG','Groq','Node.js','MongoDB','WhatsApp API'],
    github: 'https://github.com/vijaycodes-fr',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))',
    border: 'rgba(0,212,255,0.3)',
  },
  {
    name: 'AI Cinematic Studio',
    ai: true,
    emoji: '🎬',
    description: '"Figma for Video" — Scene Graph workflows for cinematic AI video. Multi-model orchestration with character consistency.',
    tags: ['Python','Scene Graphs','Video Gen','FastAPI','AI'],
    github: 'https://github.com/vijaycodes-fr',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(239,68,68,0.05))',
    border: 'rgba(124,58,237,0.3)',
  },
  {
    name: 'LeetCode Analytics Dashboard',
    ai: false,
    emoji: '📊',
    description: 'Automated profile syncing, CRON pipelines, JWT auth, and RBAC for competitive programmer analytics.',
    tags: ['Next.js','PostgreSQL','JWT','CRON','RBAC','TypeScript'],
    github: 'https://github.com/vijaycodes-fr',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(0,212,255,0.05))',
    border: 'rgba(59,130,246,0.3)',
  },
  {
    name: 'AuthentiQ',
    ai: false,
    emoji: '🔐',
    description: 'SHA-256 certificate verification system with MongoDB indexing and drag-and-drop UI.',
    tags: ['SHA-256','MongoDB','Security','React','Node.js'],
    github: 'https://github.com/vijaycodes-fr',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(239,68,68,0.06))',
    border: 'rgba(245,158,11,0.3)',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
          <p style={{ color: '#00d4ff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>— Portfolio</p>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right,#00d4ff,#7c3aed)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              style={{ position: 'relative', padding: '2rem', borderRadius: '20px', background: '#0e0e16', border: `1px solid ${p.border}`, overflow: 'hidden', transition: 'box-shadow 0.3s', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${p.border.replace('0.3', '0.15')}`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              {/* Top gradient line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, ${p.border.replace('0.3','0.8')}, transparent)` }} />
              {/* Bg glow */}
              <div style={{ position: 'absolute', inset: 0, background: p.gradient, pointerEvents: 'none' }} />

              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '2rem' }}>{p.emoji}</div>
                    <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.3 }}>{p.name}</h3>
                  </div>
                  {p.ai && <span style={{ padding: '3px 10px', borderRadius: '9999px', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.5)', color: '#a78bfa', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, marginLeft: '8px' }}>AI</span>}
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{p.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding: '3px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.7rem' }}>{t}</span>
                  ))}
                </div>

                <a href={p.github} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#00d4ff'; el.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#94a3b8'; el.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <GithubIcon size={14} /> GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
