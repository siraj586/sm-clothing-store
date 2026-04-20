import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { trendingProducts } from '../data';

const TrendingProducts = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight dark:text-gray-100">Trending Products</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-3 h-1 w-16 bg-black dark:bg-white rounded-full origin-left"
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingProducts;
