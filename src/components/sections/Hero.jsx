import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ExternalLink, Github, Linkedin, ArrowRight, ChevronDown, ArrowUpRight, FileText } from 'lucide-react';
import { PERSONAL, SOCIAL, STATS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';
import { useTypewriter } from '../../hooks/useTypewriter';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { ProfileImage } from '../ui/ProfileImage';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const child = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function useCountUp(target, duration = 1600, start = false) {
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

function StatItem({ stat, delay }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const display = useCountUp(stat.value, 1500, started);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); o.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="group flex flex-col items-center text-center">
      <div className="font-mono text-2xl sm:text-3xl font-extrabold mb-0.5" style={{ color: 'var(--gold)' }}>
        {started ? display : '—'}
      </div>
      <div className="text-sm tracking-wide" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
    </motion.div>
  );
}

export function Hero() {
  const { displayText } = useTypewriter(PERSONAL.roles, 80, 40, 2400);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div className="flex flex-col items-start" variants={container} initial="hidden" animate="visible">

            {/* Status pill */}
            {PERSONAL.availableForWork && (
              <motion.div variants={child} className="mb-7">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: withAlpha(COLORS.success, 0.08), border: `1px solid ${withAlpha(COLORS.success, 0.28)}`, color: COLORS.success }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Open to backend engineering roles
                </span>
              </motion.div>
            )}

            {/* Name */}
            <motion.h1 variants={child} className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.04] mb-4">
              <span style={{ color: 'var(--text-primary)' }}>{PERSONAL.firstName} </span>
              <span className="gradient-text">{PERSONAL.lastName}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={child} className="flex items-center gap-2 mb-5 h-9">
              <span className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--text-secondary)' }}>{displayText}</span>
              <motion.span className="inline-block w-[2px] h-5 rounded-full" style={{ background: 'var(--gold)' }}
                animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.85, repeat: Infinity }} />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={child} className="text-base leading-relaxed max-w-lg mb-4" style={{ color: 'var(--text-muted)' }}>
              {PERSONAL.tagline}
            </motion.p>

            {/* Current status — two equal pills */}
            <motion.div variants={child} className="mb-9 flex flex-col sm:flex-row gap-2.5 w-full">
              {/* Job pill */}
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm flex-1"
                style={{ background: `rgba(${COLORS.indigoRgb},0.06)`, border: `1px solid rgba(${COLORS.indigoRgb},0.22)` }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLORS.indigo }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-semibold" style={{ color: COLORS.indigo }}>SWE @ Unthinkable</span> — backend APIs &amp; fintech infrastructure using FastAPI &amp; PostgreSQL.
                </span>
              </div>
              {/* Project pill — clickable link */}
              <a href={SOCIAL.liveProject} target="_blank" rel="noopener noreferrer" className="flex-1 group">
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm h-full transition-all duration-200"
                  style={{ background: withAlpha(COLORS.gold, 0.05), border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = withAlpha(COLORS.gold, 0.10); e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.35); }}
                  onMouseLeave={e => { e.currentTarget.style.background = withAlpha(COLORS.gold, 0.05); e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.18); }}>
                  <span className="self-center w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <div className="flex-1 min-w-0">
                    <div style={{ color: 'var(--text-secondary)' }}>
                      <span className="font-semibold" style={{ color: 'var(--gold)' }}>DevDual</span> — competitive platform with real-time auctions, team roles &amp; sandboxed execution.
                    </div>
                    <div className="flex items-center gap-1 mt-1" style={{ color: withAlpha(COLORS.gold, 0.65) }}>
                      <ExternalLink size={10} />
                      <span className="text-xs font-mono">devduel.site</span>
                    </div>
                  </div>
                  <ArrowUpRight size={13} className="flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--gold)' }} />
                </div>
              </a>
            </motion.div>

            {/* CTAs — Resume only */}
            <motion.div variants={child} className="flex flex-wrap items-center gap-3 mb-8">
              <a href={SOCIAL.resumeLink} download>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: `0 4px 24px ${withAlpha(COLORS.gold, 0.22)}` }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-shine inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})`,
                    color: COLORS.bgBase,
                    boxShadow: `0 2px 14px ${withAlpha(COLORS.gold, 0.18)}`,
                  }}
                >
                  <FileText size={14} /> View Resume
                </motion.div>
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div variants={child} className="flex items-center gap-3">
              {[
                { icon: Github, href: SOCIAL.github, label: 'GitHub' },
                { icon: Linkedin, href: SOCIAL.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ color: COLORS.gold, border: `1px solid ${withAlpha(COLORS.gold, 0.50)}`, background: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.background = withAlpha(COLORS.gold, 0.08); }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.50); e.currentTarget.style.background = 'transparent'; }}>
                  <Icon size={16} />
                </motion.a>
              ))}
              <div className="w-px h-5" style={{ background: 'var(--border-medium)' }} />
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>📍 {PERSONAL.location}</span>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div className="flex items-center justify-center"
            initial={{ opacity: 0, x: 40, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <ProfileImage size={260} />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div className="mt-20 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 xl:gap-10"
          style={{ borderTop: `1px solid ${withAlpha(COLORS.gold, 0.12)}` }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}>
          {STATS.map((s, i) => <StatItem key={s.label} stat={s} delay={0.85 + i * 0.09} />)}
        </motion.div>
      </div>


    </section>
  );
}
