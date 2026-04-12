import { motion } from 'framer-motion';

/**
 * Simple card with hover lift — uses CSS vars for theme-aware styling.
 */
export function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      className={`rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background:  'var(--bg-surface)',
        border:      '1px solid var(--border-subtle)',
        boxShadow:   '0 4px 24px rgba(0,0,0,0.15)',
      }}
      whileHover={hover ? { y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.25)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
