import { motion } from 'framer-motion';
import { ExternalLink, FileText, Database, Zap, Code, Server, Activity, Clock } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { GlowCard } from '../ui/GlowCard';
import { DEVDUAL } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const ICON_MAP = {
  database: Database,
  zap: Zap,
  code: Code,
  server: Server,
  activity: Activity,
  clock: Clock
};

export function SystemOverview() {
  const renderBullets = (items) => (
    <ul className="space-y-3 mt-3 mb-6">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: withAlpha(COLORS.gold, 0.6) }} />
          <span
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <SectionWrapper id="system-overview">
      <SectionTitle
        label="DevDual"
        title={
          <span className="relative inline-block">
            System Overview
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${COLORS.gold}, transparent)` }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </span>
        }
        subtitle="Real-time competitive coding platform with auction-based problem allocation"
      />

      {/* Core description */}
      <motion.div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 mb-14">
        <div className="max-w-[540px]">
          {/* Problem */}
          <motion.div variants={itemVariants}>
            <div className="font-mono text-xs tracking-widest font-bold uppercase" style={{ color: COLORS.gold }}>
              Problem Statement
            </div>
            {renderBullets(DEVDUAL.problemStatement)}
          </motion.div>

          {/* Core mechanic */}
          <motion.div variants={itemVariants}>
            <div className="font-mono text-xs tracking-widest font-bold uppercase" style={{ color: COLORS.gold }}>
              Core Mechanic
            </div>
            {renderBullets(DEVDUAL.coreMechanic)}
          </motion.div>

          {/* The Strategy */}
          <motion.div variants={itemVariants}>
            <div className="font-mono text-xs tracking-widest font-bold uppercase" style={{ color: COLORS.gold }}>
              Strategy
            </div>
            {renderBullets(DEVDUAL.theStrategy)}
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
            <a href={DEVDUAL.url} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.03, y: -2, boxShadow: `0 4px 12px ${withAlpha(COLORS.gold, 0.2)}` }}
                whileTap={{ scale: 0.97 }}
                className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})`, color: COLORS.bgBase }}
              >
                <ExternalLink size={14} /> View Live Demo
              </motion.div>
            </a>
            <a href={DEVDUAL.apiDocs} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.03, y: -2, background: withAlpha(COLORS.gold, 0.1) }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{ border: `1px solid ${withAlpha(COLORS.gold, 0.35)}`, color: 'var(--gold)', background: withAlpha(COLORS.gold, 0.04) }}
              >
                <FileText size={14} /> Explore API (Swagger)
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* System stats card */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="transition-transform duration-300 h-fit">
          <GlowCard className="p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border" style={{ color: COLORS.success, borderColor: withAlpha(COLORS.success, 0.3), background: withAlpha(COLORS.success, 0.05) }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5 mb-[1px]" />
                Live on GCP
              </div>
            </div>

            <div className="font-mono text-xs tracking-widest font-bold uppercase mb-6" style={{ color: COLORS.gold }}>
              System Facts
            </div>

            <div className="space-y-4">
              {DEVDUAL.stats.map(({ label, value, icon, highlight }) => {
                const Icon = ICON_MAP[icon] || Activity;
                return (
                  <div key={label} className="flex flex-col sm:flex-row sm:items-center py-2 gap-1 sm:gap-4 group" style={{ borderBottom: `1px solid ${withAlpha(COLORS.gold, 0.07)}` }}>
                    <div className="flex items-center gap-2 min-w-[110px]">
                      <Icon size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }} />
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{label}</span>
                    </div>
                    <span
                      className={`text-sm ${highlight ? 'font-bold' : 'font-semibold'}`}
                      style={{ color: highlight ? COLORS.gold : 'var(--text-primary)' }}
                    >
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlowCard>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
