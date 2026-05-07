import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // FIX #4: Hide button when within ~200px of the bottom so it never overlaps footer text
    const cb = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      setVisible(window.scrollY > 500 && !nearBottom);
    };
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.5, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 12 }}
          style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50 }}
        >
          <Link to="hero" smooth duration={700}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 40, height: 40, borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-muted))',
                border: '1px solid rgba(200,169,81,0.3)',
                boxShadow: '0 4px 20px rgba(200,169,81,0.2)',
                color: '#0e0d0b', cursor: 'pointer',
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
