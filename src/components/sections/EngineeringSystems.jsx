import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { GlowCard } from '../ui/GlowCard';
import { ENGINEERING_SYSTEMS, REALTIME_DESIGN, CACHING } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';
import { ChevronDown, Radio, Database } from 'lucide-react';

// ─────────────────────────────────────────────
//  Subsystem accordion
// ─────────────────────────────────────────────
function SubsystemCard({ sys, isOpen, onToggle }) {
  return (
    <motion.div
      whileHover={{ 
        y: isOpen ? 0 : -3,
        backgroundColor: isOpen ? withAlpha(COLORS.gold, 0.05) : withAlpha(COLORS.gold, 0.015),
        borderColor: isOpen ? withAlpha(COLORS.gold, 0.40) : withAlpha(COLORS.gold, 0.15)
      }}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: isOpen ? withAlpha(COLORS.gold, 0.03) : 'var(--bg-surface)',
        borderColor: isOpen ? withAlpha(COLORS.gold, 0.30) : 'var(--border-subtle)',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: isOpen ? `0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px ${withAlpha(COLORS.gold, 0.12)}` : 'none',
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-4 text-left cursor-pointer"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 transition-all"
          style={{
            background: isOpen ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})` : withAlpha(COLORS.gold, 0.08),
            color:      isOpen ? COLORS.bgBase : 'var(--gold)',
            border:     isOpen ? 'none' : `1px solid ${withAlpha(COLORS.gold, 0.22)}`,
          }}
        >
          {sys.label}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm" style={{ color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            {sys.name}
          </div>
          {!isOpen && (
            <div className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{sys.what}</div>
          )}
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
      </button>

      {/* Body — animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5" style={{ borderTop: `1px solid ${withAlpha(COLORS.gold, 0.10)}` }}>
              <p className="text-sm leading-relaxed pt-4" style={{ color: 'var(--text-secondary)' }}>{sys.what}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Challenges */}
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: withAlpha(COLORS.gold, 0.6) }}>
                    Challenges
                  </div>
                  <ul className="space-y-2">
                    {sys.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: withAlpha(COLORS.gold, 0.6) }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Implementation */}
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: withAlpha(COLORS.gold, 0.6) }}>
                    Implementation
                  </div>
                  <ul className="space-y-2">
                    {sys.implementation.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decision */}
              <div
                className="p-4 rounded-xl text-xs leading-relaxed"
                style={{ background: withAlpha(COLORS.gold, 0.05), border: `1px solid ${withAlpha(COLORS.gold, 0.15)}` }}
              >
                <span className="font-mono font-bold mr-2" style={{ color: 'var(--gold)' }}>Decision:</span>
                <span style={{ color: 'var(--text-secondary)' }}>{sys.decision}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  Real-time subsection
// ─────────────────────────────────────────────
function RealtimeBlock() {
  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: withAlpha(COLORS.gold, 0.08), border: `1px solid ${withAlpha(COLORS.gold, 0.22)}` }}>
          <Radio size={16} style={{ color: 'var(--gold)' }} />
        </div>
        <div>
          <div className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Real-Time System Design</div>
          <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>WebSocket architecture — the core differentiator</div>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
        {REALTIME_DESIGN.overview}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {REALTIME_DESIGN.components.map((c, i) => (
          <GlowCard key={i} className="p-4">
            <div className="font-semibold text-sm mb-1" style={{ color: 'var(--gold)' }}>{c.name}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{c.description}</p>
          </GlowCard>
        ))}
      </div>

      {/* Concurrency */}
      <div className="p-4 rounded-xl mb-6" style={{ background: withAlpha(COLORS.gold, 0.05), border: `1px solid ${withAlpha(COLORS.gold, 0.15)}` }}>
        <div className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: withAlpha(COLORS.gold, 0.7) }}>Concurrency Approach</div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{REALTIME_DESIGN.concurrency}</p>
      </div>

      {/* Known limitations */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Known Limitations</div>
          <ul className="space-y-2">
            {REALTIME_DESIGN.limitations.map((l, i) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: withAlpha(COLORS.gold, 0.4) }} />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Caching subsection
// ─────────────────────────────────────────────
function CachingBlock() {
  return (
    <div className="mt-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: withAlpha(COLORS.gold, 0.08), border: `1px solid ${withAlpha(COLORS.gold, 0.22)}` }}>
          <Database size={16} style={{ color: 'var(--gold)' }} />
        </div>
        <div>
          <div className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Caching & State Strategy</div>
          <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>Six Redis use cases — each solving correctness, not just speed</div>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
        {CACHING.overview}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr>
              {['Use Case', 'Structure', 'TTL', 'Why Redis — not DB'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-mono tracking-wider"
                  style={{ color: withAlpha(COLORS.gold, 0.7), background: withAlpha(COLORS.gold, 0.06), borderBottom: `1px solid ${withAlpha(COLORS.gold, 0.15)}` }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CACHING.useCases.map((u, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${withAlpha(COLORS.gold, 0.07)}` }}
                onMouseEnter={e => { Array.from(e.currentTarget.cells).forEach(c => { c.style.background = withAlpha(COLORS.gold, 0.04); }); }}
                onMouseLeave={e => { Array.from(e.currentTarget.cells).forEach(c => { c.style.background = 'transparent'; }); }}>
                <td className="px-4 py-3 font-semibold" style={{ color: 'var(--gold)' }}>{u.key}</td>
                <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-muted)' }}>{u.structure}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{u.ttl}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{u.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────
export function EngineeringSystems() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <SectionWrapper id="engineering-systems" alt>
      <SectionTitle
        label="Engineering"
        title="Key Engineering Systems"
        subtitle="DevDual broken down by subsystem — what each does, why it's non-trivial, and what tradeoffs were made."
      />

      <motion.div variants={itemVariants} className="space-y-3">
        {ENGINEERING_SYSTEMS.map((sys, i) => (
          <SubsystemCard
            key={sys.id}
            sys={sys}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
          />
        ))}
      </motion.div>

    </SectionWrapper>
  );
}
