import { motion } from 'framer-motion';

export function Badge({ children, className = '' }) {
  return (
    <motion.span
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium
        cursor-default transition-all duration-200 ${className}`}
      style={{
        background:  'var(--border-subtle)',
        border:      '1px solid var(--border-medium)',
        color:       'var(--text-secondary)',
      }}
    >
      {children}
    </motion.span>
  );
}
