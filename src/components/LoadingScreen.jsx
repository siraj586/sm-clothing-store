import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import logo from '../assets/logo-alt-light-transparent.png';

const LoadingScreen = ({ onDone }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Logo pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [0.8, 1.05, 1] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.img
              src={logo}
              alt="SM Logo"
              className="w-32 h-32 object-contain"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
          </motion.div>

          {/* Store name */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-white text-sm font-light tracking-[0.35em] uppercase"
          >
            SM Clothing Store
          </motion.p>

          {/* Loading bar */}
          <motion.div className="mt-8 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
