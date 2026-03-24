import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const count = 120;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const positions: number[] = [];
    const velocities: number[] = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
      velocities.push(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.003
      );
    }
    return { positions, velocities };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      particles.positions[i * 3] += particles.velocities[i * 3];
      particles.positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
      particles.positions[i * 3 + 2] += particles.velocities[i * 3 + 2];

      for (let axis = 0; axis < 3; axis++) {
        const limit = axis === 0 ? 10 : axis === 1 ? 6 : 4;
        if (Math.abs(particles.positions[i * 3 + axis]) > limit) {
          particles.velocities[i * 3 + axis] *= -1;
        }
      }

      dummy.position.set(
        particles.positions[i * 3],
        particles.positions[i * 3 + 1],
        particles.positions[i * 3 + 2]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = particles.positions[i * 3] - particles.positions[j * 3];
        const dy = particles.positions[i * 3 + 1] - particles.positions[j * 3 + 1];
        const dz = particles.positions[i * 3 + 2] - particles.positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 3) {
          linePositions.push(
            particles.positions[i * 3], particles.positions[i * 3 + 1], particles.positions[i * 3 + 2],
            particles.positions[j * 3], particles.positions[j * 3 + 1], particles.positions[j * 3 + 2]
          );
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    const geo = linesRef.current.geometry;
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#4a6aff" transparent opacity={0.7} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#1a3aff" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,25,255,0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
