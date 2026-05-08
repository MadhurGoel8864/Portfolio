import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // FIX #21: respect prefers-reduced-motion — skip entire custom cursor
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Only run on non-touch devices
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    const label = labelRef.current;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let tx = mx, ty = my;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      label.style.left = (mx + 16) + 'px';
      label.style.top = (my - 8) + 'px';

      const el = document.elementFromPoint(mx, my);
      const interactive = el?.closest('a, button, .card, .chip, [data-cursor]');
      if (interactive) {
        document.body.classList.add('cursor-hover');
        const txt = interactive.title || interactive.getAttribute('data-cursor') || '';
        label.textContent = txt;
      } else {
        document.body.classList.remove('cursor-hover');
        label.textContent = '';
      }
    };

    const onDown = () => document.body.classList.add('cursor-click');
    const onUp = () => document.body.classList.remove('cursor-click');

    const animate = () => {
      rx += (mx - rx) * 0.45;
      ry += (my - ry) * 0.45;
      tx += (mx - tx) * 0.3;
      ty += (my - ty) * 0.3;

      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      trail.style.left = tx + 'px';
      trail.style.top = ty + 'px';

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="cursor-dot" />
      <div ref={ringRef} id="cursor-ring" />
      <div ref={trailRef} id="cursor-trail" />
      <div ref={labelRef} id="cursor-label" />
    </>
  );
}
