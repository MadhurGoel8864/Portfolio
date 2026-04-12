import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { ACHIEVEMENTS } from '../../constants/global';

function AchievementCard({ ach }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative rounded-2xl overflow-hidden group cursor-default transition-all duration-300"
      style={{ background: 'var(--bg-surface)', border: `1px solid ${ach.color}20` }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.15), 0 0 0 1px ${ach.color}25`; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Hover radial glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${ach.color}12, transparent 60%)` }} />

      {/* Top accent line */}
      <div className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${ach.color}, transparent)` }} />

      <div className="p-6">
        {/* Emoji icon */}
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
          style={{ background: `${ach.color}12`, border: `1px solid ${ach.color}25` }}
          whileHover={{ rotate: [-8, 8, 0] }}
          transition={{ duration: 0.4 }}
        >
          {ach.emoji}
        </motion.div>

        <div className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: `${ach.color}90` }}>
          {ach.category}
        </div>

        <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>
          {ach.title}
        </h3>

        <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {ach.description}
        </p>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{ach.year}</span>
          {ach.link && (
            <a href={ach.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium hover:opacity-75 transition-opacity"
              style={{ color: ach.color }}>
              View <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Achievements() {
  return (
    <SectionWrapper id="achievements" alt>
      <SectionTitle
        label="Recognition"
        title="Achievements"
        subtitle="Milestones across competitive programming, open source, and real-world impact."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS.map(ach => <AchievementCard key={ach.id} ach={ach} />)}
      </div>
    </SectionWrapper>
  );
}
