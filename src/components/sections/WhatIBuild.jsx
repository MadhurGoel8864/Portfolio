import { motion } from 'framer-motion';
import { Zap, Layers, Database, Shield, GitBranch, Terminal, Activity, Workflow } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { CAPABILITIES } from '../../constants/global';

const ICONS = [Zap, Layers, Database, Shield, GitBranch, Terminal, Activity, Workflow];

export function WhatIBuild() {
  return (
    <section id="what-i-build" style={{ position: 'relative', zIndex: 10, padding: '100px 5vw', maxWidth: 1280, margin: '0 auto' }}>
      {/* FIX #16: tagline wording update */}
      <SectionTitle label="Capabilities" title={<>What I <span className="gold">Build</span></>} subtitle="Not feature lists — engineering capabilities. Each one with deliberate tradeoffs." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="cap-grid-responsive">
        {CAPABILITIES.map((cap, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(200,169,81,0.07)', border: '1px solid var(--border-md)', marginBottom: 14 }}>
                  <Icon size={16} style={{ color: 'var(--gold)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--syne)', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>{cap.title}</h3>
                <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 12, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 14, flex: 1 }}>{cap.detail}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {cap.tags.map(t => <span key={t} className="chip chip-gold">{t}</span>)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
