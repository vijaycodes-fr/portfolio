'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / 1500) * 100);
      setProgress(p);
      if (p >= 100) { clearInterval(interval); setTimeout(() => setVisible(false), 300); }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
            className="gradient-text" style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '2rem' }}>
            SV
          </motion.div>
          <div style={{ width: '192px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ height: '100%', background: 'linear-gradient(to right,#00d4ff,#7c3aed)', width: `${progress}%`, transition: 'width 0.1s linear', borderRadius: '9999px' }} />
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading experience...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
