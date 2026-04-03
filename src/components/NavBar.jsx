import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, favoriteItems } = useShop();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const applyTheme = (mode) => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    setTheme(mode);
    localStorage.setItem('theme', mode);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-black dark:hover:text-white transition-colors duration-200 text-gray-900 dark:text-gray-100"
            >
              SM
            </Link>
          </div>

          {/* Icons & Search */}
          <div className="flex-1 hidden md:flex items-center justify-center space-x-3">
            <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" type="button">
              <FaSearch size={18} />
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" type="button">
              <FaUser size={18} />
            </button>

            <Link
              to="/favorites"
              className="relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              aria-label="Favorites"
            >
              <FaHeart size={18} />
              {favoriteItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white dark:bg-white dark:text-black text-[10px] rounded-full px-1">
                  {favoriteItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              aria-label="Cart"
            >
              <FaShoppingBag size={18} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white dark:bg-white dark:text-black text-[10px] rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </Link>

          </div>

          {/* Theme switcher (right) */}
          <div className="hidden md:flex items-center gap-1 pl-2 border-l border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => applyTheme('light')}
                className={`px-2 py-1 rounded-md text-xs border transition-colors ${
                  theme === 'light'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'
                }`}
              >
                <span className="hidden sm:inline">Light</span>
                <span className="sm:hidden">
                  <FaSun className="inline-block" size={14} />
                </span>
              </button>
              <button
                type="button"
                onClick={() => applyTheme('dark')}
                className={`px-2 py-1 rounded-md text-xs border transition-colors ${
                  theme === 'dark'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'
                }`}
              >
                <span className="hidden sm:inline">Dark</span>
                <span className="sm:hidden">
                  <FaMoon className="inline-block" size={14} />
                </span>
              </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-3 space-y-2">
              <div className="pt-4 flex flex-col space-y-3 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <FaSearch size={18} />
                  <span>Search</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <FaUser size={18} />
                  <span>Sign In</span>
                </button>
                <Link
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                >
                  <FaHeart size={18} />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                >
                  <FaShoppingBag size={18} />
                  <span>Cart ({cartItems.length})</span>
                </Link>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => applyTheme('light')}
                    className={`flex-1 px-2 py-2 rounded-md text-sm border transition-colors ${
                      theme === 'light'
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTheme('dark')}
                    className={`flex-1 px-2 py-2 rounded-md text-sm border transition-colors ${
                      theme === 'dark'
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;