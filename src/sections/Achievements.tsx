'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const achievements = [
  {
    icon: '🏆',
    rank: 'Top 20 All India',
    event: 'THREX Hackathon',
    org: 'SRM Institute of Science and Technology',
    desc: 'Competing against nationwide teams across India.',
  },
  {
    icon: '🥇',
    rank: 'Top 15',
    event: "India's First VIBETHON",
    org: 'Polaris School of Technology, Bengaluru',
    desc: 'Selected from 1,000+ participants nationwide.',
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="achievements" ref={ref} className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black text-white mb-4"><span className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent">Wins</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] rounded-full mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.event}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative p-8 rounded-2xl border border-[#f59e0b]/30 bg-[rgba(245,158,11,0.05)] overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 60px rgba(245,158,11,0.1)' }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#f59e0b] to-[#ef4444]" />

              <motion.div
                className="text-5xl mb-4"
                whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
              >
                {a.icon}
              </motion.div>

              <div className="text-2xl font-black text-white mb-1">{a.rank}</div>
              <div className="text-[#f59e0b] font-bold mb-1">{a.event}</div>
              <div className="text-[#94a3b8] text-sm mb-3">{a.org}</div>
              <p className="text-[#94a3b8] text-sm">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
