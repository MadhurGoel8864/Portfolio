import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import { NAV_LINKS } from '../../constants/global';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  useEffect(() => {
    const observers = NAV_LINKS.map(link => {
      const el = document.getElementById(link.href);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(link.href); },
        { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 5vw',
        background: 'rgba(14,13,11,0.82)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--border)',
        transition: 'all 0.3s',
      }}>
        <Link to="hero" smooth duration={600} style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
            <div style={{
              width: 30, height: 30, borderRadius: 7,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-muted))',
              color: '#0e0d0b', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, fontFamily: 'var(--syne)',
            }}>M</div>
            Madhur
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
          {NAV_LINKS.map(link => (
            <Link key={link.href} to={link.href} smooth duration={600} offset={-72}
              style={{ cursor: 'pointer' }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 11, padding: '6px 12px', borderRadius: 6,
                color: active === link.href ? 'var(--gold)' : 'var(--muted)',
                background: active === link.href ? 'var(--gold-dim)' : 'transparent',
                border: active === link.href ? '1px solid var(--border)' : '1px solid transparent',
                letterSpacing: '0.03em', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { if (active !== link.href) { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--gold-dim)'; }}}
                onMouseLeave={e => { if (active !== link.href) { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; }}}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="nav-status">
            <span className="nav-status-dot" />
            Open to work
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(o => !o)}
            style={{ color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 900,
              width: 260, background: 'var(--bg-alt)', borderLeft: '1px solid var(--border)',
              padding: '64px 16px 24px', display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            <button onClick={() => setMobileOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: 'var(--muted)' }}>
              <X size={18} />
            </button>
            {NAV_LINKS.map(link => (
              <Link key={link.href} to={link.href} smooth duration={600} offset={-72}
                onClick={() => setMobileOpen(false)} style={{ cursor: 'pointer' }}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 12, padding: '10px 14px', borderRadius: 6,
                  color: active === link.href ? 'var(--gold)' : 'var(--text-2)',
                  background: active === link.href ? 'var(--gold-dim)' : 'transparent',
                  border: active === link.href ? '1px solid var(--border)' : '1px solid transparent',
                }}>
                  {link.label}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
