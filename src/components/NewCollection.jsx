import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const NewCollection = () => {
  return (
    <section className="bg-black text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center space-y-6"
        >
          <motion.p variants={itemVariants} className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
            Limited Drop
          </motion.p>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight">
            SPRING/SUMMER 2025
          </motion.h2>

          <motion.p variants={itemVariants} className="text-2xl font-light">
            NEW COLLECTION ARRIVED
          </motion.p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto h-px w-24 bg-white origin-center"
          />

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-gray-300">
            Refresh your wardrobe with our latest arrivals. Fresh colors, lightweight fabrics, and modern silhouettes for the new season.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Discover Now <span aria-hidden="true">→</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewCollection;
