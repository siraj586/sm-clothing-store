import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import logoLight from '../assets/logo-alt-light-transparent.png';

const Navbar = ({ onAuthOpen }) => {
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userInitial = user?.name?.[0]?.toUpperCase() || 'U';
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'unknown@example.com';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, favoriteItems } = useShop();
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-products?search=${searchQuery.trim().toLowerCase()}`);
      setSearchQuery('');
      setSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={logoLight}
                alt="SM Clothing Store"
                className="h-10 w-auto object-contain invert dark:invert-0"
              />
            </Link>
          </div>

          {/* Desktop Icons */}
          <div className="flex-1 hidden md:flex items-center justify-center space-x-3">

            {/* Men & Women Links */}
            <Link
              to="/men"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Men
            </Link>
            <Link
              to="/women"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors px-3 py-1.5 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20"
            >
              Women
            </Link>
            <Link
              to="/all-products"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              All
            </Link>

            {/* Search */}
            <div className="flex items-center gap-2">
              {searchOpen && (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search (bag, shoes...)"
                    className="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1 text-sm outline-none bg-white dark:bg-gray-800 dark:text-gray-100 w-48 transition-all"
                  />
                </form>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                <FaSearch size={18} />
              </button>
            </div>

            {/* User - Desktop */}
            {user ? (
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                  <div className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center">
                    {userInitial}
                  </div>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-3 w-44 hidden group-hover:block z-50">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate">
                    {userEmail}
                  </p>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full text-left text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onAuthOpen}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                <FaUser size={18} />
              </button>
            )}

            {/* Favorites */}
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

            {/* Cart */}
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

          {/* Theme Switcher */}
          <div className="hidden md:flex items-center gap-1 pl-2 border-l border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => applyTheme('light')}
              className={`px-2 py-1 rounded-md text-xs border transition-colors ${theme === 'light'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'
                }`}
            >
              <span className="hidden sm:inline">Light</span>
              <span className="sm:hidden"><FaSun className="inline-block" size={14} /></span>
            </button>
            <button
              type="button"
              onClick={() => applyTheme('dark')}
              className={`px-2 py-1 rounded-md text-xs border transition-colors ${theme === 'dark'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'
                }`}
            >
              <span className="hidden sm:inline">Dark</span>
              <span className="sm:hidden"><FaMoon className="inline-block" size={14} /></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
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

                {/* Men / Women / All — Mobile */}
                <div className="flex gap-3">
                  <Link to="/men" onClick={() => setIsMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    👔 Men
                  </Link>
                  <Link to="/women" onClick={() => setIsMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded-xl border border-pink-200 dark:border-pink-900/40 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors">
                    👗 Women
                  </Link>
                  <Link to="/all-products" onClick={() => setIsMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    🛍️ All
                  </Link>
                </div>

                {/* Search Mobile */}
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <FaSearch size={18} className="text-gray-600 dark:text-gray-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search (bag, shoes...)"
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1 text-sm outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
                  />
                </form>

                {/* User - Mobile */}
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <div className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center">
                        {userInitial}
                      </div>
                      <span className="text-sm font-medium">{userName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={logout}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => { onAuthOpen(); setIsMenuOpen(false); }}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                  >
                    <FaUser size={18} />
                    <span>Sign In</span>
                  </button>
                )}

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
                    className={`flex-1 px-2 py-2 rounded-md text-sm border transition-colors ${theme === 'light'
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'
                      }`}
                  >
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTheme('dark')}
                    className={`flex-1 px-2 py-2 rounded-md text-sm border transition-colors ${theme === 'dark'
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