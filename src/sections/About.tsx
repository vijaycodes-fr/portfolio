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

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            About <span className="gradient-text">Me</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right, #00d4ff, #7c3aed)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Left — monogram card with orbiting badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '280px' }}
          >
            <div className="card-cyan glow-cyan" style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="gradient-text" style={{ fontSize: '3rem', fontWeight: 900 }}>SVA</span>
            </div>
            {orbitItems.map((item) => (
              <div
                key={item.label}
                className={item.cls}
                style={{
                  position: 'absolute',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: '#0d1a20',
                  border: '1px solid rgba(0,212,255,0.5)',
                  color: '#00d4ff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </div>
            ))}
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.8' }}>
              I&apos;m a Full Stack Developer and AI Engineer based in Chennai, India. I specialize in building production-grade AI-powered applications — from LLM pipelines and RAG systems to cloud integrations and scalable APIs.
            </p>

            <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d4ff', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>CIT</div>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, marginBottom: '4px' }}>Chennai Institute of Technology</p>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>B.E Computer Science Engineering</p>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>2024 – 2028 &nbsp;·&nbsp; CGPA: 7.5</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '4rem' }}
        >
          {[
            { label: 'Projects', target: 4, suffix: '+' },
            { label: 'Internships', target: 2, suffix: '' },
            { label: 'Hackathon Wins', target: 2, suffix: '' },
            { label: 'CGPA', target: 7.5, suffix: '' },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '4px' }}>
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
