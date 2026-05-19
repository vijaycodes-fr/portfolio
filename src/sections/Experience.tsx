'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    company: 'Prodapt',
    role: 'AI Intern',
    duration: '2025',
    color: '#7c3aed',
    icon: '🤖',
    points: [
      'Developed AI-driven automation workflows and intelligent data processing pipelines',
      'Integrated LLM APIs into enterprise systems to streamline operations and reduce manual effort',
      'Built and fine-tuned prompt engineering strategies for domain-specific use cases',
    ],
  },
  {
    company: 'ChainSys India Pvt. Ltd',
    role: 'Oracle Integration Cloud Intern',
    duration: 'May 2025 – Jun 2025',
    color: '#00d4ff',
    icon: '☁️',
    points: [
      'Built REST/SOAP integrations with scheduled jobs and fault handling',
      'Worked on OCI services, data mapping, lookups, and enterprise tracking',
    ],
  },
  {
    company: 'AICTE Virtual Internship',
    role: 'Full Stack Development Intern',
    duration: '2024',
    color: '#3b82f6',
    icon: '💻',
    points: [
      'Hands-on experience with frontend, backend, databases, and REST APIs end-to-end',
      'Built complete web applications using modern development practices',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
            Where I&apos;ve <span className="gradient-text">Worked</span>
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right,#00d4ff,#7c3aed)', borderRadius: '9999px' }} />
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
            style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom,#00d4ff,#7c3aed,#3b82f6)', transformOrigin: 'top' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingLeft: '56px' }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                style={{ position: 'relative' }}
              >
                {/* Glowing dot */}
                <div style={{ position: 'absolute', left: '-48px', top: '22px', width: '14px', height: '14px', borderRadius: '50%', background: exp.color, boxShadow: `0 0 14px ${exp.color}, 0 0 28px ${exp.color}55` }} />

                <div
                  style={{ padding: '1.75rem', borderRadius: '16px', background: '#0e0e16', border: `1px solid ${exp.color}33`, transition: 'border-color 0.3s, box-shadow 0.3s', cursor: 'default' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${exp.color}66`; el.style.boxShadow = `0 8px 40px ${exp.color}15`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${exp.color}33`; el.style.boxShadow = 'none'; }}
                >
                  {/* Top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', borderRadius: '16px 16px 0 0', background: `linear-gradient(to right, ${exp.color}, transparent)` }} />

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${exp.color}20`, border: `1px solid ${exp.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{exp.icon}</div>
                      <div>
                        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '2px' }}>{exp.company}</h3>
                        <p style={{ color: exp.color, fontSize: '0.875rem', fontWeight: 600 }}>{exp.role}</p>
                      </div>
                    </div>
                    <span style={{ padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '0.75rem', flexShrink: 0 }}>{exp.duration}</span>
                  </div>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
                    {exp.points.map((pt) => (
                      <li key={pt} style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'flex', gap: '10px', lineHeight: 1.6 }}>
                        <span style={{ color: exp.color, marginTop: '3px', flexShrink: 0, fontSize: '10px' }}>▶</span>
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
