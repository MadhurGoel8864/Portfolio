import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';
import { COLORS, withAlpha } from '../../constants/theme';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cb = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.5, y: 12 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.5, y: 12 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link to="hero" smooth duration={700}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
              style={{
                background: 'var(--gold)',
                border:     `1px solid ${withAlpha(COLORS.gold, 0.3)}`,
                boxShadow:  `0 4px 20px ${withAlpha(COLORS.gold, 0.2)}`,
                color:      COLORS.bgBase,
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
