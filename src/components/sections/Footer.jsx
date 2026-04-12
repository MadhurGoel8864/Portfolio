import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { PERSONAL, SOCIAL, NAV_LINKS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const SOCIALS = [
  { icon: Github,   href: SOCIAL.github,              label: 'GitHub'   },
  { icon: Linkedin, href: SOCIAL.linkedin,             label: 'LinkedIn' },
  { icon: Twitter,  href: SOCIAL.twitter,              label: 'Twitter'  },
  { icon: Mail,     href: `mailto:${PERSONAL.email}`,  label: 'Email'    },
];

export function Footer() {
  return (
    <footer
      className="relative transition-colors duration-300"
      style={{ background: 'var(--bg-deeper)', borderTop: '1px solid var(--border-subtle)' }}
    >
      {/* Gradient top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(COLORS.gold, 0.4)}, transparent)` }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                style={{ background: 'var(--gold)', color: COLORS.bgBase }}>
                {PERSONAL.firstName[0]}
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                {PERSONAL.firstName}<span className="gradient-text">.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
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
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border-medium)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color       = 'var(--gold)';
                    e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.30);
                    e.currentTarget.style.background  = withAlpha(COLORS.gold, 0.07);
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color       = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                    e.currentTarget.style.background  = 'transparent';
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
                    className="cursor-pointer text-sm flex items-center gap-1.5 group transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-1 h-1 rounded-full transition-all duration-200 group-hover:bg-[var(--gold)]"
                      style={{ background: 'var(--text-muted)' }} />
                    <span className="group-hover:text-[var(--gold)] transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Contact</h4>
            <div className="space-y-3">
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Email</div>
                <a href={`mailto:${PERSONAL.email}`}
                  className="text-sm flex items-center gap-1 group transition-colors hover:text-[var(--gold)]"
                  style={{ color: 'var(--text-secondary)' }}>
                  {PERSONAL.email}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Location</div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{PERSONAL.location}</span>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Status</div>
                {PERSONAL.availableForWork
                  ? <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: COLORS.success }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open to opportunities
                    </span>
                  : <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Not currently available</span>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
          <span>© {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Built with <Heart size={11} className="text-rose-500 fill-rose-500" /> using React & Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}
