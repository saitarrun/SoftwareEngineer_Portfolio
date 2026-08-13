import { useEffect, useRef } from 'react';

/** Returns a ref containing normalized mouse position (-1 to 1) */
export function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px), (pointer: coarse)').matches) {
      return;
    }
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return mouse;
}
