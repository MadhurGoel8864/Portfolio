import { useState, useEffect } from 'react';

/**
 * Tracks the current mouse position.
 * Returns { x, y } in pixels.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', update, { passive: true });
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return position;
}
