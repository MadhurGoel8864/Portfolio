import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { ENGINEERING_SYSTEMS, REALTIME_DESIGN, CACHING } from '../../constants/global';
import { ChevronDown } from 'lucide-react';

function SectionDivider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '60px 0 40px' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 99, whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  );
}

function SubsystemCard({ sys, isOpen, onToggle }) {
  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      background: isOpen ? 'rgba(200,169,81,0.03)' : 'var(--surface)',
      border: `1px solid ${isOpen ? 'rgba(200,169,81,0.30)' : 'var(--border)'}`,
      boxShadow: isOpen ? '0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(200,169,81,0.12)' : 'none',
      transition: 'all 0.3s',
    }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', textAlign: 'left', background: 'transparent', border: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13, flexShrink: 0,
          background: isOpen ? 'linear-gradient(135deg, var(--gold), var(--gold-muted))' : 'var(--gold-dim)',
          color: isOpen ? '#0e0d0b' : 'var(--gold)',
          border: isOpen ? 'none' : '1px solid var(--border-md)',
          transition: 'all 0.2s',
        }}>{sys.label}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--syne)', fontSize: 14, fontWeight: 600, color: isOpen ? 'var(--text)' : 'var(--text-2)' }}>{sys.name}</div>
          {!isOpen && <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{sys.what}</div>}
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} style={{ color: 'var(--muted)' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(200,169,81,0.10)' }}>
              <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 16, paddingTop: 16 }}>{sys.what}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, margin: '16px 0' }} className="eng-two-col-responsive">
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(200,169,81,0.6)', marginBottom: 8 }}>Challenges</div>
                  <ul style={{ listStyle: 'none' }}>
                    {sys.challenges.map((c, i) => (
                      <li key={i} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 12, color: 'var(--text-2)', display: 'flex', gap: 8, marginBottom: 8, lineHeight: 1.5 }}>
                        <span style={{ color: 'rgba(200,169,81,0.5)', flexShrink: 0 }}>▸</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(200,169,81,0.6)', marginBottom: 8 }}>Implementation</div>
                  <ul style={{ listStyle: 'none' }}>
                    {sys.implementation.map((p, i) => (
                      <li key={i} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 12, color: 'var(--text-2)', display: 'flex', gap: 8, marginBottom: 8, lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0 }}>▸</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ background: 'rgba(200,169,81,0.05)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, fontSize: 12, lineHeight: 1.6 }}>
                <span style={{ color: 'var(--gold)', fontWeight: 700, fontFamily: 'var(--mono)', marginRight: 6 }}>Decision:</span>
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', color: 'var(--text-2)' }}>{sys.decision}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EngineeringSystems() {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <section id="engineering-systems" style={{ position: 'relative', zIndex: 10, padding: '100px 5vw', maxWidth: 1280, margin: '0 auto' }}>
      <SectionTitle label="Engineering" title="Key Engineering Systems" subtitle="DevDual broken down by subsystem — what each does, why it's non-trivial, and what tradeoffs were made." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ENGINEERING_SYSTEMS.map((sys, i) => (
          <SubsystemCard key={sys.id} sys={sys} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
        ))}
      </div>

      <SectionDivider label="Real-Time Design" />

      <div style={{ marginBottom: 6 }}>
        <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 16, maxWidth: 700 }}>{REALTIME_DESIGN.overview}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }} className="rt-grid-responsive">
          {REALTIME_DESIGN.components.map((c, i) => (
            <div key={i} className="card">
              <div style={{ fontFamily: 'var(--syne)', fontSize: 13, fontWeight: 700, color: 'var(--gold)', marginBottom: 6 }}>{c.name}</div>
              <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 11, color: 'var(--muted)', lineHeight: 1.7 }}>{c.description}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider label="Caching Strategy" />

      <div>
        <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 24, maxWidth: 700 }}>{CACHING.overview}</p>
        <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                {['Use Case', 'Structure', 'TTL', 'Why Redis — not DB'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontFamily: 'var(--mono)', color: 'rgba(200,169,81,0.7)', background: 'rgba(200,169,81,0.06)', borderBottom: '1px solid rgba(200,169,81,0.15)', fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CACHING.useCases.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(200,169,81,0.07)' }}
                  onMouseEnter={e => Array.from(e.currentTarget.cells).forEach(c => { c.style.background = 'rgba(200,169,81,0.03)'; })}
                  onMouseLeave={e => Array.from(e.currentTarget.cells).forEach(c => { c.style.background = 'transparent'; })}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--gold)' }}>{u.key}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: 11 }}>{u.structure}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{u.ttl}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', color: 'var(--text-2)' }}>{u.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
