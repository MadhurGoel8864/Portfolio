import { motion } from 'framer-motion';
import { Globe, Radio, Settings, Database, Cpu, Play } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ARCHITECTURE } from '../../constants/global';

const LAYER_ICONS = [Globe, Radio, Settings, Database, Cpu, Play];

export function Architecture() {
  return (
    <section id="architecture" style={{ position: 'relative', zIndex: 10, padding: '100px 5vw', maxWidth: 1280, margin: '0 auto' }}>
      <SectionTitle label="Architecture" title="Architecture Breakdown" subtitle="Modular Monolithic backend — one domain, one router, one service, one DAO." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="arch-grid-responsive">
        {ARCHITECTURE.map((layer, i) => {
          const Icon = LAYER_ICONS[i];
          return (
            <motion.div key={layer.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontFamily: 'var(--syne)', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{layer.name}</div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)', background: 'var(--gold-dim)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 4, marginTop: 4, display: 'inline-block' }}>{layer.tech}</span>
                </div>
                <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 11, color: 'var(--muted)', lineHeight: 1.75, margin: '12px 0' }}>{layer.description}</p>
                <ul style={{ listStyle: 'none', marginTop: 'auto' }}>
                  {layer.points.map((p, j) => (
                    <li key={j} style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', display: 'flex', gap: 8, marginBottom: 6, lineHeight: 1.5 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Request flow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ marginTop: 32, padding: '20px 24px', borderRadius: 14, background: 'var(--bg2)', border: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: 11, overflowX: 'auto' }}>
        <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(200,169,81,0.6)', marginBottom: 12 }}>Request Flow</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          {['Client', 'FastAPI Router', 'Service Layer', 'DAO', 'PostgreSQL'].map((node, i, arr) => (
            <span key={node} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ padding: '5px 12px', borderRadius: 6, background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--border-md)', whiteSpace: 'nowrap' }}>{node}</span>
              {i < arr.length - 1 && <span style={{ color: 'rgba(200,169,81,0.35)', fontSize: 14 }}>→</span>}
            </span>
          ))}
          <span style={{ color: 'rgba(200,169,81,0.25)', margin: '0 4px' }}>|</span>
          <span style={{ padding: '5px 12px', borderRadius: 6, background: 'rgba(61,220,132,0.08)', color: '#3ddc84', border: '1px solid rgba(61,220,132,0.25)', whiteSpace: 'nowrap' }}>Redis</span>
          <span style={{ color: 'rgba(200,169,81,0.25)', margin: '0 4px' }}>|</span>
          <span style={{ padding: '5px 12px', borderRadius: 6, background: 'rgba(129,140,248,0.08)', color: 'var(--indigo)', border: '1px solid rgba(129,140,248,0.22)', whiteSpace: 'nowrap' }}>WebSocket</span>
          <span style={{ color: 'rgba(200,169,81,0.35)', fontSize: 14 }}>→</span>
          <span style={{ padding: '5px 12px', borderRadius: 6, background: 'rgba(248,113,113,0.08)', color: 'var(--red)', border: '1px solid rgba(248,113,113,0.22)', whiteSpace: 'nowrap' }}>Judge0</span>
        </div>
      </motion.div>
    </section>
  );
}
