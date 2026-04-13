import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { ACHIEVEMENTS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

function AchievementCard({ ach, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'var(--bg-surface)',
        border:     `1px solid ${hovered ? withAlpha(ach.color, 0.40) : withAlpha(ach.color, 0.14)}`,
        boxShadow:  hovered ? `0 20px 50px rgba(0,0,0,0.18), 0 0 40px ${withAlpha(ach.color, 0.10)}` : '0 4px 18px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Border beam on hover */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            padding: '1px',
            background: `conic-gradient(from var(--angle, 0deg), transparent 55%, ${withAlpha(ach.color, 0.7)} 70%, transparent 85%)`,
            animation: 'beam-rotate 2.8s linear infinite',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }} />
      )}

      {/* Hover glow */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(circle at 50% 0%, ${withAlpha(ach.color, 0.10)}, transparent 65%)` }} />

      {/* Top shine */}
      <div className="h-[1px] w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(ach.color, hovered ? 0.65 : 0.25)}, transparent)`, transition: 'all 0.3s' }} />

      <div className="p-5">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-3"
          style={{ background: withAlpha(ach.color, 0.08), border: `1px solid ${withAlpha(ach.color, 0.22)}`,
            boxShadow: hovered ? `0 0 18px ${withAlpha(ach.color, 0.22)}` : 'none', transition: 'box-shadow 0.3s' }}
          animate={hovered ? { scale: 1.12, rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.35 }}
        >
          {ach.emoji}
        </motion.div>

        <div className="font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color: withAlpha(ach.color, 0.7) }}>
          {ach.category}
        </div>

        <h3 className="font-bold text-sm mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>
          {ach.title}
        </h3>

        <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {ach.description}
        </p>

        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: `1px solid ${withAlpha(ach.color, 0.10)}` }}>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-md"
            style={{ color: ach.color, background: withAlpha(ach.color, 0.08), border: `1px solid ${withAlpha(ach.color, 0.20)}` }}>
            {ach.year}
          </span>
          {ach.link && (
            <a href={ach.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold hover:opacity-75 transition-opacity"
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
    <SectionWrapper id="achievements">
      <SectionTitle
        label="Recognition"
        title="Achievements"
        subtitle="Competitive programming, research, and professional milestones."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS.map((ach, i) => (
          <AchievementCard key={ach.id} ach={ach} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
