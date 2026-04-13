import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { COLORS, withAlpha } from '../../constants/theme';

/**
 * GlowCard — Premium interactive card:
 * - Subtle 3D tilt on hover (keeps depth, no text obstruction)
 * - Diagonal shimmer sweep on hover entry
 * - Top-edge highlight (thin gradient line at top)
 * - Border color + shadow transitions to gold glow
 * NO cursor-tracking spotlight (that was making text hard to read)
 */
export function GlowCard({ children, className = '', glowColor = COLORS.goldRgb, ...props }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [swept, setSwept] = useState(false);

  // 3D tilt (reduced magnitude for subtlety)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { damping: 30, stiffness: 180 });
  const springTiltY = useSpring(tiltY, { damping: 30, stiffness: 180 });

  const handleMouseMove = e => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // max ±4 degrees — subtle, doesn't overwhelm
    tiltY.set(((x - centerX) / centerX) * 4);
    tiltX.set(((centerY - y) / centerY) * 4);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    // Trigger the shimmer sweep once
    setSwept(false);
    requestAnimationFrame(() => setSwept(true));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    setSwept(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background:     'var(--bg-surface)',
        border:         `1px solid ${hovered ? `rgba(${glowColor}, 0.35)` : 'var(--border-subtle)'}`,
        rotateX:         springTiltX,
        rotateY:         springTiltY,
        perspective:     900,
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.28), 0 0 0 1px rgba(${glowColor},0.18), 0 0 32px rgba(${glowColor},0.09)`
          : '0 4px 20px rgba(0,0,0,0.12)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      {...props}
    >
      {/* ── Top edge highlight — thin gold line that brightens on hover ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none rounded-t-2xl"
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(${glowColor}, ${hovered ? 0.75 : 0.20}), transparent)`,
          transition: 'all 0.4s ease',
        }}
      />

      {/* ── Subtle top inner glow — just top 30%, very faint ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none rounded-t-2xl"
        style={{
          height: '35%',
          background: `linear-gradient(to bottom, rgba(${glowColor}, ${hovered ? 0.04 : 0}) 0%, transparent 100%)`,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* ── Diagonal shimmer sweep (fires once on hover entry) ── */}
      {swept && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-120%', skewX: -18 }}
          animate={{ x: '220%' }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            width: '60%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), rgba(255,255,255,0.04), transparent)',
          }}
        />
      )}

      {/* ── Corner accent dots (appear on hover, pure decoration) ── */}
      {hovered && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-2 right-2 w-1 h-1 rounded-full pointer-events-none"
            style={{ background: `rgba(${glowColor}, 0.6)`, boxShadow: `0 0 6px rgba(${glowColor}, 0.8)` }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: 0.05 }}
            className="absolute bottom-2 left-2 w-0.5 h-0.5 rounded-full pointer-events-none"
            style={{ background: `rgba(${glowColor}, 0.5)` }}
          />
        </>
      )}

      {children}
    </motion.div>
  );
}
