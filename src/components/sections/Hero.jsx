import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { PERSONAL, SOCIAL, STATS } from '../../constants/global';

const ROLES = ['Backend Engineer', 'System Architect', 'API Designer', 'Real-time Specialist'];
const SKILLS = ['FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'SQLAlchemy', 'Judge0', 'GCP', 'Python', 'JWT / OAuth', 'System Design'];

const ORBIT_TAGS = [
  { label: 'FastAPI', ring: 0, angle: 30 * Math.PI / 180 },
  { label: 'Redis', ring: 0, angle: 150 * Math.PI / 180 },
  { label: 'WebSockets', ring: 0, angle: 270 * Math.PI / 180 },
  { label: 'PostgreSQL', ring: 1, angle: 60 * Math.PI / 180 },
  { label: 'Judge0', ring: 1, angle: 180 * Math.PI / 180 },
  { label: 'GCP', ring: 1, angle: 300 * Math.PI / 180 },
];

function useTypewriter(roles) {
  const [displayText, setDisplayText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIdx];
    let timeout;
    if (!isDeleting && displayText === role) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIdx(i => (i + 1) % roles.length);
    } else {
      const speed = isDeleting ? 32 : 65;
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : role.slice(0, prev.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIdx, roles]);

  return displayText;
}

function useCountUp(target, duration = 1200, start = false) {
  const [value, setValue] = useState('0');
  const raf = useRef(null);
  useEffect(() => {
    if (!start) return;
    const raw = target.replace(/[^0-9.]/g, '');
    const suffix = target.replace(/[0-9.]/g, '');
    const num = parseFloat(raw);
    if (isNaN(num)) { setValue(target); return; }
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(e * num) + suffix);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start]);
  return value;
}

function StatItem({ stat }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const display = useCountUp(stat.value, 1200, started);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); o.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, color: 'var(--gold)', display: 'block' }}>
        {started ? display : '—'}
      </span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3, display: 'block' }}>
        {stat.label}
      </span>
    </div>
  );
}

function OrbitSystem() {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const tagRefs = useRef([]);
  const anglesRef = useRef(ORBIT_TAGS.map(t => t.angle));
  const rafRef = useRef(null);
  const SPEEDS = [0.00055, -0.00038];
  const RADII = [0.84 / 2, 1.08 / 2];

  useEffect(() => {
    let last = performance.now();
    const animate = (now) => {
      const dt = now - last; last = now;
      anglesRef.current = anglesRef.current.map((a, i) => {
        const tag = ORBIT_TAGS[i];
        return a + SPEEDS[tag.ring] * dt;
      });
      const container = containerRef.current;
      if (!container) return;
      const size = container.offsetWidth;
      tagRefs.current.forEach((el, i) => {
        if (!el) return;
        const tag = ORBIT_TAGS[i];
        const r = RADII[tag.ring] * size;
        const a = anglesRef.current[i];
        const cx = size / 2 + Math.cos(a) * r;
        const cy = size / 2 + Math.sin(a) * r;
        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
        el.style.transform = 'translate(-50%, -50%)';
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Magnetic photo effect
    const onMove = (e) => {
      const photo = photoRef.current;
      if (!photo) return;
      const rect = photo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const pull = (200 - dist) / 200;
        photo.style.transform = `translate(-50%, -50%) translate(${dx * pull * 0.1}px, ${dy * pull * 0.1}px)`;
      } else {
        photo.style.transform = 'translate(-50%, -50%)';
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const orbitSize = 'clamp(280px, 28vw, 420px)';

  return (
    <div ref={containerRef} style={{
      position: 'relative',
      width: orbitSize, height: orbitSize,
      margin: 'auto',
    }}>
      {/* Orbit rings */}
      {[
        { size: '84%', duration: '18s', direction: 'normal', border: '1px solid rgba(200,169,81,0.09)' },
        { size: '108%', duration: '28s', direction: 'reverse', border: '1px solid rgba(200,169,81,0.09)' },
        { size: '130%', duration: '44s', direction: 'normal', border: '1px dashed rgba(200,169,81,0.05)' },
      ].map((ring, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%',
          width: ring.size, height: ring.size,
          border: ring.border,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: `spin ${ring.duration} linear ${ring.direction} infinite`,
        }} />
      ))}

      {/* Profile photo */}
      <div ref={photoRef} style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(120px, 12vw, 175px)', height: 'clamp(120px, 12vw, 175px)',
        borderRadius: '50%', zIndex: 5, transition: 'transform 0.1s ease-out',
      }}>
        <div style={{
          position: 'absolute', inset: -18, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,169,81,0.22) 0%, transparent 70%)',
          animation: 'glowPulse 3s ease-in-out infinite', zIndex: -1,
        }} />
        <div style={{
          position: 'absolute', inset: -6, borderRadius: '50%',
          border: '1px solid rgba(200,169,81,0.28)',
          animation: 'spinRaw 8s linear infinite',
        }}>
          <div style={{
            position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)',
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)',
          }} />
        </div>
        <img
          src={PERSONAL.profileImage}
          alt={PERSONAL.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%',
            border: '2px solid rgba(200,169,81,0.4)', display: 'block',
          }}
        />
      </div>

      {/* Orbit tags */}
      {ORBIT_TAGS.map((tag, i) => (
        <div
          key={tag.label}
          ref={el => tagRefs.current[i] = el}
          style={{
            position: 'absolute',
            fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500,
            padding: '4px 10px', borderRadius: 4,
            background: 'rgba(14,13,11,0.88)', border: '1px solid var(--border-md)',
            color: 'var(--gold)', whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)', pointerEvents: 'none', zIndex: 10,
          }}
        >
          {tag.label}
        </div>
      ))}

      {/* Terminal card 1 */}
      <div style={{
        position: 'absolute', bottom: '-4%', right: '-10%',
        width: 'clamp(160px, 15vw, 220px)',
        background: 'rgba(14,13,11,0.92)', border: '1px solid rgba(200,169,81,0.2)',
        borderRadius: 10, padding: 14, backdropFilter: 'blur(12px)',
        fontFamily: 'var(--mono)', fontSize: 10, zIndex: 10,
        animation: 'floatA 4s ease-in-out infinite',
      }}>
        <div style={{ color: 'var(--muted)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>// system.status</div>
        {[
          { k: 'role', v: 'backend_eng', vc: '#C8A951' },
          { k: 'status', v: '● available', vc: '#3ddc84' },
          { k: 'p99_latency', v: '<50ms', vc: '#3ddc84' },
          { k: 'stack', v: 'FastAPI+PG', vc: 'var(--text)' },
        ].map(r => (
          <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginBottom: 5 }}>
            <span style={{ color: 'var(--muted)' }}>{r.k}</span>
            <span style={{ color: r.vc, fontWeight: 500 }}>{r.v}</span>
          </div>
        ))}
      </div>

      {/* Terminal card 2 */}
      <div style={{
        position: 'absolute', top: '-2%', left: '-10%',
        width: 'clamp(140px, 13vw, 195px)',
        background: 'rgba(14,13,11,0.92)', border: '1px solid rgba(129,140,248,0.22)',
        borderRadius: 10, padding: 14, backdropFilter: 'blur(12px)',
        fontFamily: 'var(--mono)', fontSize: 10, zIndex: 10,
        animation: 'floatB 5s ease-in-out infinite',
      }}>
        <div style={{ color: 'var(--muted)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>// last_deploy</div>
        {[
          { k: 'project', v: 'DevDual', vc: '#C8A951' },
          { k: 'branch', v: 'main ✓', vc: '#818cf8' },
          { k: 'infra', v: 'GCP live', vc: '#3ddc84' },
        ].map(r => (
          <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginBottom: 5 }}>
            <span style={{ color: 'var(--muted)' }}>{r.k}</span>
            <span style={{ color: r.vc, fontWeight: 500 }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const roleText = useTypewriter(ROLES);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => setUptime(Math.floor((Date.now() - t0) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
  const child = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } } };

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'grid',
      gridTemplateColumns: '1.15fr 1fr', alignItems: 'center', gap: '4vw',
      paddingTop: 100, paddingBottom: 60,
      maxWidth: 1280, margin: '0 auto',
      paddingLeft: '5vw', paddingRight: '5vw',
    }}
      className="hero-section-grid"
    >
      {/* LEFT */}
      <motion.div variants={container} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* API badge */}
        <motion.div variants={child} style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18,
        }}>
          <span style={{ color: '#3ddc84', fontWeight: 700 }}>GET</span>
          <span style={{ color: 'var(--gold)' }}>/api/engineer/madhur-goel</span>
          <span style={{ color: '#3ddc84' }}>200 OK</span>
        </motion.div>

        {/* Status pill */}
        <motion.div variants={child}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 99,
            background: 'rgba(61,220,132,0.10)', border: '1px solid rgba(61,220,132,0.25)',
            color: '#3ddc84', fontFamily: 'var(--mono)', fontSize: 11,
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ddc84', boxShadow: '0 0 6px #3ddc84', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            Open to backend engineering roles
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={child}>
          <span style={{ fontFamily: 'var(--syne)', fontSize: 'clamp(44px, 5.5vw, 90px)', fontWeight: 800, lineHeight: 1, color: 'var(--text)', display: 'block', letterSpacing: '-0.02em' }}>
            {PERSONAL.firstName}
          </span>
          <span className="gradient-text" style={{ fontFamily: 'var(--syne)', fontSize: 'clamp(44px, 5.5vw, 90px)', fontWeight: 800, lineHeight: 1, display: 'block', letterSpacing: '-0.02em', marginBottom: 16 }}>
            {PERSONAL.lastName}
          </span>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={child} style={{
          fontFamily: 'var(--mono)', fontSize: 'clamp(13px, 1.4vw, 16px)',
          color: 'var(--muted)', margin: '0 0 20px',
          display: 'flex', alignItems: 'center', gap: 6, minHeight: 24,
        }}>
          <span style={{ color: 'var(--muted)' }}>→&nbsp;</span>
          <span style={{ color: 'var(--text)', fontWeight: 500 }}>{roleText}</span>
          <span style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--gold)', animation: 'blink 0.85s step-end infinite', borderRadius: 1 }} />
        </motion.div>

        {/* Tagline */}
        <motion.div variants={child}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
            fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 480,
            marginBottom: 28, borderLeft: '2px solid rgba(200,169,81,0.22)', paddingLeft: 14,
          }}>
            I design the infrastructure that makes products work — <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>auth systems</em>, <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>real-time sync</em>, and <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>execution pipelines</em>.
          </p>
        </motion.div>

        {/* Skill chips */}
        <motion.div variants={child} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
          {SKILLS.map(s => <span key={s} className="chip chip-gold">{s}</span>)}
        </motion.div>

        {/* Stats row */}
        <motion.div variants={child} style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12, marginBottom: 32,
          padding: '18px 0',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        }}>
          {STATS.map(s => <StatItem key={s.label} stat={s} />)}
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={child} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <a className="btn-primary" href={SOCIAL.resumeLink} download>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/><polyline points="9 15 12 18 15 15"/></svg>
            View Resume
          </a>
          <a className="btn-ghost" href={SOCIAL.liveProject} target="_blank" rel="noopener noreferrer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            DevDual Live →
          </a>
        </motion.div>

        {/* Social row */}
        <motion.div variants={child} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          {[
            { href: SOCIAL.github, label: 'GitHub', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            { href: SOCIAL.linkedin, label: 'LinkedIn', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
          ].map(({ href, label, svg }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                width: 34, height: 34, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--border)', color: 'var(--gold)', background: 'transparent',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dim)'; e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              {svg}
            </a>
          ))}
          <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3ddc84', animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
            uptime: <span style={{ color: '#3ddc84' }}>{uptime}s</span>
            &nbsp;·&nbsp; {PERSONAL.email}
          </span>
        </motion.div>
      </motion.div>

      {/* RIGHT — Orbit */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        className="hero-right"
      >
        <OrbitSystem />
      </motion.div>
    </section>
  );
}
