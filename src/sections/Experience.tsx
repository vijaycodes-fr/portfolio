'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    company: 'ChainSys India Pvt. Ltd',
    role: 'Oracle Integration Cloud Intern',
    duration: 'May 2025 – Jun 2025',
    points: [
      'Built REST/SOAP integrations with scheduled jobs and fault handling',
      'Worked on OCI services, data mapping, lookups, and enterprise tracking',
    ],
  },
  {
    company: 'AICTE Virtual Internship',
    role: 'Full Stack Development Intern',
    duration: '2024',
    points: [
      'Hands-on experience with frontend, backend, databases, and REST APIs end-to-end',
      'Built complete web applications using modern development practices',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="experience" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            Where I&apos;ve <span className="gradient-text">Worked</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right, #00d4ff, #7c3aed)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            style={{
              position: 'absolute',
              left: '16px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #00d4ff, #7c3aed)',
              transformOrigin: 'top',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingLeft: '56px' }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                style={{ position: 'relative' }}
              >
                {/* Glowing dot */}
                <div style={{
                  position: 'absolute',
                  left: '-48px',
                  top: '20px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#00d4ff',
                  boxShadow: '0 0 12px rgba(0,212,255,0.8), 0 0 24px rgba(0,212,255,0.4)',
                }} />

                <div className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '2px' }}>{exp.company}</h3>
                      <p style={{ color: '#00d4ff', fontSize: '0.875rem', fontWeight: 500 }}>{exp.role}</p>
                    </div>
                    <span style={{ padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '0.75rem', flexShrink: 0 }}>{exp.duration}</span>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                    {exp.points.map((pt) => (
                      <li key={pt} style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'flex', gap: '8px' }}>
                        <span style={{ color: '#00d4ff', marginTop: '2px', flexShrink: 0 }}>▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
