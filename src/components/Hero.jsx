import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                NEW SEASON
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Life Style <br />
                <span className="text-gray-800">Collection - MEN</span>
              </h1>
              <div className="inline-block bg-black text-white px-4 py-2 text-sm font-semibold">
                SALE UP TO 30% OFF
              </div>
              <p className="text-gray-600 max-w-md">
                Get Free Shipping on orders over $50. Discover the latest trends in men's fashion today.
              </p>
              <button className="mt-4 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="../src/assets/all products/downloaded images/photo-1556905055-8f358a7a47b2.jpeg"
              alt="Men's fashion"
              className="rounded-lg shadow-xl object-cover w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;