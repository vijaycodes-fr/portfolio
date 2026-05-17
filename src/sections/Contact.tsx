'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import toast from 'react-hot-toast';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const copyEmail = () => {
    navigator.clipboard.writeText('vijayrox1955@gmail.com');
    toast('Copied! 📋', {
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(0,212,255,0.3)' },
    });
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Let&apos;s Build <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">Something.</span>
          </h2>

          <p className="text-[#94a3b8] text-lg">Open to full-time roles, internships, and exciting projects.</p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Currently Available</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={copyEmail}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff] font-medium hover:bg-[#00d4ff]/20 transition-colors"
            >
              <Mail size={20} />
              vijayrox1955@gmail.com
              <Copy size={14} className="opacity-60" />
            </motion.button>

            <motion.a
              href="https://github.com/notshakti"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
            >
              <GithubIcon size={20} /> GitHub
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/ShakthiVijay"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#0077b5]/30 bg-[#0077b5]/10 text-[#0077b5] font-medium hover:bg-[#0077b5]/20 transition-colors"
            >
              <LinkedinIcon size={20} /> LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
