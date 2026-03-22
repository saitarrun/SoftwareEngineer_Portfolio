import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GridPlane() {
  const ref = useRef<THREE.Group>(null!);

  const gridMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color('#F97316'),
      transparent: true,
      opacity: 0.12,
    });
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = -((state.clock.elapsedTime * 0.1) % 2);
    }
  });

  return (
    <group position={[0, -8, -6]} rotation={[-Math.PI * 0.08, 0, 0]}>
      <group ref={ref}>
        <gridHelper args={[60, 60, '#F97316', '#F97316']} material={gridMaterial} />
      </group>
    </group>
  );
}
