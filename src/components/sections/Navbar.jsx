import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import { NAV_LINKS } from '../../constants/global';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('hero');
  // FIX #2: track all currently-intersecting sections to pick the topmost
  const visibleRef = useRef(new Set());

  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  // FIX #2: Single observer with narrow rootMargin so only one section fires at a time.
  // FIX #3: Sections use scroll-margin-top via CSS; react-scroll offset matches.
  useEffect(() => {
    const order = NAV_LINKS.map(l => l.href);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleRef.current.add(entry.target.id);
          } else {
            visibleRef.current.delete(entry.target.id);
          }
        });
        // Pick the topmost section in nav order
        const topmost = order.find(id => visibleRef.current.has(id));
        if (topmost) setActive(topmost);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    order.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // FIX #7: Escape key closes mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mobileOpen]);

  // FIX #7: Body scroll-lock while drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // FIX #2: Immediately set active on click — don't wait for scroll observer
  const handleNavClick = useCallback((href) => {
    setActive(href);
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/*
        FIX #1: transform: translateZ(0) promotes the nav to its own GPU compositing
        layer, preventing the repaint artifact where position:fixed renders mid-page
        during programmatic smooth-scroll.
        FIX #24: gap between brand and nav links group
      */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 5vw',
        background: 'rgba(14,13,11,0.82)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--border)',
        transition: 'all 0.3s',
        transform: 'translateZ(0)',
        gap: '1.5rem',
      }}>
        <Link to="hero" smooth duration={600} offset={-80} style={{ cursor: 'pointer', textDecoration: 'none', flexShrink: 0 }}
          onClick={() => handleNavClick('hero')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
            <div style={{
              width: 30, height: 30, borderRadius: 7,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-muted))',
              color: '#0e0d0b', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, fontFamily: 'var(--syne)', flexShrink: 0,
            }}>M</div>
            {/* FIX #24: hide brand text below xl, keep the M square */}
            <span className="hidden xl:inline">Madhur</span>
          </div>
        </Link>

        {/* Desktop nav — FIX #6: lg:flex so links are hidden below 1024px.
            NOTE: no inline display so Tailwind's hidden/lg:flex can take effect. */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
          {NAV_LINKS.map(link => (
            <Link key={link.href} to={link.href} smooth duration={600} offset={-80}
              style={{ cursor: 'pointer' }}
              onClick={() => handleNavClick(link.href)}>
              {/* FIX #2: aria-current is exclusive to the one active item */}
              <div
                aria-current={active === link.href ? 'page' : undefined}
                style={{
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div className="nav-status hidden sm:inline-flex">
            <span className="nav-status-dot" />
            Open to work
          </div>
          {/* FIX #6: hamburger only below lg (1024px).
              Using Tailwind classes for display — no inline display so hidden takes effect. */}
          <button
            className="flex items-center justify-center lg:hidden"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6,
              width: 36, height: 36, background: 'transparent', cursor: 'pointer',
            }}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* FIX #7: Semi-transparent backdrop — closes drawer on outside click */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 899, background: 'rgba(0,0,0,0.6)' }}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 900,
              width: 260, background: 'var(--bg-alt)', borderLeft: '1px solid var(--border)',
              padding: '64px 16px 24px', display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
              <X size={18} />
            </button>
            {NAV_LINKS.map(link => (
              <Link key={link.href} to={link.href} smooth duration={600} offset={-80}
                onClick={() => handleNavClick(link.href)} style={{ cursor: 'pointer' }}>
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
