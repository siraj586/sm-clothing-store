import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = ['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Pants', 'Accessories'];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight">SM</h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-700 hover:text-black transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Icons & Search */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-black">
              <FaSearch size={18} />
            </button>
            <button className="text-gray-600 hover:text-black">
              <FaUser size={18} />
            </button>
            <button className="text-gray-600 hover:text-black">
              <FaHeart size={18} />
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
              <FaShoppingBag size={18} />
              <span>$0.00</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-black"
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
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-3 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-600">
                  <FaSearch size={18} />
                  <span>Search</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <FaUser size={18} />
                  <span>Sign In</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <FaHeart size={18} />
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <FaShoppingBag size={18} />
                  <span>Cart ($0.00)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;