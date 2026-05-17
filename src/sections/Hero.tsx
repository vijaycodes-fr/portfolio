'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import dynamic from 'next/dynamic';

const Scene = dynamic<{ scrollRef: React.MutableRefObject<number> }>(() => import('@/components/3d/Scene'), { ssr: false });

const titles = ['Full Stack Developer', 'AI Engineer', 'LLM Builder', 'Oracle Cloud Intern'];
const skills = ['JavaScript','TypeScript','Python','React','Next.js','Node.js','Three.js','LLM Integration','RAG','Oracle OCI','Docker','PostgreSQL','FastAPI','MongoDB','Prompt Engineering','Gemini','GPT-4'];
const stats = [{ label: 'Projects Built', value: '4+' },{ label: 'Internships', value: '2' },{ label: 'Hackathon Awards', value: '2' },{ label: 'B.E CSE', value: '2024–28' }];

// Text phases only — updates React state at threshold crossings, not on every pixel
type Phase = 'intro' | 'stats' | 'skills' | 'end';
function getPhase(p: number): Phase {
  if (p < 0.2) return 'intro';
  if (p < 0.5) return 'stats';
  if (p < 0.8) return 'skills';
  return 'end';
}

function TypingAnimation() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const current = titles[index];
    if (!deleting && displayed.length < current.length) {
      timerRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timerRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % titles.length);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [displayed, deleting, index]);
  return <span style={{ color: '#00d4ff' }}>{displayed}<span style={{ animation: 'blink 1s step-end infinite' }}>|</span></span>;
}

export default function Hero() {
  // scrollRef: mutated on every scroll, read by Three.js — no React re-renders
  const scrollRef = useRef(0);
  // phase state: only changes 4 times in the entire 400vh — minimal re-renders
  const [phase, setPhase] = useState<Phase>('intro');
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [scrollLabel, setScrollLabel] = useState('● Sphere');

  const updatePhase = useCallback((p: number) => {
    const newPhase = getPhase(p);
    setPhase(prev => prev !== newPhase ? newPhase : prev);
    setShowScrollHint(p < 0.05);

    const label = p < 0.15 ? '● Sphere' : p < 0.3 ? '◎ Exploding' : p < 0.5 ? '⟨⟩ DNA Helix' : p < 0.7 ? '⊕ Torus Knot' : p < 0.85 ? 'AI Letters' : '◉ Vortex';
    setScrollLabel(label);
  }, []);

  useEffect(() => {
    const heroScrollHeight = window.innerHeight * 3; // 400vh - 100vh

    let rafId = 0;
    const onScroll = () => {
      const p = Math.max(0, Math.min(1, window.scrollY / heroScrollHeight));
      scrollRef.current = p;
      // Throttle React state updates via rAF
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updatePhase(p));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updatePhase]);

  return (
    <section style={{ position: 'relative', height: '400vh' }}>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.7;transform:scale(1.4)} }
      `}</style>

      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>

        {/* 3D Canvas — receives scrollRef, never re-mounts */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Scene scrollRef={scrollRef} />
        </div>

        {/* Left text overlay */}
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', padding: '0 48px' }}>
          <div style={{ maxWidth: '520px' }}>
            <AnimatePresence mode="wait">
              {phase === 'intro' && (
                <motion.div key="intro" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', border: '1px solid rgba(74,222,128,0.4)', background: 'rgba(74,222,128,0.1)', marginBottom: '24px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                    <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 500 }}>Available for Opportunities</span>
                  </div>
                  <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: '16px', letterSpacing: '-1px' }}>
                    Shakti Vijay A S
                  </h1>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, height: '2.5rem', marginBottom: '20px' }}>
                    <TypingAnimation />
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px', maxWidth: '440px' }}>
                    I build AI-powered products and full-stack systems that ship. From LLM pipelines to cloud integrations — complex ideas, clean code.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                    <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '9999px', background: '#00d4ff', color: '#0a0a0a', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                      View My Work →
                    </button>
                    <a href="/resume.pdf" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '9999px', border: '1px solid rgba(0,212,255,0.5)', color: '#00d4ff', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                      ↓ Resume
                    </a>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="https://github.com/notshakti" target="_blank" rel="noreferrer" style={{ color: '#94a3b8' }} onMouseEnter={e => (e.currentTarget.style.color='#00d4ff')} onMouseLeave={e => (e.currentTarget.style.color='#94a3b8')}><GithubIcon size={22} /></a>
                    <a href="https://linkedin.com/in/ShakthiVijay" target="_blank" rel="noreferrer" style={{ color: '#94a3b8' }} onMouseEnter={e => (e.currentTarget.style.color='#00d4ff')} onMouseLeave={e => (e.currentTarget.style.color='#94a3b8')}><LinkedinIcon size={22} /></a>
                  </div>
                </motion.div>
              )}

              {phase === 'stats' && (
                <motion.div key="stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '24px' }}>By the Numbers</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {stats.map(s => (
                      <div key={s.label} style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)', background: '#111118' }}>
                        <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '4px' }}>{s.value}</div>
                        <div style={{ color: '#94a3b8', fontSize: '13px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '20px' }}>My Arsenal</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.map((s, i) => (
                      <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                        style={{ padding: '5px 14px', borderRadius: '9999px', border: '1px solid rgba(0,212,255,0.35)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff', fontSize: '13px' }}>
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === 'end' && (
                <motion.div key="end" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <p style={{ fontSize: '1.5rem', color: '#94a3b8' }}>Scroll down to explore my work ↓</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll phase badge */}
        <div style={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 10, padding: '6px 14px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(10,10,10,0.7)', color: '#94a3b8', fontSize: '12px', backdropFilter: 'blur(8px)' }}>
          {scrollLabel}
        </div>

        {/* Scroll hint */}
        {showScrollHint && (
          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, #00d4ff, transparent)' }} />
          </div>
        )}
      </div>

      {/* Marquee bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="animate-marquee" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ fontSize: '3.5rem', fontWeight: 900, marginRight: '4rem', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}>
              SHAKTI VIJAY
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
