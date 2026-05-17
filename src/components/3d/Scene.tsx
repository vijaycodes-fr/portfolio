'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import ParticleBrain from './ParticleBrain';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Props {
  scrollProgress: number;
}

function BloomWrapper({ children }: { children: React.ReactNode }) {
  const [BloomComponents, setBloomComponents] = useState<{
    EffectComposer: React.ComponentType<{ children: React.ReactNode }>;
    Bloom: React.ComponentType<{ luminanceThreshold: number; luminanceSmoothing: number; intensity: number }>;
  } | null>(null);

  useEffect(() => {
    import('@react-three/postprocessing').then((mod) => {
      setBloomComponents({
        EffectComposer: mod.EffectComposer as React.ComponentType<{ children: React.ReactNode }>,
        Bloom: mod.Bloom as React.ComponentType<{ luminanceThreshold: number; luminanceSmoothing: number; intensity: number }>,
      });
    }).catch(() => {
      // Safari fallback - bloom not supported
    });
  }, []);

  if (!BloomComponents) return <>{children}</>;
  const { EffectComposer, Bloom } = BloomComponents;
  return (
    <>
      {children}
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.4} intensity={1.5} />
      </EffectComposer>
    </>
  );
}

export default function Scene({ scrollProgress }: Props) {
  const mouse = useMousePosition();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      gl={{ alpha: true, antialias: !isMobile }}
      style={{ background: 'transparent' }}
      dpr={[1, isMobile ? 1 : 2]}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[-3, 0, 2]} intensity={2} color="#00d4ff" />
      <pointLight position={[3, 0, 2]} intensity={2} color="#7c3aed" />
      <Suspense fallback={null}>
        {isMobile ? (
          <ParticleBrain
            scrollProgress={scrollProgress}
            mouseX={0}
            mouseY={0}
            isMobile={true}
          />
        ) : (
          <BloomWrapper>
            <ParticleBrain
              scrollProgress={scrollProgress}
              mouseX={mouse.x}
              mouseY={mouse.y}
              isMobile={false}
            />
          </BloomWrapper>
        )}
      </Suspense>
    </Canvas>
  );
}
