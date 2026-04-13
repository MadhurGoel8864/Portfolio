import { motion } from 'framer-motion';
import { COLORS, withAlpha } from '../../constants/theme';

const VARIANT = {
  indigo: {
    background: withAlpha(COLORS.indigo, 0.10),
    border:     `1px solid ${withAlpha(COLORS.indigo, 0.25)}`,
    color:      COLORS.indigo,
  },
  default: {
    background: 'var(--border-subtle)',
    border:     '1px solid var(--border-medium)',
    color:      'var(--text-secondary)',
  },
};

export function Badge({ children, className = '', color }) {
  const style = VARIANT[color] || VARIANT.default;
  return (
    <motion.span
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium
        cursor-default transition-all duration-200 ${className}`}
      style={style}
    >
      {children}
    </motion.span>
  );
}
