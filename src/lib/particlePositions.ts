export function getSpherePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 1.5 + (Math.random() - 0.5) * 0.3;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

export function getHelixPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const half = Math.floor(count / 2);
  for (let i = 0; i < count; i++) {
    const strand = i < half ? 0 : 1;
    const t = ((i % half) / half) * Math.PI * 8 - Math.PI * 4;
    const offset = strand * Math.PI;
    const radius = 0.8;
    positions[i * 3] = Math.cos(t + offset) * radius;
    positions[i * 3 + 1] = t * 0.2;
    positions[i * 3 + 2] = Math.sin(t + offset) * radius;
  }
  return positions;
}

export function getTorusKnotPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const p = 2, q = 3;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const r = Math.cos(q * t) + 2;
    positions[i * 3] = r * Math.cos(p * t) * 0.7;
    positions[i * 3 + 1] = r * Math.sin(p * t) * 0.7;
    positions[i * 3 + 2] = -Math.sin(q * t) * 0.7;
  }
  return positions;
}

export function getExplodePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * 2;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

export function getVortexPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 20;
    const r = (1 - i / count) * 2;
    positions[i * 3] = Math.cos(t) * r;
    positions[i * 3 + 1] = (i / count) * 4 - 2;
    positions[i * 3 + 2] = Math.sin(t) * r;
  }
  return positions;
}

export function getLetterPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const letterA: [number, number][] = [];
  const letterI: [number, number][] = [];

  // Letter "A" points
  for (let i = 0; i < 40; i++) {
    const t = i / 40;
    if (t < 0.5) {
      letterA.push([-0.8 + t * 1.6, -1 + t * 4]);
    } else {
      letterA.push([0.8 - (t - 0.5) * 1.6, -1 + (t - 0.5) * 4]);
    }
  }
  for (let i = 0; i < 20; i++) {
    letterA.push([-0.3 + (i / 20) * 0.6, 0.2]);
  }

  // Letter "I" points
  for (let i = 0; i < 40; i++) {
    letterI.push([0, -1 + (i / 40) * 4]);
  }
  for (let i = 0; i < 15; i++) {
    letterI.push([-0.4 + (i / 15) * 0.8, -1]);
    letterI.push([-0.4 + (i / 15) * 0.8, 1]);
  }

  const allPoints = [...letterI.map(([x, y]) => [x - 2.0, y, 0] as [number, number, number]), ...letterA.map(([x, y]) => [x + 0.5, y, 0] as [number, number, number])];

  for (let i = 0; i < count; i++) {
    const pt = allPoints[i % allPoints.length];
    const jitter = 0.08;
    positions[i * 3] = pt[0] + (Math.random() - 0.5) * jitter;
    positions[i * 3 + 1] = pt[1] + (Math.random() - 0.5) * jitter;
    positions[i * 3 + 2] = pt[2] + (Math.random() - 0.5) * jitter;
  }
  return positions;
}

export function lerpPositions(
  from: Float32Array,
  to: Float32Array,
  t: number
): Float32Array {
  const result = new Float32Array(from.length);
  const clampedT = Math.max(0, Math.min(1, t));
  for (let i = 0; i < from.length; i++) {
    result[i] = from[i] + (to[i] - from[i]) * clampedT;
  }
  return result;
}
