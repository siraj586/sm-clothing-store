// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, title, price, originalPrice, image, badge, rating, reviewCount } = product;

  return (
    <Link to={`/home-product/${id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
            {title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}
                  size={14}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">({reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;