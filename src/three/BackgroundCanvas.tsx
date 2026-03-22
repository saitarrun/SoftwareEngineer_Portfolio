import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { GridPlane } from './GridPlane';

export function BackgroundCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ParticleField />
        <GridPlane />
      </Canvas>
    </div>
  );
}
