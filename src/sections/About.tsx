'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target * 10) / 10);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <div ref={ref}>{value % 1 === 0 ? value : value.toFixed(1)}{suffix}</div>;
}

const orbitItems = [
  { label: 'React', cls: 'orbit-0' },
  { label: 'Python', cls: 'orbit-1' },
  { label: 'Three.js', cls: 'orbit-2' },
  { label: 'AI', cls: 'orbit-3' },
];

const statItems = [
  { label: 'Projects', target: 4, suffix: '+' },
  { label: 'Internships', target: 3, suffix: '' },
  { label: 'Hackathon Wins', target: 3, suffix: '' },
  { label: 'CGPA', target: 7.5, suffix: '' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="about" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blur orbs */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.04), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.04), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
          <p style={{ color: '#00d4ff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>— Who I Am</p>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            About <span className="gradient-text">Me</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right,#00d4ff,#7c3aed)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
          {/* Monogram + orbit */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
            {/* Outer ring */}
            <div style={{ position: 'absolute', width: '240px', height: '240px', borderRadius: '50%', border: '1px dashed rgba(0,212,255,0.15)', animation: 'spin 20s linear infinite' }} />
            <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', border: '1px dashed rgba(124,58,237,0.1)', animation: 'spin 15s linear infinite reverse' }} />

            <div style={{ width: '150px', height: '150px', borderRadius: '24px', background: 'linear-gradient(135deg, #0d1a20, #110d1e)', border: '1px solid rgba(0,212,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(0,212,255,0.12), 0 0 80px rgba(124,58,237,0.06)' }}>
              <span className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900 }}>SVA</span>
            </div>

            {orbitItems.map((item) => (
              <div key={item.label} className={item.cls}
                style={{ position: 'absolute', padding: '5px 14px', borderRadius: '9999px', background: '#0d1a20', border: '1px solid rgba(0,212,255,0.5)', color: '#00d4ff', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap', boxShadow: '0 0 10px rgba(0,212,255,0.2)' }}>
                {item.label}
              </div>
            ))}
            <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
          </motion.div>

          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8 }}>
              I&apos;m a <span style={{ color: '#fff', fontWeight: 600 }}>Full Stack Developer & AI Engineer</span> based in Chennai, India. I specialize in building production-grade AI-powered applications — from LLM pipelines and RAG systems to cloud integrations and scalable APIs.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8 }}>
              I thrive at the intersection of <span style={{ color: '#00d4ff', fontWeight: 600 }}>AI and engineering</span> — turning complex ideas into clean, shippable products.
            </p>

            <div style={{ padding: '1.5rem', borderRadius: '16px', background: '#0e0e16', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d4ff', fontWeight: 700, fontSize: '0.7rem', flexShrink: 0 }}>CIT</div>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, marginBottom: '4px' }}>Chennai Institute of Technology</p>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>B.E Computer Science Engineering</p>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>2024 – 2028 &nbsp;·&nbsp; <span style={{ color: '#00d4ff' }}>CGPA: 7.5</span></p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Chennai, India 📍', 'Open to Work ✅', 'AI + Full Stack 🚀'].map(tag => (
                <span key={tag} style={{ padding: '6px 14px', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.8rem' }}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stat counters */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem' }}>
          {statItems.map((s, i) => (
            <div key={s.label} style={{ padding: '1.75rem', borderRadius: '20px', background: '#0e0e16', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${i % 2 === 0 ? 'rgba(0,212,255,0.04)' : 'rgba(124,58,237,0.04)'}, transparent 70%)`, pointerEvents: 'none' }} />
              <div className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '6px' }}>
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
