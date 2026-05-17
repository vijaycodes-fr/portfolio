'use client';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export default function Footer() {
  return (
    <footer style={{ padding: '2.5rem 1.5rem', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <span className="gradient-text" style={{ fontWeight: 900, fontSize: '1.1rem' }}>Shakti Vijay A S</span>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', textAlign: 'center' }}>Built with Next.js · Three.js · Tailwind · Framer Motion</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://github.com/notshakti" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='#00d4ff')} onMouseLeave={e => (e.currentTarget.style.color='#94a3b8')}><GithubIcon size={18} /></a>
          <a href="https://linkedin.com/in/ShakthiVijay" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='#00d4ff')} onMouseLeave={e => (e.currentTarget.style.color='#94a3b8')}><LinkedinIcon size={18} /></a>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem' }}>© 2025 · Made in Chennai</p>
    </footer>
  );
}
