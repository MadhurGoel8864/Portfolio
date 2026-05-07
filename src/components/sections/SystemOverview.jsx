import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { DEVDUAL } from '../../constants/global';

export function SystemOverview() {
  return (
    <section id="system-overview" style={{ position: 'relative', zIndex: 10, padding: '100px 5vw', maxWidth: 1280, margin: '0 auto' }}>
      <SectionTitle label="DevDual" title={<>System <span className="gold">Overview</span></>} subtitle="Real-time competitive coding platform with auction-based problem allocation" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'start' }} className="devdual-grid-responsive">
        <div>
          {[
            { head: 'Problem Statement', items: DEVDUAL.problemStatement },
            { head: 'Core Mechanic', items: DEVDUAL.coreMechanic },
            { head: 'Strategy', items: DEVDUAL.theStrategy },
          ].map(({ head, items }) => (
            <div key={head}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 10, marginTop: 20 }}>{head}</div>
              <ul style={{ listStyle: 'none' }}>
                {items.map((item, i) => (
                  <li key={i} style={{ fontSize: 13, color: 'var(--text-2)', display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8, lineHeight: 1.6, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(200,169,81,0.5)', flexShrink: 0, marginTop: 7, display: 'inline-block' }} />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <a className="btn-primary" href={DEVDUAL.url} target="_blank" rel="noopener noreferrer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              View Live Demo
            </a>
            <a className="btn-ghost" href={DEVDUAL.apiDocs} target="_blank" rel="noopener noreferrer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Explore API (Swagger)
            </a>
          </div>
        </div>

        <div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 16, right: 16,
              fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: '#3ddc84', border: '1px solid rgba(61,220,132,0.25)',
              background: 'rgba(61,220,132,0.10)', padding: '4px 10px', borderRadius: 99,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ddc84', animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
              Live on GCP
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(200,169,81,0.7)', marginBottom: 20 }}>System Facts</div>
            {DEVDUAL.stats.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(200,169,81,0.07)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', minWidth: 100 }}>{label}</span>
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 12, color: label === 'Performance' ? '#3ddc84' : 'var(--text)', fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
