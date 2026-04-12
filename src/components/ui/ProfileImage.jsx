import { motion } from 'framer-motion';
import { PERSONAL } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

/**
 * Clean, balanced profile image.
 * Circular crop, thin gold ring, soft shadow, gentle float.
 */
export function ProfileImage({ size = 260 }) {
  return (
    <motion.div
      className="relative select-none"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.03 }}
      style={{ width: size, height: size }}
    >
      {/* Soft background halo — gold tint, low opacity */}
      <div
        className="absolute -inset-6 rounded-full -z-10"
        style={{
          background: `radial-gradient(circle, ${withAlpha(COLORS.gold, 0.15)} 0%, ${withAlpha(COLORS.gold, 0.05)} 50%, transparent 70%)`,
          filter: 'blur(24px)',
        }}
      />

      {/* Gold ring wrapper — thin (2px), subtle */}
      <div
        className="rounded-full p-[2px]"
        style={{
          background: `linear-gradient(135deg, ${withAlpha(COLORS.gold, 0.7)}, ${withAlpha(COLORS.goldMuted, 0.4)})`,
          width: size,
          height: size,
          boxShadow: `0 8px 32px rgba(0,0,0,0.30), 0 2px 8px ${withAlpha(COLORS.gold, 0.12)}`,
        }}
      >
        {/* Image / fallback */}
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{ background: 'var(--bg-elevated)' }}
        >
          {PERSONAL.profileImage ? (
            <img
              src={PERSONAL.profileImage}
              alt={PERSONAL.name}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          ) : (
            /* Initials fallback */
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(circle at 40% 35%, ${withAlpha(COLORS.gold, 0.18)} 0%, transparent 65%)` }}
              />
              <span
                className="relative z-10 font-extrabold select-none gradient-text"
                style={{ fontSize: size * 0.3 }}
              >
                {PERSONAL.initials}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
