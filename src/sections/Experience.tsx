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
    <section id="experience" ref={ref} className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black text-white mb-4">Where I&apos;ve <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">Worked</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full mb-16" />
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff] to-[#7c3aed]"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />

          <div className="space-y-12 pl-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[49px] top-2 w-3 h-3 rounded-full bg-[#00d4ff] shadow-[0_0_12px_rgba(0,212,255,0.8)]" />

                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                      <p className="text-[#00d4ff] text-sm font-medium">{exp.role}</p>
                    </div>
                    <span className="text-[#94a3b8] text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 shrink-0">{exp.duration}</span>
                  </div>
                  <ul className="space-y-1 mt-3">
                    {exp.points.map((pt) => (
                      <li key={pt} className="text-[#94a3b8] text-sm flex gap-2">
                        <span className="text-[#00d4ff] mt-1 shrink-0">▸</span>
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
