import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { SKILLS } from '../../constants/global';

function SkillBar({ name, level, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>
          {name}
        </span>
        <span className="font-mono text-xs transition-colors" style={{ color: 'var(--text-muted)' }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.05, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SKILLS[activeIdx];

  return (
    <SectionWrapper id="skills">
      <SectionTitle
        label="Skills"
        title="Tech Stack"
        subtitle="Tools and technologies I use to build fast, scalable, and intelligent products."
      />

      {/* Category tabs */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-10">
        {SKILLS.map((group, i) => (
          <motion.button
            key={group.category}
            onClick={() => setActiveIdx(i)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
            style={activeIdx === i ? {
              background:  `${group.color}15`,
              border:      `1px solid ${group.color}40`,
              color:        group.color,
              boxShadow:   `0 0 20px ${group.color}18`,
            } : {
              background:  'var(--border-subtle)',
              border:      '1px solid var(--border-medium)',
              color:       'var(--text-secondary)',
            }}
          >
            {group.category}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Skill bars panel */}
          <div className="rounded-2xl p-6 space-y-4"
            style={{
              background:  'var(--bg-surface)',
              border:      `1px solid ${active.color}20`,
              boxShadow:   `0 0 40px ${active.color}06`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${active.color}40, transparent)` }} />
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{active.category}</span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${active.color}40, transparent)` }} />
            </div>
            <div className="space-y-4">
              {active.items.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} color={active.color} index={i} />
              ))}
            </div>
          </div>

          {/* Summary cards */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-2xl p-6 flex flex-col justify-between min-h-[180px] relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${active.color}12, var(--bg-surface))`,
                border:     `1px solid ${active.color}20`,
              }}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20 blur-2xl"
                style={{ background: active.color }} />
              <div>
                <div className="font-mono text-xs tracking-widest mb-2" style={{ color: active.color }}>
                  // {active.category.toLowerCase().replace(' / ', '_').replace(/ /g, '_')}
                </div>
                <h3 className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>
                  {active.items.length} Skills
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>across {active.category}</p>
              </div>
              <div>
                <div className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Average proficiency</div>
                <div className="text-3xl font-black" style={{ color: active.color }}>
                  {Math.round(active.items.reduce((s, i) => s + i.level, 0) / active.items.length)}%
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {active.items.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs cursor-default transition-all duration-200"
                  style={{
                    background: `${active.color}10`,
                    border:     `1px solid ${active.color}25`,
                    color:       active.color,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 14px ${active.color}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Summary strip */}
      <motion.div variants={itemVariants} className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SKILLS.map(group => (
          <div key={group.category} className="rounded-xl p-3 text-center transition-all duration-200"
            style={{ background: 'var(--border-subtle)', border: '1px solid var(--border-medium)' }}>
            <div className="text-xl font-black mb-0.5" style={{ color: group.color }}>{group.items.length}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{group.category}</div>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
