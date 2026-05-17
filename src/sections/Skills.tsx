'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    title: 'Programming & Dev',
    cardClass: 'card-cyan',
    glowClass: 'glow-cyan',
    color: '#00d4ff',
    skills: ['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'Express', 'Flask', 'FastAPI', 'REST APIs', 'Microservices'],
  },
  {
    title: 'Cloud & Security',
    cardClass: 'card-blue',
    glowClass: '',
    color: '#3b82f6',
    skills: ['Oracle OIC', 'OCI', 'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'CRON', 'JWT', 'RBAC', 'SHA-256'],
  },
  {
    title: 'AI & Machine Learning',
    cardClass: 'card-purple',
    glowClass: 'glow-purple',
    color: '#7c3aed',
    skills: ['LLM Integration', 'RAG', 'Prompt Engineering', 'Gemini', 'GPT-4', 'Data Science', 'ML', 'Deep Learning', 'NLP'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      {/* Grid bg */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right, #00d4ff, #7c3aed)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className={`${cat.cardClass} ${cat.glowClass}`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              style={{ padding: '1.75rem' }}
            >
              <h3 style={{ color: cat.color, fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>{cat.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      border: `1px solid ${cat.color}44`,
                      color: '#94a3b8',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.target as HTMLElement;
                      el.style.color = cat.color;
                      el.style.borderColor = cat.color;
                      el.style.background = `${cat.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.target as HTMLElement;
                      el.style.color = '#94a3b8';
                      el.style.borderColor = `${cat.color}44`;
                      el.style.background = 'transparent';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
