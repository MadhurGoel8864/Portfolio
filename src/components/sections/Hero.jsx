import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Download, ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { PERSONAL, SOCIAL, STATS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';
import { useTypewriter } from '../../hooks/useTypewriter';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { ProfileImage } from '../ui/ProfileImage';
import { Button } from '../ui/Button';

// Stagger container + child variants
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const child = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const SOCIAL_LINKS = [
  { icon: Github,   href: SOCIAL.github,             label: 'GitHub'   },
  { icon: Linkedin, href: SOCIAL.linkedin,            label: 'LinkedIn' },
  { icon: Twitter,  href: SOCIAL.twitter,             label: 'Twitter'  },
  { icon: Mail,     href: `mailto:${PERSONAL.email}`, label: 'Email'    },
];

export function Hero() {
  const { displayText } = useTypewriter(PERSONAL.roles, 80, 40, 2400);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* ── Main grid: 55 / 45 split ───────────────────────── */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Text block ──────────────────────────────── */}
          <motion.div
            className="flex flex-col items-start"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Availability pill */}
            {PERSONAL.availableForWork && (
              <motion.div variants={child} className="mb-7">
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: withAlpha(COLORS.success, 0.08),
                    border:     `1px solid ${withAlpha(COLORS.success, 0.25)}`,
                    color:      COLORS.success,
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  Available for new opportunities
                </span>
              </motion.div>
            )}

            {/* Name */}
            <motion.h1
              variants={child}
              className="text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.05] mb-4"
            >
              <span style={{ color: 'var(--text-primary)' }}>{PERSONAL.firstName} </span>
              <span className="gradient-text">{PERSONAL.lastName}</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div variants={child} className="flex items-center gap-2 mb-5 h-8">
              <span className="text-lg sm:text-xl font-medium" style={{ color: 'var(--text-secondary)' }}>
                {displayText}
              </span>
              <motion.span
                className="inline-block w-[2px] h-5 rounded-full"
                style={{ background: 'var(--gold)' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={child}
              className="text-base leading-relaxed max-w-md mb-9"
              style={{ color: 'var(--text-muted)' }}
            >
              {PERSONAL.tagline}
            </motion.p>

            {/* CTA — two buttons only */}
            <motion.div variants={child} className="flex flex-wrap items-center gap-3 mb-9">
              <Link to="projects" smooth duration={600} offset={-72}>
                <Button variant="primary">
                  View My Work
                  <ArrowRight size={15} />
                </Button>
              </Link>
              <Button variant="outline" href={SOCIAL.resumeLink} download>
                <Download size={15} />
                Resume
              </Button>
            </motion.div>

            {/* Social icons row */}
            <motion.div variants={child} className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border-medium)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color       = 'var(--gold)';
                    e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.35);
                    e.currentTarget.style.background  = withAlpha(COLORS.gold, 0.07);
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color       = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                    e.currentTarget.style.background  = 'transparent';
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Profile image ──────────────────────────── */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProfileImage size={260} />
          </motion.div>
        </div>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <motion.div
          className="mt-20 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-8"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.08 }}
            >
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1px solid var(--border-medium)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--gold-dim)' }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
