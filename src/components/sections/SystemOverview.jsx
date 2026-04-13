import { motion } from 'framer-motion';
import { ExternalLink, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { GlowCard } from '../ui/GlowCard';
import { DEVDUAL } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

export function SystemOverview() {
  return (
    <SectionWrapper id="system-overview">
      <SectionTitle
        label="DevDual"
        title="System Overview"
        subtitle={null}
      />

      {/* Core description */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-[1.3fr_1fr] gap-10 mb-14">
        <div className="space-y-5">
          {/* Problem */}
          <div>
            <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: withAlpha(COLORS.gold, 0.7) }}>
              Problem Statement
            </div>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {DEVDUAL.problemStatement}
            </p>
          </div>

          {/* Core mechanic */}
          <div>
            <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: withAlpha(COLORS.gold, 0.7) }}>
              Core Mechanic
            </div>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {DEVDUAL.coreMechanic}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={DEVDUAL.url} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})`, color: COLORS.bgBase }}
              >
                <ExternalLink size={14} /> Live System
              </motion.div>
            </a>
            <a href={DEVDUAL.apiDocs} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                style={{ border: `1px solid ${withAlpha(COLORS.gold, 0.35)}`, color: 'var(--gold)', background: withAlpha(COLORS.gold, 0.06) }}
              >
                <FileText size={14} /> API Docs
              </motion.div>
            </a>
          </div>
        </div>

        {/* System stats card */}
        <GlowCard className="p-6">
          <div className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: withAlpha(COLORS.gold, 0.7) }}>
            System Facts
          </div>
          <div className="space-y-3">
            {DEVDUAL.stats.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${withAlpha(COLORS.gold, 0.07)}` }}>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Status badge */}
          <div className="mt-4 flex items-center gap-2 text-xs font-medium" style={{ color: COLORS.success }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {DEVDUAL.status}
          </div>
        </GlowCard>
      </motion.div>

      {/* Why this system is non-trivial */}
      <motion.div variants={itemVariants}>
        <div className="font-mono text-xs tracking-widest uppercase mb-5 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <AlertTriangle size={12} style={{ color: 'var(--gold)' }} />
          Why this system is non-trivial
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEVDUAL.nonTrivialAspects.map((aspect, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: withAlpha(COLORS.gold, 0.04), border: `1px solid ${withAlpha(COLORS.gold, 0.12)}` }}
            >
              <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
              <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{aspect}</span>
            </motion.div>
          ))}
        </div>

        {/* Tech stack row */}
        <div className="flex flex-wrap gap-2 mt-6">
          {DEVDUAL.techStack.map(t => (
            <span key={t}
              className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
              style={{ background: withAlpha(COLORS.gold, 0.08), color: 'var(--gold)', border: `1px solid ${withAlpha(COLORS.gold, 0.22)}` }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
