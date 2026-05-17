'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import dynamic from 'next/dynamic';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const Scene = dynamic<{ scrollProgress: number }>(() => import('@/components/3d/Scene'), { ssr: false });

const titles = ['Full Stack Developer', 'AI Engineer', 'LLM Builder', 'Oracle Cloud Intern'];

const skills = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Node.js',
  'Three.js', 'LLM Integration', 'RAG', 'Oracle OCI', 'Docker', 'PostgreSQL',
  'FastAPI', 'MongoDB', 'Prompt Engineering', 'Gemini', 'GPT-4',
];

const stats = [
  { label: 'Projects Built', value: '4' },
  { label: 'Internships', value: '2' },
  { label: 'Hackathon Awards', value: '2' },
  { label: 'B.E CSE', value: '2024–2028' },
];

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

  return (
    <span className="text-[#00d4ff]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const scrollProgress = useScrollProgress();

  const showIntro = scrollProgress < 0.2;
  const showStats = scrollProgress >= 0.2 && scrollProgress < 0.5;
  const showSkills = scrollProgress >= 0.5 && scrollProgress < 0.8;
  const showEnd = scrollProgress >= 0.8;

  const scrollLabel = (() => {
    if (scrollProgress < 0.15) return '● Sphere';
    if (scrollProgress < 0.3) return '◎ Exploding';
    if (scrollProgress < 0.5) return '⟨⟩ DNA Helix';
    if (scrollProgress < 0.7) return '⊕ Torus Knot';
    if (scrollProgress < 0.85) return 'AI Letters';
    return '◉ Vortex';
  })();

  return (
    <section className="relative" style={{ height: '400vh' }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Scene scrollProgress={scrollProgress} />
        </div>

        {/* Left text overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {showIntro && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 w-fit">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-sm font-medium">Available for Opportunities</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight">
                      Shakti Vijay A S
                    </h1>

                    <div className="text-2xl md:text-3xl font-bold h-10">
                      <TypingAnimation />
                    </div>

                    <p className="text-[#94a3b8] text-lg max-w-md leading-relaxed">
                      I build AI-powered products and full-stack systems that ship.
                      From LLM pipelines to cloud integrations — complex ideas, clean code.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-[#0a0a0a] font-bold hover:bg-[#00d4ff]/90 transition-all hover:scale-105"
                      >
                        View My Work <ArrowRight size={16} />
                      </button>
                      <a
                        href="/resume.pdf"
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#00d4ff]/50 text-[#00d4ff] font-bold hover:bg-[#00d4ff]/10 transition-all"
                      >
                        <Download size={16} /> Resume
                      </a>
                    </div>

                    <div className="flex gap-4">
                      <a href="https://github.com/notshakti" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#00d4ff] transition-colors">
                        <GithubIcon size={22} />
                      </a>
                      <a href="https://linkedin.com/in/ShakthiVijay" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#00d4ff] transition-colors">
                        <LinkedinIcon size={22} />
                      </a>
                    </div>
                  </motion.div>
                )}

                {showStats && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-black text-white">By the Numbers</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {stats.map((s) => (
                        <div key={s.label} className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                          <div className="text-3xl font-black bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
                            {s.value}
                          </div>
                          <div className="text-[#94a3b8] text-sm mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {showSkills && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl font-black text-white">My Arsenal</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="px-3 py-1 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff] text-sm"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {showEnd && (
                  <motion.div
                    key="end"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-2xl text-[#94a3b8]">Scroll down to explore my work ↓</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scroll phase indicator */}
        <div className="absolute bottom-6 right-6 z-10 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-[#94a3b8]">
          {scrollLabel}
        </div>

        {/* Scroll hint */}
        {scrollProgress < 0.05 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="text-[#94a3b8] text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#00d4ff] to-transparent animate-pulse" />
          </motion.div>
        )}
      </div>

      {/* Marquee at bottom of hero area */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-center overflow-hidden bg-[#0a0a0a] border-t border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-6xl font-black text-transparent mr-16" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
              SHAKTI VIJAY &nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
