import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { PERSONAL, EDUCATION, EXPERIENCE, SOCIAL } from '../../constants/global';

export function About() {
  return (
    <section id="about" style={{ position: 'relative', zIndex: 10, padding: '100px 5vw', maxWidth: 1280, margin: '0 auto' }}>
      <SectionTitle label="Background" title="About Me" subtitle={null} />

      <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.8, maxWidth: 680, marginBottom: 24 }}>
        {PERSONAL.bio}
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {PERSONAL.location}
        </span>
        <a className="btn-primary" href={SOCIAL.resumeLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, padding: '8px 16px' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Resume
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="about-grid-responsive">
        {/* Education */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gold-dim)', border: '1px solid var(--border-md)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>Education</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {EDUCATION.map((edu, i) => (
              <motion.div key={i} className="card card-glow-gold"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--syne)', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{edu.degree}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', marginBottom: 3 }}>{edu.school}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 12 }}>{edu.affiliation} · {edu.duration}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {edu.highlights.map(h => <span key={h} className="chip chip-gold">{h}</span>)}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--syne)', fontSize: 20, fontWeight: 800, color: 'var(--gold)', flexShrink: 0 }}>{edu.gpa.split(' ')[0]}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.22)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>Work Experience</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {EXPERIENCE.map((exp, i) => (
              <motion.div key={exp.id}
                className="card card-glow-indigo"
                style={{ borderTop: `2px solid ${exp.current ? 'var(--indigo)' : 'rgba(129,140,248,0.4)'}` }}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                  <div>
                    <span className="chip chip-indigo" style={{ marginBottom: 6, display: 'inline-block' }}>
                      {exp.type}{exp.current ? ' · Current' : ''}
                    </span>
                    <div style={{ fontFamily: 'var(--syne)', fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '6px 0 2px' }}>{exp.role}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--indigo)', marginBottom: 4 }}>{exp.company}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--indigo)' }}>{exp.duration}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{exp.location}</div>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: 12 }}>
                  {exp.responsibilities.slice(0, 3).map((r, j) => (
                    <li key={j} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 12, color: 'var(--text-2)', padding: '3px 0', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--indigo)', flexShrink: 0, marginTop: 1, fontSize: 10 }}>▸</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  {exp.techStack.map(t => <span key={t} className="chip chip-indigo">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
