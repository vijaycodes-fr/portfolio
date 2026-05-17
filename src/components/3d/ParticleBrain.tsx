'use client';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  getSpherePositions,
  getHelixPositions,
  getTorusKnotPositions,
  getLetterPositions,
  getExplodePositions,
  getVortexPositions,
} from '@/lib/particlePositions';
import { SCROLL_PHASES } from '@/lib/constants';

interface Props {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  isMobile: boolean;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerpColor(c1: THREE.Color, c2: THREE.Color, t: number): THREE.Color {
  return new THREE.Color().lerpColors(c1, c2, Math.max(0, Math.min(1, t)));
}

export default function ParticleBrain({ scrollProgress, mouseX, mouseY, isMobile }: Props) {
  const count = isMobile ? 800 : 2000;
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const cyan = useMemo(() => new THREE.Color('#00d4ff'), []);
  const purple = useMemo(() => new THREE.Color('#7c3aed'), []);

  const targets = useMemo(() => ({
    sphere: getSpherePositions(count),
    explode: getExplodePositions(count),
    helix: getHelixPositions(count),
    torus: getTorusKnotPositions(count),
    letters: getLetterPositions(count),
    vortex: getVortexPositions(count),
  }), [count]);

  const currentPositions = useRef(new Float32Array(targets.sphere));

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(targets.sphere), 3));
    return geo;
  }, [targets.sphere]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxLines = Math.min(count * 2, 4000);
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    return geo;
  }, [count]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.02,
    color: '#00d4ff',
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: '#00d4ff',
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      lineGeometry.dispose();
      material.dispose();
      lineMaterial.dispose();
    };
  }, [geometry, lineGeometry, material, lineMaterial]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !groupRef.current) return;

    const sp = scrollProgress;
    let fromPos: Float32Array;
    let toPos: Float32Array;
    let localT: number;

    if (sp < SCROLL_PHASES.EXPLODE) {
      fromPos = targets.sphere;
      toPos = targets.sphere;
      localT = 0;
    } else if (sp < SCROLL_PHASES.HELIX) {
      fromPos = targets.sphere;
      toPos = targets.explode;
      localT = easeInOut((sp - SCROLL_PHASES.EXPLODE) / (SCROLL_PHASES.HELIX - SCROLL_PHASES.EXPLODE));
    } else if (sp < SCROLL_PHASES.TORUS) {
      fromPos = targets.explode;
      toPos = targets.helix;
      localT = easeInOut((sp - SCROLL_PHASES.HELIX) / (SCROLL_PHASES.TORUS - SCROLL_PHASES.HELIX));
    } else if (sp < SCROLL_PHASES.LETTERS) {
      fromPos = targets.helix;
      toPos = targets.torus;
      localT = easeInOut((sp - SCROLL_PHASES.TORUS) / (SCROLL_PHASES.LETTERS - SCROLL_PHASES.TORUS));
    } else if (sp < SCROLL_PHASES.VORTEX) {
      fromPos = targets.torus;
      toPos = targets.letters;
      localT = easeInOut((sp - SCROLL_PHASES.LETTERS) / (SCROLL_PHASES.VORTEX - SCROLL_PHASES.LETTERS));
    } else {
      fromPos = targets.letters;
      toPos = targets.vortex;
      localT = easeInOut((sp - SCROLL_PHASES.VORTEX) / (1 - SCROLL_PHASES.VORTEX));
    }

    const lerpSpeed = Math.min(delta * 8, 1);
    const pos = currentPositions.current;
    for (let i = 0; i < count * 3; i++) {
      const target = fromPos[i] + (toPos[i] - fromPos[i]) * localT;
      pos[i] += (target - pos[i]) * lerpSpeed;
    }

    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    posAttr.set(pos);
    posAttr.needsUpdate = true;

    // Color shift
    let colorT = 0;
    if (sp > 0.3 && sp < 0.7) {
      colorT = (sp - 0.3) / 0.4;
    } else if (sp >= 0.7) {
      colorT = 1 - (sp - 0.7) / 0.3;
    }
    const color = lerpColor(cyan, purple, colorT);
    material.color = color;
    lineMaterial.color = color;

    // Update line connections (every other frame for perf)
    const linePos = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
    const lineArr = linePos.array as Float32Array;
    let lineIdx = 0;
    const maxLines = Math.floor(lineArr.length / 6);
    const step = isMobile ? 4 : 2;
    const distSq = 0.64; // 0.8^2

    for (let i = 0; i < count && lineIdx < maxLines; i += step) {
      for (let j = i + 1; j < count && lineIdx < maxLines; j += step) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < distSq) {
          lineArr[lineIdx * 6] = pos[i * 3];
          lineArr[lineIdx * 6 + 1] = pos[i * 3 + 1];
          lineArr[lineIdx * 6 + 2] = pos[i * 3 + 2];
          lineArr[lineIdx * 6 + 3] = pos[j * 3];
          lineArr[lineIdx * 6 + 4] = pos[j * 3 + 1];
          lineArr[lineIdx * 6 + 5] = pos[j * 3 + 2];
          lineIdx++;
        }
      }
    }
    linePos.needsUpdate = true;

    // Slow Y rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      if (!isMobile) {
        groupRef.current.position.x += (mouseX * 0.3 - groupRef.current.position.x) * 0.05;
        groupRef.current.position.y += (mouseY * 0.3 - groupRef.current.position.y) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry} material={material} />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
}
