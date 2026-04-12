import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import { NAV_LINKS, PERSONAL } from '../../constants/global';
import { useActiveSection } from '../../hooks/useActiveSection';
import { COLORS, withAlpha } from '../../constants/theme';

export function Navbar({ isDark, toggleTheme }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = NAV_LINKS.map(l => l.href);
  const active     = useActiveSection(sectionIds);

  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  useEffect(() => {
    const cb = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? {
          background:           'var(--nav-bg)',
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom:         '1px solid var(--border-subtle)',
          paddingTop:           '8px',
          paddingBottom:        '8px',
        } : {
          paddingTop:    '16px',
          paddingBottom: '16px',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">

          {/* Logo */}
          <Link to="hero" smooth duration={600} className="cursor-pointer z-10">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.04 }}>
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg opacity-60 blur-sm"
                  style={{ background: 'var(--gold)' }} />
                <div className="relative w-full h-full rounded-lg flex items-center justify-center font-black text-sm"
                  style={{ background: 'var(--gold)', color: COLORS.bgBase }}>
                  {PERSONAL.firstName[0]}
                </div>
              </div>
              <span className="font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {PERSONAL.firstName}<span className="gradient-text">.</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.href} to={link.href} smooth duration={600} offset={-72} className="cursor-pointer">
                <motion.div
                  className="relative px-4 py-2 rounded-lg text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  {active === link.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: withAlpha(COLORS.gold, 0.10), border: `1px solid ${withAlpha(COLORS.gold, 0.25)}` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className="relative z-10 transition-colors"
                    style={{ color: active === link.href ? 'var(--gold)' : 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                color:       'var(--text-secondary)',
                border:      '1px solid var(--border-medium)',
                background:  'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = withAlpha(COLORS.gold, 0.35); }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-medium)'; }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            <motion.button
              onClick={() => setMobileOpen(o => !o)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 z-10"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-medium)' }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={18} /></motion.span>
                  : <motion.span key="men" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={18} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{ background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center justify-between px-5 py-5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                  {PERSONAL.firstName}<span className="gradient-text">.</span>
                </span>
                <motion.button onClick={() => setMobileOpen(false)} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ color: 'var(--text-secondary)' }}>
                  <X size={18} />
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={link.href} smooth duration={600} offset={-72} onClick={() => setMobileOpen(false)} className="cursor-pointer">
                      <div
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 transition-all duration-200"
                        style={active === link.href ? {
                          background: withAlpha(COLORS.gold, 0.08),
                          border:     `1px solid ${withAlpha(COLORS.gold, 0.2)}`,
                          color:      'var(--gold)',
                        } : {
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>0{i + 1}</span>
                        <span className="font-medium text-sm">{link.label}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
