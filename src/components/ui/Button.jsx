import { motion } from 'framer-motion';
import { COLORS } from '../../constants/theme';

/**
 * Premium button — Black + Gold theme.
 * primary  → gold background, black text
 * outline  → gold border + gold text
 * ghost    → transparent, gray text → gold on hover
 */
export function Button({ children, variant = 'primary', href, onClick, className = '', ...props }) {
  const base =
    'relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer select-none focus-visible:outline-none';

  // Inline style objects so CSS vars resolve at render time
  const getStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          background:  'var(--gold)',
          color:       COLORS.bgBase,
          boxShadow:   '0 2px 12px rgba(var(--gold-rgb), 0.25)',
        };
      case 'outline':
        return {
          background:   'transparent',
          color:         'var(--gold)',
          border:        '1px solid var(--gold)',
        };
      case 'ghost':
        return {
          background:  'transparent',
          color:        'var(--text-secondary)',
        };
      default:
        return {};
    }
  };

  const hoverFns = {
    onMouseEnter: e => {
      if (variant === 'primary') {
        e.currentTarget.style.background  = 'var(--gold-muted)';
        e.currentTarget.style.boxShadow   = '0 4px 20px rgba(var(--gold-rgb), 0.35)';
      }
      if (variant === 'outline') {
        e.currentTarget.style.background  = 'rgba(var(--gold-rgb), 0.08)';
      }
      if (variant === 'ghost') {
        e.currentTarget.style.color        = 'var(--gold)';
        e.currentTarget.style.background   = 'rgba(var(--gold-rgb), 0.06)';
      }
    },
    onMouseLeave: e => {
      const s = getStyle();
      e.currentTarget.style.background  = s.background   ?? '';
      e.currentTarget.style.color       = s.color        ?? '';
      e.currentTarget.style.boxShadow   = s.boxShadow    ?? '';
    },
  };

  const el = href ? 'a' : 'button';

  const motionProps = {
    className: `${base} btn-shine ${className}`,
    style:     getStyle(),
    whileHover: { scale: 1.03 },
    whileTap:   { scale: 0.97 },
    ...hoverFns,
    ...(href
      ? {
          href,
          target: href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto') ? undefined : '_blank',
          rel:    'noopener noreferrer',
        }
      : { onClick }),
    ...props,
  };

  const Tag = href ? motion.a : motion.button;
  return <Tag {...motionProps}>{children}</Tag>;
}
