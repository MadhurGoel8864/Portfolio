import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { PERSONAL, SOCIAL } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const LINKS = [
  { icon: ExternalLink, label: "Live System",  href: SOCIAL.liveProject, desc: "DevDual — running on GCP",     primary: true },
  { icon: FileText,     label: "API Docs",     href: SOCIAL.apiDocs,     desc: "OpenAPI / Swagger docs"        },
  { icon: Github,       label: "GitHub",       href: SOCIAL.github,      desc: "Source code + history"        },
  { icon: Linkedin,     label: "LinkedIn",     href: SOCIAL.linkedin,    desc: "Professional profile"         },
  { icon: Mail,         label: "Email",        href: `mailto:${PERSONAL.email}`, desc: PERSONAL.email        },
];

export function Contact() {
  return (
    <SectionWrapper id="contact" alt>
      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none overflow-hidden">
        <div className="w-full h-full rounded-full blur-[100px] opacity-10"
          style={{ background: `radial-gradient(circle, ${COLORS.gold}, ${COLORS.goldMuted})` }} />
      </div>

      <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center mb-12">
        <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: withAlpha(COLORS.gold, 0.7) }}>
          Contact
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
          Explore the System
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Open to backend engineering roles, technical discussions, or just questions about DevDual's architecture.
          The system is live — feel free to explore.
        </p>
      </motion.div>

      {/* Primary CTAs */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
        <a href={SOCIAL.liveProject} target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: `0 10px 40px ${withAlpha(COLORS.gold, 0.30)}` }}
            whileTap={{ scale: 0.97 }}
            className="btn-shine inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})`, color: COLORS.bgBase, boxShadow: `0 4px 24px ${withAlpha(COLORS.gold, 0.22)}` }}
          >
            <ExternalLink size={17} /> Live System
          </motion.div>
        </a>
        <a href={SOCIAL.apiDocs} target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base cursor-pointer transition-all"
            style={{ border: `1px solid ${withAlpha(COLORS.gold, 0.35)}`, color: 'var(--gold)', background: withAlpha(COLORS.gold, 0.06) }}
          >
            <FileText size={17} /> API Docs
          </motion.div>
        </a>
      </motion.div>

      {/* All links */}
      <motion.div variants={itemVariants} className="max-w-lg mx-auto space-y-2">
        {LINKS.slice(2).map(({ icon: Icon, label, href, desc }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            className="flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all group"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.25); e.currentTarget.style.background = withAlpha(COLORS.gold, 0.03); }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.background = 'var(--bg-surface)'; }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: withAlpha(COLORS.gold, 0.08), border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}>
              <Icon size={15} style={{ color: 'var(--gold)' }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</div>
            </div>
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: 'var(--text-muted)' }} />
          </motion.a>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="text-center mt-10 text-xs" style={{ color: 'var(--text-muted)' }}>
        {PERSONAL.availableForWork && (
          <span className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to backend engineering roles · {PERSONAL.location}
          </span>
        )}
      </motion.div>
    </SectionWrapper>
  );
}
