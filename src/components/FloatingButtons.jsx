import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa';

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/96171590629"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={22} />
      </motion.a>

      {/* Back to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-lg"
            aria-label="Back to top"
          >
            <FaArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingButtons;