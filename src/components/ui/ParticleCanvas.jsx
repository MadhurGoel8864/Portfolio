import { useEffect, useRef } from 'react';

export function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // FIX #21: respect prefers-reduced-motion — skip particle animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles, mouse = { x: -999, y: -999 }, rafId;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const count = Math.min(100, Math.floor(W * H / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        r: 0.4 + Math.random() * 1.4,
        alpha: 0.08 + Math.random() * 0.4,
      }));
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          p.vx -= (dx / dist) * 0.12;
          p.vy -= (dy / dist) * 0.12;
        }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) { p.x = Math.random() * W; p.y = Math.random() * H; }
        if (p.y < 0 || p.y > H) { p.x = Math.random() * W; p.y = Math.random() * H; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,169,81,${p.alpha})`;
        ctx.fill();
      });

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200,169,81,${(1 - d / 150) * 0.15})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="particle-canvas" />
      <div id="scanlines" />
    </>
  );
}
