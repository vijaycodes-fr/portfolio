'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    title: 'Programming & Dev',
    color: '#00d4ff',
    skills: ['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'Express', 'Flask', 'FastAPI', 'REST APIs', 'Microservices'],
  },
  {
    title: 'Cloud & Security',
    color: '#3b82f6',
    skills: ['Oracle OIC', 'OCI', 'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'CRON', 'JWT', 'RBAC', 'SHA-256'],
  },
  {
    title: 'AI & Machine Learning',
    color: '#7c3aed',
    skills: ['LLM Integration', 'RAG', 'Prompt Engineering', 'Gemini', 'GPT-4', 'Data Science', 'ML', 'Deep Learning', 'NLP'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" ref={ref} className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black text-white mb-4">My <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">Arsenal</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="p-6 rounded-2xl border bg-[rgba(255,255,255,0.03)] relative overflow-hidden group"
              style={{ borderColor: `${cat.color}33` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ boxShadow: `inset 0 0 40px ${cat.color}15` }} />
              <h3 className="text-lg font-bold mb-4" style={{ color: cat.color }}>{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-default"
                    style={{
                      borderColor: `${cat.color}33`,
                      color: '#94a3b8',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = cat.color;
                      (e.target as HTMLElement).style.borderColor = cat.color;
                      (e.target as HTMLElement).style.backgroundColor = `${cat.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = '#94a3b8';
                      (e.target as HTMLElement).style.borderColor = `${cat.color}33`;
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
