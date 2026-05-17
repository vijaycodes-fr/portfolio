'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
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

  return <span ref={ref}>{value % 1 === 0 ? value : value.toFixed(1)}{suffix}</span>;
}

const orbitItems = ['React', 'Python', 'Three.js', 'AI'];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black text-white mb-4">About <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">Me</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — monogram card with orbiting badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center h-80"
          >
            <div className="w-48 h-48 rounded-2xl border-2 border-[#00d4ff]/50 bg-[#00d4ff]/5 flex items-center justify-center shadow-[0_0_40px_rgba(0,212,255,0.15)]">
              <span className="text-5xl font-black bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">SVA</span>
            </div>
            {orbitItems.map((item, i) => (
              <div
                key={item}
                className="absolute px-3 py-1 rounded-full bg-[#0a0a0a] border border-[#00d4ff]/40 text-[#00d4ff] text-xs font-medium"
                style={{
                  animation: `orbit${i} ${6 + i}s linear infinite`,
                  animationDelay: `${-i * 1.5}s`,
                }}
              >
                {item}
              </div>
            ))}

            <style jsx>{`
              @keyframes orbit0 {
                from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
                to   { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
              }
              @keyframes orbit1 {
                from { transform: rotate(90deg) translateX(130px) rotate(-90deg); }
                to   { transform: rotate(450deg) translateX(130px) rotate(-450deg); }
              }
              @keyframes orbit2 {
                from { transform: rotate(180deg) translateX(115px) rotate(-180deg); }
                to   { transform: rotate(540deg) translateX(115px) rotate(-540deg); }
              }
              @keyframes orbit3 {
                from { transform: rotate(270deg) translateX(125px) rotate(-270deg); }
                to   { transform: rotate(630deg) translateX(125px) rotate(-630deg); }
              }
              [style*="orbit0"] { animation-name: orbit0; }
              [style*="orbit1"] { animation-name: orbit1; }
              [style*="orbit2"] { animation-name: orbit2; }
              [style*="orbit3"] { animation-name: orbit3; }
            `}</style>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-[#94a3b8] text-lg leading-relaxed">
              I&apos;m a Full Stack Developer and AI Engineer based in Chennai, India. I specialize in building production-grade AI-powered applications — from LLM pipelines and RAG systems to cloud integrations and scalable APIs.
            </p>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] font-bold text-sm shrink-0">CIT</div>
                <div>
                  <p className="text-white font-bold">Chennai Institute of Technology</p>
                  <p className="text-[#94a3b8] text-sm">B.E Computer Science Engineering</p>
                  <p className="text-[#94a3b8] text-sm">2024 – 2028 &nbsp;·&nbsp; CGPA: 7.5</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { label: 'Projects', target: 4, suffix: '+' },
            { label: 'Internships', target: 2, suffix: '' },
            { label: 'Hackathon Wins', target: 2, suffix: '' },
            { label: 'CGPA', target: 7.5, suffix: '' },
          ].map((s) => (
            <div key={s.label} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-[#94a3b8] text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
