'use client';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-black bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent text-lg">
          Shakti Vijay A S
        </span>
        <p className="text-[#94a3b8] text-sm text-center">
          Built with Next.js · Three.js · Tailwind · Framer Motion
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/notshakti" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#00d4ff] transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href="https://linkedin.com/in/ShakthiVijay" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#00d4ff] transition-colors">
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
      <p className="text-center text-[#94a3b8] text-xs mt-4">© 2025 · Made in Chennai</p>
    </footer>
  );
}
