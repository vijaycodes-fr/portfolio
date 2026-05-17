'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import ParticleBrain from './ParticleBrain';

interface Props {
  scrollRef: React.MutableRefObject<number>;
}

// Watches scroll changes and asks the renderer to draw a new frame
function ScrollInvalidator({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { invalidate } = useThree();
  const lastRef = useRef(0);

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      if (scrollRef.current !== lastRef.current) {
        lastRef.current = scrollRef.current;
        invalidate();
      }
      // Also keep a slow idle render for the rotation animation
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [scrollRef, invalidate]);

  return null;
}

export default function Scene({ scrollRef }: Props) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
      }}
      style={{ background: 'transparent' }}
      dpr={1}
      frameloop="always"
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[-3, 0, 2]} intensity={2} color="#00d4ff" />
      <pointLight position={[3, 0, 2]} intensity={2} color="#7c3aed" />
      <Suspense fallback={null}>
        <ParticleBrain scrollRef={scrollRef} mouseRef={mouseRef} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
