import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, MapPin, Download, CheckCircle } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { GlowCard } from '../ui/GlowCard';
import { Badge } from '../ui/Badge';
import { PERSONAL, EDUCATION, EXPERIENCE, SOCIAL } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const TYPE_COLORS = {
  'Full-time': { bg: withAlpha(COLORS.indigo, 0.10), text: COLORS.indigo, border: withAlpha(COLORS.indigo, 0.28) },
  'Internship': { bg: withAlpha(COLORS.indigo, 0.10), text: COLORS.indigo, border: withAlpha(COLORS.indigo, 0.28) },
};

function ExperienceCard({ exp, index }) {
  const tc = TYPE_COLORS[exp.type] || TYPE_COLORS['Internship'];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.28 }}
    >
      <GlowCard className="p-5 h-full" glowColor={COLORS.indigoRgb}>
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(COLORS.indigo, 0.55)}, transparent)` }} />

        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>
                {exp.type}
              </span>
              {exp.current && (
                <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: COLORS.indigo }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.indigo }} /> Current
                </span>
              )}
            </div>
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{exp.role}</h3>
            <span className="text-xs font-medium" style={{ color: COLORS.indigo }}>{exp.company}</span>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[10px] font-mono" style={{ color: COLORS.indigo }}>{exp.duration}</div>
            <div className="text-[10px] flex items-center gap-1 justify-end mt-0.5" style={{ color: COLORS.indigo }}>
              <MapPin size={9} /> {exp.location}
            </div>
          </div>
        </div>

        <ul className="space-y-1.5 mb-3">
          {exp.responsibilities.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: COLORS.indigo }} />
              {r}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1 pt-3" style={{ borderTop: `1px solid ${withAlpha(COLORS.indigo, 0.15)}` }}>
          {exp.techStack.map(t => <Badge key={t} color="indigo">{t}</Badge>)}
        </div>
      </GlowCard>
    </motion.div>
  );
}

function EducationCard({ edu, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.28 }}
    >
      <GlowCard className="p-5 h-full">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: withAlpha(COLORS.gold, 0.08), border: `1px solid ${withAlpha(COLORS.gold, 0.22)}` }}>
            <GraduationCap size={16} style={{ color: 'var(--gold)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{edu.degree}</div>
            <div className="text-xs mb-0.5" style={{ color: 'var(--gold)' }}>{edu.school}</div>
            <div className="text-[10px] mb-3" style={{ color: 'var(--text-muted)' }}>
              {edu.affiliation} · {edu.duration}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {edu.highlights.map(h => (
                <span key={h} className="text-[9px] font-mono px-2 py-0.5 rounded-md"
                  style={{ color: 'var(--gold)', background: withAlpha(COLORS.gold, 0.07), border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}>
                  {h}
                </span>
              ))}
            </div>
          </div>
          <div className="font-black text-xl flex-shrink-0" style={{ color: 'var(--gold)' }}>
            {edu.gpa}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export function About() {
  return (
    <SectionWrapper id="about" alt>
      <SectionTitle
        label="Background"
        title="About Me"
        subtitle={null}
      />

      <div className="max-w-6xl mb-12">
        <motion.p variants={itemVariants} className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {PERSONAL.bio}
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <MapPin size={12} style={{ color: 'var(--gold-dim)' }} /> {PERSONAL.location}
          </div>
          <a href={SOCIAL.resumeLink} download className="group">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="btn-shine inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})`, color: COLORS.bgBase }}>
              <Download size={12} /> Download Resume
            </motion.div>
          </a>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

        {/* Left — Education */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap size={16} style={{ color: 'var(--gold)' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Education
            </span>
          </div>
          <div className="space-y-4">
            {EDUCATION.map((edu, i) => (
              <EducationCard key={i} edu={edu} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Right — Experience */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase size={16} style={{ color: COLORS.indigo }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Work Experience
            </span>
          </div>
          <div className="space-y-4">
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
