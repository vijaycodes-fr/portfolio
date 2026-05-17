'use client';
import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const heroHeight = window.innerHeight * 4;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const p = Math.max(0, Math.min(1, scrollY / (heroHeight - window.innerHeight)));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
