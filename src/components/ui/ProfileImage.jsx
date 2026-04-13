import { motion } from 'framer-motion';
import { PERSONAL } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

/**
 * Premium profile image with animated SVG orbital rings.
 */
export function ProfileImage({ size = 260 }) {
  const r1 = size * 0.53;  // outer orbit radius
  const r2 = size * 0.58;  // second orbit

  return (
    <motion.div
      className="relative select-none flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.04 }}
      style={{ width: size + 80, height: size + 80 }}
    >
      {/* Pulsing background halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${withAlpha(COLORS.gold, 0.18)} 0%, ${withAlpha(COLORS.gold, 0.05)} 45%, transparent 68%)`,
          filter: 'blur(32px)',
        }}
      />

      {/* Outer SVG orbital rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${size + 80} ${size + 80}`}
        fill="none"
        style={{ overflow: 'visible' }}
      >
        {/* Slow-rotating ring (outer) */}
        <motion.ellipse
          cx={(size + 80) / 2}
          cy={(size + 80) / 2}
          rx={r2}
          ry={r2 * 0.28}
          stroke={`url(#ring-gradient-1)`}
          strokeWidth="1.5"
          strokeDasharray="8 12"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}
        />
        {/* Faster counter-rotating ring (inner) */}
        <motion.ellipse
          cx={(size + 80) / 2}
          cy={(size + 80) / 2}
          rx={r1}
          ry={r1 * 0.22}
          stroke={`url(#ring-gradient-2)`}
          strokeWidth="1"
          strokeDasharray="4 16"
          animate={{ rotateZ: -360 }}
          transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}
        />
        {/* Orbiting dot 1 */}
        <motion.circle
          r="4"
          fill={COLORS.gold}
          style={{ filter: `drop-shadow(0 0 6px ${COLORS.gold})` }}
          animate={{
            cx: [
              (size+80)/2 + r2,
              (size+80)/2,
              (size+80)/2 - r2,
              (size+80)/2,
              (size+80)/2 + r2,
            ],
            cy: [
              (size+80)/2,
              (size+80)/2 + r2 * 0.28,
              (size+80)/2,
              (size+80)/2 - r2 * 0.28,
              (size+80)/2,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        {/* Orbiting dot 2 (opposite phase) */}
        <motion.circle
          r="2.5"
          fill={COLORS.goldMuted}
          style={{ filter: `drop-shadow(0 0 4px ${COLORS.goldMuted})` }}
          animate={{
            cx: [
              (size+80)/2 - r1,
              (size+80)/2,
              (size+80)/2 + r1,
              (size+80)/2,
              (size+80)/2 - r1,
            ],
            cy: [
              (size+80)/2,
              (size+80)/2 + r1 * 0.22,
              (size+80)/2,
              (size+80)/2 - r1 * 0.22,
              (size+80)/2,
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
        />
        <defs>
          <linearGradient id="ring-gradient-1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={COLORS.gold}      stopOpacity="0" />
            <stop offset="50%"  stopColor={COLORS.gold}      stopOpacity="0.7" />
            <stop offset="100%" stopColor={COLORS.goldMuted} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ring-gradient-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={COLORS.goldMuted} stopOpacity="0" />
            <stop offset="60%"  stopColor={COLORS.goldMuted} stopOpacity="0.5" />
            <stop offset="100%" stopColor={COLORS.gold}      stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow pulse ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: size + 12,
          height: size + 12,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${withAlpha(COLORS.gold, 0.20)} 0%, transparent 70%)`,
          filter: 'blur(16px)',
          animation: 'glow-pulse 2.8s ease-in-out infinite',
        }}
      />

      {/* Gold ring border */}
      <div
        className="rounded-full p-[2.5px] relative z-10"
        style={{
          background: `conic-gradient(${COLORS.gold}, ${COLORS.goldMuted}, ${COLORS.goldDim}, ${COLORS.gold})`,
          width: size,
          height: size,
          boxShadow: `0 12px 40px rgba(0,0,0,0.40), 0 0 0 1px ${withAlpha(COLORS.gold, 0.18)}`,
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
          {PERSONAL.profileImage ? (
            <img
              src={PERSONAL.profileImage}
              alt={PERSONAL.name}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 40% 35%, ${withAlpha(COLORS.gold, 0.18)} 0%, transparent 65%)` }} />
              <span className="relative z-10 font-extrabold select-none gradient-text" style={{ fontSize: size * 0.3 }}>
                {PERSONAL.initials}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
