import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { Badge } from '../ui/Badge';
import { GlowCard } from '../ui/GlowCard';
import { EXPERIENCE } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const TYPE_STYLE = {
  'Full-time':  { bg: withAlpha(COLORS.success,   0.1),  text: COLORS.success,   border: withAlpha(COLORS.success,   0.25) },
  'Internship': { bg: withAlpha(COLORS.gold,       0.08), text: COLORS.gold,      border: withAlpha(COLORS.gold,       0.25) },
  'Research':   { bg: withAlpha(COLORS.goldMuted,  0.08), text: COLORS.goldMuted, border: withAlpha(COLORS.goldMuted,  0.25) },
};

function ExperienceCard({ exp, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const ts     = TYPE_STYLE[exp.type] || TYPE_STYLE['Research'];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex gap-0 group"
    >
      {/* Timeline column */}
      <div className="hidden sm:flex flex-col items-center w-16 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.12, type: 'spring', stiffness: 400 }}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center z-10 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${exp.color}, ${exp.color}aa)` }}
        >
          <Briefcase size={16} className="text-white" />
          {exp.current && (
            <span className="absolute inset-0 rounded-xl animate-ping opacity-20"
              style={{ background: exp.color }} />
          )}
        </motion.div>
        {index < EXPERIENCE.length - 1 && (
          <motion.div
            className="flex-1 w-0.5 mt-2"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.12, ease: 'easeOut' }}
            style={{
              transformOrigin: 'top center',
              background:      `linear-gradient(180deg, ${exp.color}40, var(--border-subtle))`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10 sm:pl-4">
        <GlowCard className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                  style={{ background: ts.bg, color: ts.text, border: `1px solid ${ts.border}` }}>
                  {exp.type}
                </span>
                {exp.current && (
                  <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: COLORS.success }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{exp.role}</h3>
              <div className="mt-1">
                {exp.companyUrl
                  ? <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium flex items-center gap-1 hover:opacity-75 transition-opacity"
                      style={{ color: exp.color }}>
                      {exp.company} <ExternalLink size={11} />
                    </a>
                  : <span className="text-sm font-medium" style={{ color: exp.color }}>{exp.company}</span>
                }
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={11} style={{ color: 'var(--gold-dim)' }} /> {exp.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} style={{ color: 'var(--gold-dim)' }} /> {exp.location}
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>

          <ul className="space-y-2 mb-5">
            {exp.responsibilities.map((r, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.12 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                {r}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {exp.techStack.map(t => <Badge key={t}>{t}</Badge>)}
          </div>
        </GlowCard>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionTitle
        label="Career"
        title="Work Experience"
        subtitle="My professional journey — the roles, the impact, and the lessons learned."
      />
      <div className="max-w-3xl mx-auto">
        {EXPERIENCE.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
