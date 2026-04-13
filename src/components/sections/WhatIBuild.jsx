import { motion } from 'framer-motion';
import { Zap, Layers, Database, Shield, GitBranch, Terminal, Activity, Workflow } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { GlowCard } from '../ui/GlowCard';
import { CAPABILITIES } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const ICONS = [Zap, Layers, Database, Shield, GitBranch, Terminal, Activity, Workflow];

export function WhatIBuild() {
  return (
    <SectionWrapper id="what-i-build" alt>
      <SectionTitle
        label="Capabilities"
        title="What I Build"
        subtitle="Not feature lists — engineering capabilities. Each one with tradeoffs considered."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAPABILITIES.map((cap, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div key={i} variants={itemVariants}>
              <GlowCard className="p-5 h-full flex flex-col">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: withAlpha(COLORS.gold, 0.08), border: `1px solid ${withAlpha(COLORS.gold, 0.20)}` }}
                >
                  <Icon size={16} style={{ color: 'var(--gold)' }} />
                </div>

                <h3 className="font-bold text-sm leading-snug mb-2" style={{ color: 'var(--text-primary)' }}>
                  {cap.title}
                </h3>

                <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {cap.detail}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {cap.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                      style={{ background: withAlpha(COLORS.gold, 0.07), color: 'var(--gold)', border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
