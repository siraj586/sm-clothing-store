import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTruck, FaUndo, FaStar } from 'react-icons/fa';
import heroImg from '../assets/all products/new Arrivals/photo-1556905055-8f358a7a47b2.jpeg';
import img2 from '../assets/all products/trending products/1.jpg';
import img3 from '../assets/all products/trending products/2.jpeg';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6 md:pt-25y md:pb-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* ===== Left: Text Side ===== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/10 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-widest">New Season 2026</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white mb-4"
            >
              Life Style<br />
              <span className="text-gray-500 dark:text-gray-400">Collection</span><br />
              <span className="relative inline-block">
                MEN / WOMEN
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-1 left-0 right-0 h-1 bg-black dark:bg-white origin-left rounded-full"
                />
              </span>
            </motion.h1>

            {/* Sale tag */}
            <motion.div variants={itemVariants} className="inline-block bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-sm font-bold mb-4 rounded-sm">
              SALE UP TO 30% OFF
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto md:mx-0 text-sm leading-relaxed mb-6">
              Free shipping on orders over $50. Discover the latest trends in fashion — curated styles for every season.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
              <Link
                to="/all-products"
                className=" whitespace-nowrap inline-flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
              >
                Shop Now
              </Link>
              <Link
                to="/men"
                className=" whitespace-nowrap inline-flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-semibold hover:border-black dark:hover:border-white transition-colors duration-300"
              >
                Men's Collection
              </Link>
              <Link
                to="/women"
                className=" whitespace-nowrap inline-flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-semibold hover:border-black dark:hover:border-white transition-colors duration-300"
              >
                Women's Collection
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="flex items-center justify-center md:justify-start gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              {[
                { value: '500+', label: 'Products' },
                { value: '4.9★', label: 'Rating' },
                { value: '10K+', label: 'Customers' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>



          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img style={{ height: 500 }}
              src={heroImg}
              alt="Fashion collection"
              className="w-full object-cover"
            />


          </div>







        </div>
      </div>


    </section>
  );
};

export default Hero;
