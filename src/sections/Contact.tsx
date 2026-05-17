'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import toast from 'react-hot-toast';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const copyEmail = () => {
    navigator.clipboard.writeText('vijayrox1955@gmail.com');
    toast('Copied! 📋', { style: { background: '#111118', color: '#fff', border: '1px solid rgba(0,212,255,0.3)' } });
  };

  return (
    <section id="contact" ref={ref} style={{ padding: '8rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>
            Let&apos;s Build <span className="gradient-text">Something.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Open to full-time roles, internships, and exciting projects.</p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', border: '1px solid rgba(74,222,128,0.4)', background: 'rgba(74,222,128,0.1)', marginBottom: '2.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 500 }}>Currently Available</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={copyEmail}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 24px', borderRadius: '16px', border: '1px solid rgba(0,212,255,0.35)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
              ✉ vijayrox1955@gmail.com <span style={{ opacity: 0.6, fontSize: '12px' }}>⧉</span>
            </motion.button>

            <motion.a href="https://github.com/notshakti" target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.15)', background: '#111118', color: '#fff', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
              <GithubIcon size={20} /> GitHub
            </motion.a>

            <motion.a href="https://linkedin.com/in/ShakthiVijay" target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 24px', borderRadius: '16px', border: '1px solid rgba(10,102,194,0.4)', background: 'rgba(10,102,194,0.1)', color: '#0a66c2', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
              <LinkedinIcon size={20} /> LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
