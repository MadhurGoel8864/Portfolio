import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { PERSONAL, SOCIAL, NAV_LINKS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const SOCIALS = [
  { icon: Github,   href: SOCIAL.github,              label: 'GitHub'   },
  { icon: Linkedin, href: SOCIAL.linkedin,             label: 'LinkedIn' },
  { icon: Mail,     href: `mailto:${PERSONAL.email}`,  label: 'Email'    },
];

export function Footer() {
  return (
    <footer
      className="relative transition-colors duration-300 overflow-hidden"
      style={{ background: 'var(--bg-deeper)', borderTop: `1px solid ${withAlpha(COLORS.gold, 0.08)}` }}
    >
      {/* Animated gold top gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${COLORS.gold}, ${COLORS.goldMuted}, transparent)` }}
        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Background glow orb */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${withAlpha(COLORS.gold, 0.06)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${withAlpha(COLORS.gold, 0.06)} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm relative"
                style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})`, color: COLORS.bgBase }}
              >
                {PERSONAL.firstName[0]}
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})`, filter: 'blur(8px)', opacity: 0.35, zIndex: -1 }}
                />
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                {PERSONAL.firstName}<span className="gradient-text">.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
              {PERSONAL.title}.<br />Building things that matter.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.18, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border-medium)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color       = 'var(--gold)';
                    e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.35);
                    e.currentTarget.style.background  = withAlpha(COLORS.gold, 0.08);
                    e.currentTarget.style.boxShadow   = `0 0 16px ${withAlpha(COLORS.gold, 0.15)}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color       = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                    e.currentTarget.style.background  = 'transparent';
                    e.currentTarget.style.boxShadow   = 'none';
                  }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Navigation</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link to={link.href} smooth duration={600} offset={-72}
                    className="cursor-pointer text-sm flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-3"
                      style={{ background: 'var(--border-medium)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--border-medium)'; }}
                    />
                    <span className="group-hover:text-[var(--gold)] transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Contact</h4>
            <div className="space-y-3.5">
              <div>
                <div className="text-xs mb-1 font-medium" style={{ color: 'var(--text-muted)' }}>Email</div>
                <a href={`mailto:${PERSONAL.email}`}
                  className="text-sm flex items-center gap-1 group transition-colors hover:text-[var(--gold)]"
                  style={{ color: 'var(--text-secondary)' }}>
                  {PERSONAL.email}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              <div>
                <div className="text-xs mb-1 font-medium" style={{ color: 'var(--text-muted)' }}>Location</div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{PERSONAL.location}</span>
              </div>
              <div>
                <div className="text-xs mb-1 font-medium" style={{ color: 'var(--text-muted)' }}>Status</div>
                {PERSONAL.availableForWork
                  ? <span className="text-sm font-semibold flex items-center gap-1.5" style={{ color: COLORS.success }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open to opportunities
                    </span>
                  : <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Not currently available</span>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>© {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Built with <Heart size={11} className="text-rose-500 fill-rose-500 animate-pulse" /> using React &amp; Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}
