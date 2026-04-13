import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { COLORS, withAlpha } from '../../constants/theme';

const PARTICLE_COUNT = 26;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.2,
    duration: 5 + Math.random() * 8,
    delay: Math.random() * 6,
    drift: (Math.random() - 0.5) * 60,
  }));
}

const particles = generateParticles();

/**
 * Premium hero background:
 * - Three drifting aurora blobs with parallax
 * - Floating golden particle field
 * - Dot-grid texture
 * - Bottom + edge fade
 */
export function AnimatedBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { damping: 40, stiffness: 30 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 30 });

  const blob1X = useTransform(springX, [0, 1], [-30, 30]);
  const blob1Y = useTransform(springY, [0, 1], [-20, 20]);
  const blob2X = useTransform(springX, [0, 1], [20, -20]);
  const blob2Y = useTransform(springY, [0, 1], [15, -15]);
  const blob3X = useTransform(springX, [0, 1], [-10, 10]);
  const blob3Y = useTransform(springY, [0, 1], [10, -10]);

  useEffect(() => {
    const update = e => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', update, { passive: true });
    return () => window.removeEventListener('mousemove', update);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

      {/* Dot grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(var(--gold-rgb), 0.10) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.6,
        }}
      />

      {/* Aurora blob 1 — top-left, large warm gold */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className="absolute -top-72 -left-72 w-[680px] h-[680px] rounded-full aurora-blob-1"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${withAlpha(COLORS.gold, 0.18)} 0%, ${withAlpha(COLORS.goldMuted, 0.08)} 40%, transparent 70%)`,
            filter: 'blur(72px)',
          }}
        />
      </motion.div>

      {/* Aurora blob 2 — bottom-right */}
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className="absolute -bottom-64 -right-64 w-[600px] h-[600px] rounded-full aurora-blob-2"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 60% 60%, ${withAlpha(COLORS.goldMuted, 0.14)} 0%, ${withAlpha(COLORS.goldDim, 0.06)} 45%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Aurora blob 3 — center-right, subtle */}
      <motion.div
        style={{ x: blob3X, y: blob3Y }}
        className="absolute top-1/3 right-1/4 w-[340px] h-[340px] rounded-full aurora-blob-3"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${withAlpha(COLORS.gold, 0.09)} 0%, transparent 65%)`,
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'var(--particle-color)',
            boxShadow: `0 0 ${p.size * 3}px rgba(var(--gold-rgb), 0.5)`,
          }}
          animate={{
            y: [0, -50 + p.drift * 0.3, -90],
            x: [0, p.drift * 0.5, p.drift],
            opacity: [0, 0.75, 0],
            scale: [0.5, 1.4, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Right edge vignette */}
      <div
        className="absolute inset-y-0 right-0 w-48"
        style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56"
        style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
      />
    </div>
  );
}
