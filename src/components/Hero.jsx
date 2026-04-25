import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../assets/all products/new Arrivals/photo-1556905055-8f358a7a47b2.jpeg';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Text side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Life Style <br />
                <span className="text-gray-800 dark:text-gray-100">Collection - MEN / WOMEN</span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="inline-block bg-black text-white px-4 py-2 text-sm font-semibold"
              >
                SALE UP TO 30% OFF
              </motion.div>

              <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 max-w-md mx-auto md:mx-0 text-sm sm:text-base">
                Get Free Shipping on orders over $50. Discover the latest trends in men's fashion today.
              </motion.p>

              <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
                <Link
                  to="/all-products"
                  className="mt-2 inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -inset-4 bg-gray-200 dark:bg-gray-700 rounded-2xl -z-10"
            />
            <img
              src={heroImg}
              alt="Men's fashion"
              className="rounded-lg shadow-xl object-cover w-full h-64 sm:h-80 md:h-96 relative z-10"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
