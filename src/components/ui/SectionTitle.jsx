import { motion } from 'framer-motion';
import { itemVariants } from './SectionWrapper';

export function SectionTitle({ label, title, subtitle, align = 'center' }) {
  const textAlign = align === 'left' ? 'text-left' : 'text-center';
  const mx        = align === 'left' ? '' : 'mx-auto';

  return (
    <motion.div variants={itemVariants} className={`mb-16 ${textAlign}`}>
      {label && (
        <div className={`inline-flex items-center gap-2 mb-4 ${align === 'left' ? '' : 'justify-center'}`}>
          <div className="h-px w-6" style={{ background: 'var(--gold)' }} />
          <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>
            {label}
          </span>
          <div className="h-px w-6" style={{ background: 'var(--gold)' }} />
        </div>
      )}

      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${mx}`}
        style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>

      <motion.div
        className={`h-0.5 w-20 rounded-full mb-6 ${mx}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background:      'var(--gold)',
          transformOrigin: align === 'left' ? 'left center' : 'center center',
        }}
      />

      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${mx}`}
          style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
