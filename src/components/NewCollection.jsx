import { motion } from 'framer-motion';

const NewCollection = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            SPRING/SUMMER 2025
          </h2>
          <p className="text-2xl font-light">NEW COLLECTION ARRIVED</p>
          <p className="max-w-2xl mx-auto text-gray-300">
            Refresh your wardrobe with our latest arrivals. Fresh colors, lightweight fabrics, and modern silhouettes for the new season.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
            Discover Now
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewCollection;