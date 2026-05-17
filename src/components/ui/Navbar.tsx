'use client';
import { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-1 left-0 right-0 z-40 px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-xl font-black bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SV
        </span>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="text-[#94a3b8] hover:text-white text-sm transition-colors">
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/notshakti" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#00d4ff] transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href="https://linkedin.com/in/ShakthiVijay" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#00d4ff] transition-colors">
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}
