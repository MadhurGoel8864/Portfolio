import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { COLORS, withAlpha } from '../../constants/theme';

/**
 * Subtle radial glow that follows the cursor — inspired by Linear.app.
 * Only rendered on non-touch devices.
 */
export function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);

  const springX = useSpring(x, { damping: 30, stiffness: 150 });
  const springY = useSpring(y, { damping: 30, stiffness: 150 });

  useEffect(() => {
    const update = e => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', update, { passive: true });
    return () => window.removeEventListener('mousemove', update);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2
        w-[500px] h-[500px] rounded-full
        hidden lg:block"
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${withAlpha(COLORS.gold, 0.05)} 0%, ${withAlpha(COLORS.goldMuted, 0.03)} 40%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
