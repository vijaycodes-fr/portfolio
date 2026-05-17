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
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setVisible(false), 300);
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-7xl font-black mb-8 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent"
          >
            SV
          </motion.div>
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[#94a3b8] text-sm tracking-widest uppercase">
            Loading experience...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
