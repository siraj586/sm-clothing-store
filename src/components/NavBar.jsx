import { useEffect, useState, useRef, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes, FaSun, FaMoon, FaClock, FaFire } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import logoLight from '../assets/logo-alt-light-transparent.png';

// كل الكاتيغوريات الموجودة في المتجر
const ALL_CATEGORIES = [
  "bag", "Belt", "hat", "shoes", "shorts", "sunglasses", "tank top", "wallet",
  "w-hat", "w-jeans", "w-pants", "w-shoes", "w-shortes", "w-sport shoes",
  "w-sweater", "w-t-shirt", "w-tanktop",
  "men", "women", "new arrivals", "trending"
];

// الكاتيغوريات الأكثر بحثاً (trending)
const TRENDING_SEARCHES = ["shoes", "bag", "hat", "sunglasses", "w-jeans"];

// Fuzzy search — بيلاقي حتى لو في غلطة إملائية
function fuzzyMatch(query, target) {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return { match: true, score: 100 };

  // levenshtein distance بسيطة
  let qi = 0;
  let score = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) { qi++; score++; }
  }
  const ratio = (score / q.length) * 100;
  return { match: ratio > 60, score: ratio };
}

function getSuggestions(query, recentSearches) {
  if (!query.trim()) return [];
  const results = ALL_CATEGORIES
    .map((cat) => ({ cat, ...fuzzyMatch(query, cat) }))
    .filter((r) => r.match)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.cat);
  return results;
}

const MAX_RECENT = 5;

const Navbar = ({ onAuthOpen }) => {
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recentSearches')) || []; }
    catch { return []; }
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(-1);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
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

  // تحديث الاقتراحات مع كل حرف
  useEffect(() => {
    if (searchQuery.trim()) {
      const s = getSuggestions(searchQuery, recentSearches);
      setSuggestions(s);
      setShowDropdown(true);
      setHighlightedIdx(-1);
    } else {
      setSuggestions([]);
      setShowDropdown(searchOpen); // لما الإنبوت فاضي بيظهر Recent + Trending
    }
  }, [searchQuery, searchOpen]);

  // إغلاق الـ dropdown لما تضغط بره
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecentSearch = useCallback((query) => {
    const updated = [query, ...recentSearches.filter((r) => r !== query)].slice(0, MAX_RECENT);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  const doSearch = useCallback((query) => {
    if (!query.trim()) return;
    saveRecentSearch(query.trim());
    navigate(`/all-products?search=${encodeURIComponent(query.trim().toLowerCase())}`);
    setSearchQuery('');
    setSearchOpen(false);
    setShowDropdown(false);
    setIsMenuOpen(false);
  }, [navigate, saveRecentSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = highlightedIdx >= 0 && suggestions[highlightedIdx]
      ? suggestions[highlightedIdx]
      : searchQuery;
    doSearch(q);
  };

  const handleKeyDown = (e) => {
    const items = searchQuery.trim() ? suggestions : [...recentSearches, ...TRENDING_SEARCHES];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIdx((prev) => Math.min(prev + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIdx((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const openSearch = () => {
    setSearchOpen(true);
    setShowDropdown(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const dropdownItems = searchQuery.trim() ? suggestions : null;

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

          {/* Desktop Center */}
          <div className="flex-1 hidden md:flex items-center justify-center space-x-3">
            <Link to="/men" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              Men
            </Link>
            <Link to="/women" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors px-3 py-1.5 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20">
              Women
            </Link>
            <Link to="/all-products" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              All
            </Link>

            {/* ===== SEARCH DESKTOP ===== */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {searchOpen && (
                    <motion.form
                      onSubmit={handleSearch}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 220, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex items-center overflow-hidden"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search products..."
                        className="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1.5 text-sm outline-none bg-white dark:bg-gray-800 dark:text-gray-100 w-full transition-all focus:border-black dark:focus:border-gray-400 focus:ring-1 focus:ring-black/10"
                      />
                    </motion.form>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={searchOpen ? handleSearch : openSearch}
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  <FaSearch size={18} />
                </button>
              </div>

              {/* Dropdown Desktop */}
              <AnimatePresence>
                {showDropdown && searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-10 left-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <SearchDropdownContent
                      query={searchQuery}
                      suggestions={dropdownItems}
                      recentSearches={recentSearches}
                      trendingSearches={TRENDING_SEARCHES}
                      highlightedIdx={highlightedIdx}
                      onSelect={doSearch}
                      onClearRecent={clearRecent}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Desktop */}
            {user ? (
              <div className="relative group">
                <button type="button" className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  <div className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center">
                    {userInitial}
                  </div>
                </button>
                <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-3 w-44 hidden group-hover:block z-50">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">{userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate">{userEmail}</p>
                  <button type="button" onClick={logout} className="w-full text-left text-xs text-red-500 hover:text-red-700 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={onAuthOpen} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                <FaUser size={18} />
              </button>
            )}

            <Link to="/favorites" className="relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" aria-label="Favorites">
              <FaHeart size={18} />
              {favoriteItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white dark:bg-white dark:text-black text-[10px] rounded-full px-1">{favoriteItems.length}</span>
              )}
            </Link>

            <Link to="/cart" className="relative flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" aria-label="Cart">
              <FaShoppingBag size={18} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white dark:bg-white dark:text-black text-[10px] rounded-full px-1">{cartItems.length}</span>
              )}
            </Link>
          </div>

          {/* Theme Switcher Desktop */}
          <div className="hidden md:flex items-center gap-1 pl-2 border-l border-gray-200 dark:border-gray-700">
            <button type="button" onClick={() => applyTheme('light')}
              className={`px-2 py-1 rounded-md text-xs border transition-colors ${theme === 'light' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'}`}>
              <span className="hidden sm:inline">Light</span>
              <span className="sm:hidden"><FaSun className="inline-block" size={14} /></span>
            </button>
            <button type="button" onClick={() => applyTheme('dark')}
              className={`px-2 py-1 rounded-md text-xs border transition-colors ${theme === 'dark' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'}`}>
              <span className="hidden sm:inline">Dark</span>
              <span className="sm:hidden"><FaMoon className="inline-block" size={14} /></span>
            </button>
          </div>

          {/* Mobile: show cart badge + hamburger only */}
          <div className="md:hidden ml-auto flex items-center gap-3">
            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300">
              <FaShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white dark:bg-white dark:text-black text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
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
                <div className="flex gap-3">
                  <Link to="/men" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">👔 Men</Link>
                  <Link to="/women" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center py-2 rounded-xl border border-pink-200 dark:border-pink-900/40 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors">👗 Women</Link>
                  <Link to="/all-products" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">🛍️ All</Link>
                </div>

                {/* Search Mobile — مع dropdown */}
                <MobileSearch
                  recentSearches={recentSearches}
                  onSearch={(q) => { doSearch(q); }}
                  onClearRecent={clearRecent}
                  saveRecentSearch={saveRecentSearch}
                />

                {/* User Mobile */}
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <div className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center">{userInitial}</div>
                      <span className="text-sm font-medium">{userName}</span>
                    </div>
                    <button type="button" onClick={logout} className="text-xs text-red-500 hover:text-red-700">Sign Out</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => { onAuthOpen(); setIsMenuOpen(false); }} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <FaUser size={18} /><span>Sign In</span>
                  </button>
                )}

                <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <FaHeart size={18} /><span>Wishlist</span>
                </Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <FaShoppingBag size={18} /><span>Cart ({cartItems.length})</span>
                </Link>

                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => applyTheme('light')}
                    className={`flex-1 px-2 py-2 rounded-md text-sm border transition-colors ${theme === 'light' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'}`}>
                    Light
                  </button>
                  <button type="button" onClick={() => applyTheme('dark')}
                    className={`flex-1 px-2 py-2 rounded-md text-sm border transition-colors ${theme === 'dark' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'}`}>
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

// ===== Dropdown Content Component =====
const SearchDropdownContent = ({ query, suggestions, recentSearches, trendingSearches, highlightedIdx, onSelect, onClearRecent }) => {
  if (query?.trim() && suggestions) {
    // عرض الاقتراحات
    if (suggestions.length === 0) {
      return (
        <div className="p-4 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">No results for "<span className="font-medium text-gray-600 dark:text-gray-300">{query}</span>"</p>
          <p className="text-xs text-gray-400 mt-1">Try: bag, shoes, hat...</p>
        </div>
      );
    }
    return (
      <ul className="py-2">
        {suggestions.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              onMouseDown={() => onSelect(s)}
              className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors text-sm ${
                i === highlightedIdx
                  ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
              <span className="capitalize">{s}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  // لما الإنبوت فاضي: Recent + Trending
  return (
    <div className="py-2">
      {recentSearches.length > 0 && (
        <>
          <div className="flex items-center justify-between px-4 py-1.5">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <FaClock size={10} /> Recent
            </span>
            <button type="button" onMouseDown={onClearRecent} className="text-xs text-gray-400 hover:text-red-400 transition-colors">
              Clear
            </button>
          </div>
          {recentSearches.map((r, i) => (
            <button
              key={r}
              type="button"
              onMouseDown={() => onSelect(r)}
              className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm transition-colors ${
                i === highlightedIdx ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              } text-gray-700 dark:text-gray-200`}
            >
              <FaClock size={12} className="text-gray-400" />
              <span className="capitalize">{r}</span>
            </button>
          ))}
          <div className="mx-4 my-1 border-t border-gray-100 dark:border-gray-700" />
        </>
      )}

      <div className="px-4 py-1.5">
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <FaFire size={10} className="text-orange-400" /> Trending
        </span>
      </div>
      {trendingSearches.map((t, i) => (
        <button
          key={t}
          type="button"
          onMouseDown={() => onSelect(t)}
          className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm transition-colors ${
            i + recentSearches.length === highlightedIdx ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
          } text-gray-700 dark:text-gray-200`}
        >
          <FaFire size={12} className="text-orange-400" />
          <span className="capitalize">{t}</span>
        </button>
      ))}
    </div>
  );
};

// ===== Mobile Search Component =====
const MobileSearch = ({ recentSearches, onSearch, onClearRecent, saveRecentSearch }) => {
  const [query, setQuery] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const suggestions = query.trim() ? getSuggestions(query, recentSearches) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) { saveRecentSearch(query.trim()); onSearch(query); }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <FaSearch size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowDrop(true); }}
          onFocus={() => setShowDrop(true)}
          placeholder="Search products..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1.5 text-sm outline-none bg-white dark:bg-gray-800 dark:text-gray-100 focus:border-black dark:focus:border-gray-400"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(''); setShowDrop(false); }} className="text-gray-400 hover:text-gray-600">
            <FaTimes size={14} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showDrop && (query.trim() ? (suggestions && suggestions.length > 0) : recentSearches.length > 0 || TRENDING_SEARCHES.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute top-10 left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
          >
            <SearchDropdownContent
              query={query}
              suggestions={suggestions}
              recentSearches={recentSearches}
              trendingSearches={TRENDING_SEARCHES}
              highlightedIdx={-1}
              onSelect={(s) => { setQuery(''); setShowDrop(false); saveRecentSearch(s); onSearch(s); }}
              onClearRecent={onClearRecent}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
