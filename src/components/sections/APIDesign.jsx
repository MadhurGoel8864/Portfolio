import { motion } from 'framer-motion';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { GlowCard } from '../ui/GlowCard';
import { CHALLENGES, API_DESIGN, WHAT_NEXT } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';
import { AlertCircle, CheckCircle, ArrowRight, ExternalLink, FileText, ArrowUpRight } from 'lucide-react';

// ─────────────────────────────────────────────
//  Challenge card
// ─────────────────────────────────────────────
function ChallengeCard({ ch, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.28 }}
    >
      <GlowCard className="p-6 h-full">
        {/* Top accent line */}
        <div className="h-[1px] w-full -mt-6 -mx-6 mb-5" style={{ width: 'calc(100% + 48px)', background: `linear-gradient(90deg, transparent, ${withAlpha(COLORS.gold, 0.50)}, transparent)` }} />

        <h3 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>{ch.title}</h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle size={11} style={{ color: withAlpha(COLORS.gold, 0.6) }} />
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: withAlpha(COLORS.gold, 0.7) }}>Problem</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ch.problem}</p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <CheckCircle size={11} style={{ color: COLORS.success }} />
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: COLORS.success }}>Solution</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ch.solution}</p>
          </div>

          <div className="p-3 rounded-lg" style={{ background: withAlpha(COLORS.gold, 0.04), border: `1px solid ${withAlpha(COLORS.gold, 0.12)}` }}>
            <span className="font-mono text-[10px] tracking-widest uppercase mr-1.5" style={{ color: withAlpha(COLORS.gold, 0.7) }}>Tradeoff:</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{ch.tradeoff}</span>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase mr-1.5" style={{ color: 'var(--text-muted)' }}>→ Improvement:</span>
            <span className="text-xs italic" style={{ color: 'var(--text-muted)' }}>{ch.improvement}</span>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  Priority badge color
// ─────────────────────────────────────────────
const PRIORITY_COLOR = {
  High:   COLORS.gold,
  Medium: COLORS.goldMuted,
  Low:    COLORS.goldDim,
};

// ─────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────
export function APIDesign() {
  return (
    <SectionWrapper id="api-design">

      {/* ── Challenges ────────────────────────────────────── */}
      <SectionTitle
        label="Tradeoffs"
        title="Challenges & Decisions"
        subtitle="Three real engineering problems encountered during DevDual's development — what went wrong, how it was resolved, and what the tradeoff was."
      />

      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-5 mb-20">
        {CHALLENGES.map((ch, i) => <ChallengeCard key={ch.id} ch={ch} index={i} />)}
      </motion.div>

      {/* ── API Design ────────────────────────────────────── */}
      <SectionTitle
        label="API"
        title="API Design"
        subtitle={null}
        align="left"
      />

      <motion.div variants={itemVariants} className="grid lg:grid-cols-[1fr_1.2fr] gap-10 mb-20">
        {/* Module table */}
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: withAlpha(COLORS.gold, 0.7) }}>Route Modules</div>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${withAlpha(COLORS.gold, 0.12)}` }}>
            {API_DESIGN.modules.map((m, i) => (
              <div key={m.path}
                className="flex items-start gap-3 px-4 py-3 transition-colors"
                style={{ borderBottom: i < API_DESIGN.modules.length - 1 ? `1px solid ${withAlpha(COLORS.gold, 0.07)}` : 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background = withAlpha(COLORS.gold, 0.04); }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="font-mono text-xs font-semibold flex-shrink-0" style={{ color: 'var(--gold)' }}>{m.path}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{m.description}</span>
              </div>
            ))}
          </div>

          <a href={API_DESIGN.docsUrl} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-75 transition-opacity"
            style={{ color: 'var(--gold)' }}>
            <FileText size={14} /> View Full API Docs <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Design decisions */}
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: withAlpha(COLORS.gold, 0.7) }}>Design Decisions</div>
          <div className="space-y-3">
            {API_DESIGN.decisions.map((d, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 p-3 rounded-xl text-xs leading-relaxed"
                style={{ background: withAlpha(COLORS.gold, 0.04), border: `1px solid ${withAlpha(COLORS.gold, 0.10)}` }}
              >
                <ArrowRight size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── What I Would Do Next ───────────────────────────── */}
      <SectionTitle
        label="Roadmap"
        title="What I Would Do Next"
        subtitle="Engineering improvements I'd prioritize — ordered by impact."
        align="left"
      />

      <motion.div variants={itemVariants} className="space-y-3">
        {WHAT_NEXT.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-start gap-4 p-4 rounded-xl transition-colors group"
            style={{ background: 'var(--bg-surface)', border: `1px solid var(--border-subtle)` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.22); }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
          >
            <span
              className="mt-0.5 text-[10px] font-mono px-2 py-0.5 rounded-md flex-shrink-0"
              style={{
                background: withAlpha(PRIORITY_COLOR[item.priority] || COLORS.gold, 0.10),
                color:      PRIORITY_COLOR[item.priority] || COLORS.gold,
                border:     `1px solid ${withAlpha(PRIORITY_COLOR[item.priority] || COLORS.gold, 0.25)}`,
              }}
            >
              {item.priority}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm mb-1 group-hover:text-white transition-colors" style={{ color: 'var(--text-primary)' }}>
                {item.item}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.detail}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
