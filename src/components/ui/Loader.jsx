import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

// Loader is intentionally always dark — it's a full-screen splash
export function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: COLORS.bgDeeper }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-20 blur-[100px]"
              style={{ background: `radial-gradient(circle, ${COLORS.gold}, transparent)` }} />
            <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full opacity-15 blur-[80px]"
              style={{ background: `radial-gradient(circle, ${COLORS.goldMuted}, transparent)` }} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black tracking-tighter gradient-text">
                {PERSONAL.firstName}
              </span>
              <span className="text-5xl font-black tracking-tighter" style={{ color: COLORS.loaderDot }}>.</span>
            </div>

            <div className="relative w-56 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldMuted})` }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: COLORS.loaderText }}
            >
              Initializing portfolio...
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
