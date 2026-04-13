import { motion } from 'framer-motion';
import { Globe, Radio, Settings, Database, Cpu, Play } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { GlowCard } from '../ui/GlowCard';
import { ARCHITECTURE } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const LAYER_ICONS = [Globe, Radio, Settings, Database, Cpu, Play];

export function Architecture() {
  return (
    <SectionWrapper id="architecture">
      <SectionTitle
        label="Architecture"
        title="Architecture Breakdown"
        subtitle="Modular Monolithic backend with modular internal structure — one domain, one router, one service, one DAO."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ARCHITECTURE.map((layer, i) => {
          const Icon = LAYER_ICONS[i];
          return (
            <motion.div key={layer.name} variants={itemVariants}>
              <GlowCard className="p-5 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: withAlpha(COLORS.gold, 0.08), border: `1px solid ${withAlpha(COLORS.gold, 0.22)}` }}
                  >
                    <Icon size={16} style={{ color: 'var(--gold)' }} />
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{layer.name}</div>
                    <div
                      className="text-[10px] font-mono mt-0.5 px-1.5 py-0.5 rounded-md inline-block"
                      style={{ background: withAlpha(COLORS.gold, 0.07), color: 'var(--gold)', border: `1px solid ${withAlpha(COLORS.gold, 0.16)}` }}
                    >
                      {layer.tech}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {layer.description}
                </p>

                {/* Points */}
                <ul className="space-y-2 mt-auto">
                  {layer.points.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + j * 0.04 }}
                      className="flex items-start gap-2 text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>

      {/* Architecture flow diagram — text-based */}
      <motion.div
        variants={itemVariants}
        className="mt-10 p-6 rounded-2xl font-mono text-xs overflow-x-auto"
        style={{ background: 'var(--bg-deeper)', border: `1px solid ${withAlpha(COLORS.gold, 0.12)}` }}
      >
        <div className="mb-2 text-[10px] tracking-widest uppercase" style={{ color: withAlpha(COLORS.gold, 0.6) }}>Request Flow</div>
        <div className="flex flex-wrap items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          {['Client', 'FastAPI Router', 'Service Layer', 'DAO', 'PostgreSQL'].map((node, i, arr) => (
            <span key={node} className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-md" style={{ background: withAlpha(COLORS.gold, 0.08), color: 'var(--gold)', border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}>
                {node}
              </span>
              {i < arr.length - 1 && <span style={{ color: withAlpha(COLORS.gold, 0.4) }}>→</span>}
            </span>
          ))}
          <span style={{ color: withAlpha(COLORS.gold, 0.4) }}>|</span>
          <span className="px-2 py-1 rounded-md" style={{ background: withAlpha(COLORS.gold, 0.08), color: 'var(--gold)', border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}>Redis</span>
          <span style={{ color: withAlpha(COLORS.gold, 0.4) }}>|</span>
          <span className="px-2 py-1 rounded-md" style={{ background: withAlpha(COLORS.gold, 0.08), color: 'var(--gold)', border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}>WebSocket</span>
          <span style={{ color: withAlpha(COLORS.gold, 0.4) }}>→</span>
          <span className="px-2 py-1 rounded-md" style={{ background: withAlpha(COLORS.gold, 0.08), color: 'var(--gold)', border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}>Judge0</span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
