import { motion } from 'framer-motion';

export const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.1 } },
};

export const itemVariants = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const fadeInVariants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { duration: 0.7 } },
};

export function SectionWrapper({ id, className = '', alt = false, children }) {
  return (
    <section
      id={id}
      className={`relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${className}`}
      style={{ background: alt ? 'var(--bg-elevated)' : 'var(--bg-base)' }}
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
