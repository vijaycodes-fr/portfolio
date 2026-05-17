'use client';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  getSpherePositions, getHelixPositions, getTorusKnotPositions,
  getLetterPositions, getExplodePositions, getVortexPositions,
} from '@/lib/particlePositions';
import { SCROLL_PHASES } from '@/lib/constants';

interface Props {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const MAX_LINES = 350;
const LINE_STEP_DESKTOP = 15;
const LINE_STEP_MOBILE = 25;
const LINE_FRAME_SKIP = 5;

export default function ParticleBrain({ scrollRef, mouseRef, isMobile }: Props) {
  const count = isMobile ? 500 : 1200;
  const groupRef = useRef<THREE.Group>(null);
  const frameRef = useRef(0);

  const cyan  = useMemo(() => new THREE.Color('#00d4ff'), []);
  const purple = useMemo(() => new THREE.Color('#7c3aed'), []);
  const colorWork = useMemo(() => new THREE.Color(), []);

  const targets = useMemo(() => ({
    sphere:  getSpherePositions(count),
    explode: getExplodePositions(count),
    helix:   getHelixPositions(count),
    torus:   getTorusKnotPositions(count),
    letters: getLetterPositions(count),
    vortex:  getVortexPositions(count),
  }), [count]);

  const currentPositions = useRef(new Float32Array(targets.sphere));

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const buf = new THREE.BufferAttribute(new Float32Array(targets.sphere), 3);
    buf.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('position', buf);
    return geo;
  }, [targets.sphere]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const buf = new THREE.BufferAttribute(new Float32Array(MAX_LINES * 6), 3);
    buf.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('position', buf);
    return geo;
  }, []);

  // Slightly larger particles to compensate for no bloom — still glowing via AdditiveBlending
  const material = useMemo(() => new THREE.PointsMaterial({
    size: isMobile ? 0.03 : 0.025,
    color: '#00d4ff',
    transparent: true,
    opacity: 1,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [isMobile]);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: '#00d4ff',
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useEffect(() => () => {
    geometry.dispose(); lineGeometry.dispose();
    material.dispose(); lineMaterial.dispose();
  }, [geometry, lineGeometry, material, lineMaterial]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05);
    const sp = scrollRef.current;

    // Determine morph targets
    let fromPos: Float32Array, toPos: Float32Array, localT: number;
    if (sp < SCROLL_PHASES.EXPLODE) {
      fromPos = targets.sphere; toPos = targets.sphere; localT = 0;
    } else if (sp < SCROLL_PHASES.HELIX) {
      fromPos = targets.sphere; toPos = targets.explode;
      localT = easeInOut((sp - SCROLL_PHASES.EXPLODE) / (SCROLL_PHASES.HELIX - SCROLL_PHASES.EXPLODE));
    } else if (sp < SCROLL_PHASES.TORUS) {
      fromPos = targets.explode; toPos = targets.helix;
      localT = easeInOut((sp - SCROLL_PHASES.HELIX) / (SCROLL_PHASES.TORUS - SCROLL_PHASES.HELIX));
    } else if (sp < SCROLL_PHASES.LETTERS) {
      fromPos = targets.helix; toPos = targets.torus;
      localT = easeInOut((sp - SCROLL_PHASES.TORUS) / (SCROLL_PHASES.LETTERS - SCROLL_PHASES.TORUS));
    } else if (sp < SCROLL_PHASES.VORTEX) {
      fromPos = targets.torus; toPos = targets.letters;
      localT = easeInOut((sp - SCROLL_PHASES.LETTERS) / (SCROLL_PHASES.VORTEX - SCROLL_PHASES.LETTERS));
    } else {
      fromPos = targets.letters; toPos = targets.vortex;
      localT = easeInOut((sp - SCROLL_PHASES.VORTEX) / (1 - SCROLL_PHASES.VORTEX));
    }

    // In-place lerp
    const speed = Math.min(dt * 7, 1);
    const pos = currentPositions.current;
    for (let i = 0; i < count * 3; i++) {
      pos[i] += (fromPos[i] + (toPos[i] - fromPos[i]) * localT - pos[i]) * speed;
    }
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    posAttr.set(pos);
    posAttr.needsUpdate = true;

    // Color shift — no allocations
    let colorT = 0;
    if (sp > 0.3 && sp < 0.7) colorT = (sp - 0.3) / 0.4;
    else if (sp >= 0.7) colorT = 1 - (sp - 0.7) / 0.3;
    colorWork.lerpColors(cyan, purple, colorT);
    material.color.copy(colorWork);
    lineMaterial.color.copy(colorWork);

    // Line connections — throttled
    frameRef.current++;
    if (frameRef.current % LINE_FRAME_SKIP === 0) {
      const linePos = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const lineArr = linePos.array as Float32Array;
      let lineIdx = 0;
      const step = isMobile ? LINE_STEP_MOBILE : LINE_STEP_DESKTOP;
      const distSq = 0.64;

      outer: for (let i = 0; i < count; i += step) {
        for (let j = i + step; j < count; j += step) {
          const ix = i * 3, jx = j * 3;
          const dx = pos[ix] - pos[jx];
          const dy = pos[ix + 1] - pos[jx + 1];
          const dz = pos[ix + 2] - pos[jx + 2];
          if (dx * dx + dy * dy + dz * dz < distSq) {
            const li = lineIdx * 6;
            lineArr[li]   = pos[ix];   lineArr[li+1] = pos[ix+1]; lineArr[li+2] = pos[ix+2];
            lineArr[li+3] = pos[jx];   lineArr[li+4] = pos[jx+1]; lineArr[li+5] = pos[jx+2];
            if (++lineIdx >= MAX_LINES) break outer;
          }
        }
      }
      linePos.needsUpdate = true;
    }

    // Rotation + mouse parallax
    groupRef.current.rotation.y += dt * 0.15;
    if (!isMobile) {
      groupRef.current.position.x += (mouseRef.current.x * 0.3 - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (mouseRef.current.y * 0.3 - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} />
      <lineSegments geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
}
