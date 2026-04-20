import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text side — stagger children */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-4">
              <motion.span
                variants={itemVariants}
                className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-wider"
              >
                NEW SEASON
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Life Style <br />
                <span className="text-gray-800 dark:text-gray-100">Collection - MEN</span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="inline-block bg-black text-white px-4 py-2 text-sm font-semibold"
              >
                SALE UP TO 30% OFF
              </motion.div>

              <motion.p variants={itemVariants} className="text-gray-600 max-w-md">
                Get Free Shipping on orders over $50. Discover the latest trends in men's fashion today.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Link
                  to="/all-products"
                  className="mt-4 inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            {/* Decorative bg blob */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -inset-4 bg-gray-200 dark:bg-gray-700 rounded-2xl -z-10"
            />
            <img
              src="../src/assets/all products/new arrivals/photo-1556905055-8f358a7a47b2.jpeg"
              alt="Men's fashion"
              className="rounded-lg shadow-xl object-cover w-full h-auto relative z-10"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
