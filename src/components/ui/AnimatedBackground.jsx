import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { COLORS, withAlpha } from '../../constants/theme';

/**
 * Minimal hero background:
 * - Faint grid (low opacity, does not compete with content)
 * - Two subtle warm-gold blobs pushed to corners with gentle mouse parallax
 * - Bottom fade to base bg
 */
export function AnimatedBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 40 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 40 });

  const blob1X = useTransform(springX, [0, 1], [-20, 20]);
  const blob1Y = useTransform(springY, [0, 1], [-15, 15]);
  const blob2X = useTransform(springX, [0, 1], [15, -15]);
  const blob2Y = useTransform(springY, [0, 1], [10, -10]);

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

      {/* Grid — very faint, only for texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          opacity: 0.5,
        }}
      />

      {/* Blob 1 — warm gold, far top-left corner */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className="absolute -top-64 -left-64 w-[560px] h-[560px] rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${withAlpha(COLORS.gold, 0.14)} 0%, transparent 65%)`,
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Blob 2 — warm gold dim, far bottom-right corner */}
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className="absolute -bottom-48 -right-48 w-[480px] h-[480px] rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${withAlpha(COLORS.goldMuted, 0.10)} 0%, transparent 65%)`,
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
      />
    </div>
  );
}
