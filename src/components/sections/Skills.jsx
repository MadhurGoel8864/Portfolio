import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Globe, Server, Cloud, BarChart2, Cpu } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { SKILLS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const CATEGORY_ICONS = {
  'Programming Languages':    Code2,
  'Backend Development':      Server,
  'Frontend Development':     Globe,
  'Databases':                Database,
  'Cloud & DevOps':           Cloud,
  'Data & Analytics':         BarChart2,
  'Core Computer Science':    Cpu,
};

function SkillBar({ name, level, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.28 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium transition-colors group-hover:text-white" style={{ color: 'var(--text-secondary)' }}>
          {name}
        </span>
        <span className="font-mono text-xs transition-all" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden relative"
        style={{ background: 'var(--border-subtle)' }}
      >
        <motion.div
          className="h-full rounded-full progress-shimmer"
          style={{
            background: `linear-gradient(90deg, ${color}bb, ${color}, ${color}dd)`,
            backgroundSize: '200% auto',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 + index * 0.04, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SKILLS[activeIdx];
  const Icon = CATEGORY_ICONS[active.category] || Code2;

  return (
    <SectionWrapper id="skills">
      <SectionTitle
        label="Skills"
        title="Tech Stack"
        subtitle="Tools and technologies I use to build fast, scalable, and intelligent products."
      />

      {/* Category tabs */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-10">
        {SKILLS.map((group, i) => {
          const TabIcon = CATEGORY_ICONS[group.category] || Code2;
          const isActive = activeIdx === i;
          return (
            <motion.button
              key={group.category}
              onClick={() => setActiveIdx(i)}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
              style={isActive ? {
                background:  withAlpha(COLORS.gold, 0.12),
                border:      `1px solid ${withAlpha(COLORS.gold, 0.40)}`,
                color:       'var(--gold)',
                boxShadow:   `0 0 24px ${withAlpha(COLORS.gold, 0.15)}, inset 0 1px 0 ${withAlpha(COLORS.gold, 0.15)}`,
              } : {
                background:  'transparent',
                border:      '1px solid var(--border-medium)',
                color:       'var(--text-muted)',
              }}
            >
              <TabIcon size={13} />
              {group.category}
              {isActive && (
                <motion.div
                  layoutId="skills-tab-bg"
                  className="absolute inset-0 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Skill bars panel */}
          <div
            className="rounded-2xl p-6 space-y-4 relative overflow-hidden"
            style={{
              background:  'var(--bg-surface)',
              border:      `1px solid ${withAlpha(COLORS.gold, 0.12)}`,
              boxShadow:   `0 0 60px ${withAlpha(COLORS.gold, 0.05)}`,
            }}
          >
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-30 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${withAlpha(COLORS.gold, 0.25)}, transparent)`, filter: 'blur(30px)' }} />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: withAlpha(COLORS.gold, 0.10), border: `1px solid ${withAlpha(COLORS.gold, 0.25)}` }}
              >
                <Icon size={18} style={{ color: 'var(--gold)' }} />
              </div>
              <div>
                <div className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{active.category}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{active.items.length} skills</div>
              </div>
              <div className="ml-auto font-mono text-2xl font-black" style={{ color: 'var(--gold)' }}>
                {Math.round(active.items.reduce((s, i) => s + i.level, 0) / active.items.length)}%
              </div>
            </div>
            <div className="space-y-4 relative z-10">
              {active.items.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} color={active.color} index={i} />
              ))}
            </div>
          </div>

          {/* Right panel: summary + badges */}
          <div className="flex flex-col gap-4">
            {/* Visual summary card */}
            <div
              className="flex-1 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${withAlpha(COLORS.gold, 0.10)}, var(--bg-surface))`,
                border:     `1px solid ${withAlpha(COLORS.gold, 0.18)}`,
              }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-25 blur-2xl pointer-events-none"
                style={{ background: 'var(--gold)' }} />
              <div className="absolute -left-6 bottom-0 w-28 h-28 rounded-full opacity-10 blur-xl pointer-events-none"
                style={{ background: 'var(--gold-muted)' }} />

              <div className="relative z-10">
                <div className="font-mono text-xs tracking-widest mb-2" style={{ color: withAlpha(COLORS.gold, 0.7) }}>
                  {active.category.toLowerCase().replace(' & ', '_').replace(/ /g, '_')}
                </div>
                <h3 className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>
                  {active.items.length} Skills
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>across {active.category}</p>
              </div>

              {/* Mini bar chart */}
              <div className="flex items-end gap-1 h-12 relative z-10 mt-4">
                {active.items.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="flex-1 rounded-sm"
                    style={{ background: `linear-gradient(180deg, ${withAlpha(COLORS.gold, 0.7)}, ${withAlpha(COLORS.gold, 0.25)})` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(skill.level / 100) * 48}px` }}
                    transition={{ delay: i * 0.03, duration: 0.4, ease: 'easeOut' }}
                    title={`${skill.name}: ${skill.level}%`}
                  />
                ))}
              </div>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {active.items.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs cursor-default"
                  style={{
                    background: withAlpha(COLORS.gold, 0.08),
                    border:     `1px solid ${withAlpha(COLORS.gold, 0.22)}`,
                    color:      'var(--gold)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 16px ${withAlpha(COLORS.gold, 0.25)}`; e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.45); }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.22); }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
