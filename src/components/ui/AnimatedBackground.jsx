import { COLORS, withAlpha } from '../../constants/theme';

const PARTICLE_COUNT = 10;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  duration: 7 + Math.random() * 6,
  delay: Math.random() * 5,
}));

/**
 * Hero background — CSS-only animations (no mousemove parallax, no framer-motion particles).
 * Intentionally lightweight so the page doesn't stutter on scroll.
 */
export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(var(--gold-rgb), 0.10) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }}
      />

      <div className="absolute -top-60 -left-60 w-[520px] h-[520px] rounded-full aurora-blob-1"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${withAlpha(COLORS.gold, 0.16)} 0%, ${withAlpha(COLORS.goldMuted, 0.07)} 45%, transparent 70%)`,
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />

      <div className="absolute -bottom-52 -right-52 w-[460px] h-[460px] rounded-full aurora-blob-2"
        style={{
          background: `radial-gradient(circle at 60% 60%, ${withAlpha(COLORS.goldMuted, 0.13)} 0%, ${withAlpha(COLORS.goldDim, 0.05)} 45%, transparent 70%)`,
          filter: 'blur(48px)',
          willChange: 'transform',
        }}
      />

      {particles.map(p => (
        <span
          key={p.id}
          className="absolute rounded-full float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'var(--particle-color)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}

      <div className="absolute inset-y-0 right-0 w-48"
        style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-56"
        style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }} />
    </div>
  );
}
