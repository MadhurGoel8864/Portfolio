import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ACHIEVEMENTS } from '../../constants/global';

function AchievementCard({ ach, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="card"
      style={{
        borderTop: `2px solid ${ach.color}66`,
        display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.25), 0 0 40px ${ach.color}14` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all 0.25s',
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, marginBottom: 12,
        background: `${ach.color}14`, border: `1px solid ${ach.color}33`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        transform: hovered ? 'scale(1.12) rotate(-4deg)' : 'none',
        boxShadow: hovered ? `0 0 18px ${ach.color}38` : 'none',
      }}>
        {ach.emoji}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, color: `${ach.color}bb` }}>{ach.category}</div>
      <h3 style={{ fontFamily: 'var(--syne)', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>{ach.title}</h3>
      <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 11, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 14, flex: 1 }}>{ach.description}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: '3px 8px', borderRadius: 4, color: ach.color, background: `${ach.color}14`, border: `1px solid ${ach.color}33` }}>{ach.year}</span>
        {ach.link && (
          <a href={ach.link} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: ach.color, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
            View <ExternalLink size={10} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" style={{ position: 'relative', zIndex: 10, padding: '100px 5vw', maxWidth: 1280, margin: '0 auto' }}>
      <SectionTitle label="Recognition" title="Achievements" subtitle="Competitive programming, research, and professional milestones." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="ach-grid-responsive">
        {ACHIEVEMENTS.map((ach, i) => <AchievementCard key={ach.id} ach={ach} index={i} />)}
      </div>
    </section>
  );
}
