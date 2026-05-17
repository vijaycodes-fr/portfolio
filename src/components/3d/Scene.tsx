'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import ParticleBrain from './ParticleBrain';

interface Props {
  scrollRef: React.MutableRefObject<number>;
}

function BloomWrapper({ children }: { children: React.ReactNode }) {
  const [Bloom, setBloom] = useState<React.ComponentType<{
    luminanceThreshold: number; luminanceSmoothing: number; intensity: number;
  }> | null>(null);
  const [Composer, setComposer] = useState<React.ComponentType<{ children: React.ReactNode }> | null>(null);

  useEffect(() => {
    import('@react-three/postprocessing').then((mod) => {
      setComposer(() => mod.EffectComposer as React.ComponentType<{ children: React.ReactNode }>);
      setBloom(() => mod.Bloom as React.ComponentType<{ luminanceThreshold: number; luminanceSmoothing: number; intensity: number }>);
    }).catch(() => {});
  }, []);

  if (!Bloom || !Composer) return <>{children}</>;
  return (
    <>
      {children}
      <Composer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.5} intensity={1.2} />
      </Composer>
    </>
  );
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
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, isMobile ? 1 : 1.5]}
      frameloop="always"
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[-3, 0, 2]} intensity={2} color="#00d4ff" />
      <pointLight position={[3, 0, 2]} intensity={2} color="#7c3aed" />
      <Suspense fallback={null}>
        {isMobile ? (
          <ParticleBrain scrollRef={scrollRef} mouseRef={mouseRef} isMobile={true} />
        ) : (
          <BloomWrapper>
            <ParticleBrain scrollRef={scrollRef} mouseRef={mouseRef} isMobile={false} />
          </BloomWrapper>
        )}
      </Suspense>
    </Canvas>
  );
}
