import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PARTICLE_COUNT } from './constants';

export function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 20
        ),
        speed: 0.002 + Math.random() * 0.006,
        offset: Math.random() * Math.PI * 2,
        scale: 0.008 + Math.random() * 0.015,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      // Multi-layered smooth sinusoidal motion for liquid feel
      const sx = Math.sin(t * p.speed + p.offset) * 0.8 + Math.sin(t * p.speed * 1.7 + p.offset * 2.3) * 0.3;
      const sy = Math.cos(t * p.speed * 0.6 + p.offset) * 0.6 + Math.sin(t * p.speed * 1.3 + p.offset * 1.7) * 0.25;
      const sz = Math.sin(t * p.speed * 0.4 + p.offset * 0.8) * 0.4;
      dummy.position.set(
        p.position.x + sx,
        p.position.y + sy,
        p.position.z + sz
      );
      // Pulsing scale for breathing effect
      const pulseScale = p.scale * (1 + Math.sin(t * p.speed * 2 + p.offset) * 0.3);
      dummy.scale.setScalar(pulseScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#F97316" transparent opacity={0.15} />
    </instancedMesh>
  );
}
