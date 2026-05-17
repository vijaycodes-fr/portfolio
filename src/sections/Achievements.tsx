'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const achievements = [
  { icon: '🏆', rank: 'Top 20 All India', event: 'THREX Hackathon', org: 'SRM Institute of Science and Technology', desc: 'Competing against nationwide teams across India.' },
  { icon: '🥇', rank: 'Top 15', event: "India's First VIBETHON", org: 'Polaris School of Technology, Bengaluru', desc: 'Selected from 1,000+ participants nationwide.' },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="achievements" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
            <span style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Wins</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right,#f59e0b,#ef4444)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
          {achievements.map((a, i) => (
            <motion.div
              key={a.event}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              style={{ position: 'relative', padding: '2rem', borderRadius: '16px', background: '#1a1200', border: '1px solid rgba(245,158,11,0.35)', overflow: 'hidden', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(245,158,11,0.15)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right,#f59e0b,#ef4444)' }} />
              <motion.div style={{ fontSize: '3rem', marginBottom: '1rem' }} whileHover={{ rotate: [0,-10,10,-5,5,0], transition: { duration: 0.5 } }}>{a.icon}</motion.div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>{a.rank}</div>
              <div style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '4px' }}>{a.event}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px' }}>{a.org}</div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
