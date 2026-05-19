'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const achievements = [
  {
    icon: '🎬',
    rank: 'Meta × Scalar Hackathon',
    event: 'Selected & Featured',
    org: 'Bengaluru',
    desc: 'Selected for the prestigious Meta × Scalar Hackathon held in Bengaluru. Featured as the first team in the official showcase video released by the organisers.',
    color: '#00d4ff',
  },
  {
    icon: '🏆',
    rank: 'Top 20 All India',
    event: 'THREX Hackathon',
    org: 'SRM Institute of Science and Technology',
    desc: 'Competing against nationwide teams across India.',
    color: '#f59e0b',
  },
  {
    icon: '🥇',
    rank: 'Top 15 All India',
    event: "India's First VIBETHON",
    org: 'Polaris School of Technology, Bengaluru',
    desc: 'Selected from 1,000+ participants nationwide.',
    color: '#f59e0b',
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="achievements" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, marginBottom: '0.5rem' }}>
            <span style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Wins</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right,#f59e0b,#ef4444)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {achievements.map((a, i) => (
            <motion.div
              key={a.event}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              style={{ position: 'relative', padding: '2rem', borderRadius: '20px', background: '#0e0e16', border: `1px solid ${a.color}33`, overflow: 'hidden', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = `0 20px 60px ${a.color}20`; el.style.borderColor = `${a.color}66`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.borderColor = `${a.color}33`; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right,${a.color},transparent)` }} />
              <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: `radial-gradient(circle at top right, ${a.color}10, transparent 70%)`, pointerEvents: 'none' }} />

              <motion.div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }} whileHover={{ rotate: [0,-12,12,-6,6,0], transition: { duration: 0.5 } }}>
                {a.icon}
              </motion.div>

              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>{a.rank}</div>
              <div style={{ color: a.color, fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{a.event}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '12px' }}>{a.org}</div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6 }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
