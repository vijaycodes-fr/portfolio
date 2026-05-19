'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    title: 'Programming & Dev',
    color: '#00d4ff',
    bg: '#0d1a20',
    icon: '⚡',
    skills: ['JavaScript','TypeScript','Python','React','Next.js','Node.js','Express','Flask','FastAPI','REST APIs','Microservices'],
  },
  {
    title: 'Cloud & Security',
    color: '#3b82f6',
    bg: '#0d1220',
    icon: '☁️',
    skills: ['Oracle OIC','OCI','MySQL','PostgreSQL','MongoDB','Docker','CRON','JWT','RBAC','SHA-256'],
  },
  {
    title: 'AI & Machine Learning',
    color: '#7c3aed',
    bg: '#110d1e',
    icon: '🧠',
    skills: ['LLM Integration','RAG','Prompt Engineering','Gemini','GPT-4','Data Science','ML','Deep Learning','NLP'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
          <p style={{ color: '#00d4ff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>— Tech Stack</p>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right,#00d4ff,#7c3aed)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {categories.map((cat, ci) => (
            <motion.div key={cat.title}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: ci * 0.12 }}
              style={{ padding: '2rem', borderRadius: '20px', background: cat.bg, border: `1px solid ${cat.color}33`, position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${cat.color}66`; el.style.boxShadow = `0 8px 40px ${cat.color}15`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${cat.color}33`; el.style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: `radial-gradient(circle at top right, ${cat.color}08, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, ${cat.color}, transparent)` }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${cat.color}18`, border: `1px solid ${cat.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{cat.icon}</div>
                <h3 style={{ color: cat.color, fontWeight: 700, fontSize: '1rem' }}>{cat.title}</h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill) => (
                  <span key={skill}
                    style={{ padding: '5px 13px', borderRadius: '9999px', border: `1px solid ${cat.color}33`, color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500, cursor: 'default', transition: 'all 0.2s' }}
                    onMouseEnter={e => { const el = e.target as HTMLElement; el.style.color = cat.color; el.style.borderColor = cat.color; el.style.background = `${cat.color}15`; }}
                    onMouseLeave={e => { const el = e.target as HTMLElement; el.style.color = '#94a3b8'; el.style.borderColor = `${cat.color}33`; el.style.background = 'transparent'; }}
                  >{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
