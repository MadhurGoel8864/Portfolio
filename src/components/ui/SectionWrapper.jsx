import { motion } from 'framer-motion';
import { withAlpha } from '../../constants/theme';

export const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const fadeInVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.32 } },
};

export function SectionWrapper({ id, className = '', alt = false, children }) {
  return (
    <section
      id={id}
      className={`relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${className}`}
      style={{ background: alt ? 'var(--bg-elevated)' : 'var(--bg-base)' }}
    >
      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Ambient glow orb (alternates sides per section) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--gold-rgb), 0.04) 0%, transparent 65%)',
          filter: 'blur(60px)',
          top: '50%',
          left: alt ? 'auto' : '-10%',
          right: alt ? '-10%' : 'auto',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(var(--gold-rgb), 0.055) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.5,
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
