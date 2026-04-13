import { motion } from 'framer-motion';
import { itemVariants } from './SectionWrapper';
import { COLORS, withAlpha } from '../../constants/theme';

export function SectionTitle({ label, title, subtitle, align = 'center' }) {
  const textAlign = align === 'left' ? 'text-left' : 'text-center';
  const mx        = align === 'left' ? '' : 'mx-auto';

  return (
    <motion.div variants={itemVariants} className={`mb-16 ${textAlign}`}>
      {label && (
        <motion.div
          className={`inline-flex items-center gap-2.5 mb-5 ${align === 'left' ? '' : 'justify-center'}`}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25 }}
        >
          {/* Left line */}
          <motion.div
            className="h-px rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{ background: `linear-gradient(90deg, transparent, var(--gold))` }}
          />
          <span
            className="font-mono text-xs tracking-[0.22em] uppercase px-3 py-1 rounded-full"
            style={{
              color:      'var(--gold)',
              background: withAlpha(COLORS.gold, 0.08),
              border:     `1px solid ${withAlpha(COLORS.gold, 0.22)}`,
              letterSpacing: '0.2em',
            }}
          >
            {label}
          </span>
          {/* Right line */}
          <motion.div
            className="h-px rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{ background: `linear-gradient(90deg, var(--gold), transparent)` }}
          />
        </motion.div>
      )}

      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${mx}`}
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h2>

      {/* Animated underline */}
      <motion.div
        className={`relative h-0.5 rounded-full mb-6 overflow-hidden ${mx}`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: `linear-gradient(90deg, var(--gold), var(--gold-muted), var(--gold))`,
          backgroundSize: '200% auto',
          animation: 'shimmer-slide 3s linear infinite',
          transformOrigin: align === 'left' ? 'left center' : 'center center',
        }}
      />

      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${mx}`} style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
