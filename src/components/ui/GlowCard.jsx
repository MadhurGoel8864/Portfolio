import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { COLORS } from '../../constants/theme';

/**
 * Card with a cursor-tracking radial spotlight on hover.
 * Background and border come from CSS variables so they respond to theme.
 */
export function GlowCard({ children, className = '', glowColor = COLORS.goldRgb, ...props }) {
  const ref      = useRef(null);
  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);
  const springX  = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY  = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const opacity  = useMotionValue(0);
  const opacityS = useSpring(opacity, { damping: 20, stiffness: 200 });

  const handleMouseMove = e => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className={`relative overflow-hidden rounded-2xl transition-colors duration-300 ${className}`}
      style={{
        background:    'var(--bg-surface)',
        border:        '1px solid var(--border-subtle)',
      }}
      {...props}
    >
      {/* Hover spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          opacity:    opacityS,
          background: `radial-gradient(400px circle at ${springX}px ${springY}px, rgba(${glowColor},0.10), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
