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

  return (
    <nav style={{
      position: 'fixed', top: '4px', left: 0, right: 0, zIndex: 40,
      padding: '12px 24px',
      background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 900, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>SV</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {links.map(l => (
            <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >{l}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="https://github.com/vijaycodes-fr" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='#00d4ff')} onMouseLeave={e => (e.currentTarget.style.color='#94a3b8')}><GithubIcon size={18} /></a>
          <a href="https://www.linkedin.com/in/shaktidev/" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='#00d4ff')} onMouseLeave={e => (e.currentTarget.style.color='#94a3b8')}><LinkedinIcon size={18} /></a>
        </div>
      </div>
    </nav>
  );
}
