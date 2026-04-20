import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag, FaHeart, FaVenus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useShop } from "../context/ShopContext";

const webpModules  = import.meta.glob("../assets/all products/women/**/*.webp",  { eager: true });
const jpgModules   = import.meta.glob("../assets/all products/women/**/*.jpg",   { eager: true });
const jpegModules  = import.meta.glob("../assets/all products/women/**/*.jpeg",  { eager: true });

const allRawImages = [
  ...Object.entries(webpModules),
  ...Object.entries(jpgModules),
  ...Object.entries(jpegModules),
].map(([path, mod]) => {
  const parts = path.split("/");
  const typeFolder = parts[parts.length - 2];
  const catFolder  = parts[parts.length - 3];
  const isTyped = /^t[yu]pe\s*\d+$/i.test(typeFolder);
  const rawCategory = isTyped ? catFolder  : typeFolder;
  const typeLabel   = isTyped ? typeFolder : "type 1";
  // نحافظ على الاسم الأصلي (w-jeans) للـ routing، لكن نعرض بدون "w-"
  return { id: path, src: mod.default, category: rawCategory, typeLabel, path };
});

function buildProducts(images) {
  const map = new Map();
  for (const img of images) {
    const key = `${img.category}|||${img.typeLabel}`;
    if (!map.has(key)) map.set(key, { ...img, variants: [] });
    map.get(key).variants.push(img);
  }
  return Array.from(map.values());
}

const displayName = (cat) =>
  cat.replace(/^w-/, "").split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const categories = ["All", ...new Set(allRawImages.map((i) => i.category))].sort(
  (a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b))
);

const priceByCategory = {
  "w-hat": 22.99, "w-jeans": 54.99, "w-pants": 49.99, "w-shoes": 69.99,
  "w-shortes": 32.99, "w-sport shoes": 79.99, "w-sweater": 58.99,
  "w-t-shirt": 28.99, "w-tanktop": 24.99,
};
const getPrice = (cat) => priceByCategory[cat] ?? 39.99;

const WomenProducts = () => {
  const [active, setActive] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useShop();
  const navigate = useNavigate();

  const products = useMemo(() => {
    const filtered = allRawImages.filter(
      (img) => active === "All" || img.category === active
    );
    return buildProducts(filtered).sort((a, b) => {
      if (sortOrder === "high-to-low") return getPrice(b.category) - getPrice(a.category);
      if (sortOrder === "low-to-high") return getPrice(a.category) - getPrice(b.category);
      return 0;
    });
  }, [active, sortOrder]);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-6"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink-50 dark:bg-pink-900/20 mb-4">
            <FaVenus className="text-2xl text-pink-500" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Women's Collection
          </h1>
          <p className="text-gray-400 mt-2 text-sm">{products.length} products available</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors capitalize
                ${active === cat
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-pink-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                }`}
            >{cat === "All" ? "All" : displayName(cat)}</button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">{products.length} products</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500">Sort by:</span>
            {[
              { key: "default", label: "Default" },
              { key: "high-to-low", label: "Price: High → Low" },
              { key: "low-to-high", label: "Price: Low → High" },
            ].map((s) => (
              <button key={s.key} onClick={() => setSortOrder(s.key)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors
                  ${sortOrder === s.key
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-pink-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                  }`}
              >{s.label}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product, i) => {
            const price = getPrice(product.category);
            const cartItem = { id: product.id, src: product.src, category: product.category, price };
            return (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
              >
                <div className="relative">
                  <img
                    src={product.src} alt={product.category}
                    onClick={() => navigate(`/product/${encodeURIComponent(product.id)}`)}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                  {product.variants?.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                      {product.variants.length} photos
                    </span>
                  )}
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium capitalize text-gray-600 dark:text-gray-300">
                      {displayName(product.category)}
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">${price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => addToCart(cartItem)}
                      className={`p-2 rounded-md border transition-colors ${
                        isInCart(product.id)
                          ? "bg-pink-500 text-white border-pink-500"
                          : "border-gray-300 text-gray-600 hover:border-pink-400 dark:border-gray-600 dark:text-gray-300"
                      }`}
                    ><FaShoppingBag size={15} /></button>
                    <button onClick={() => toggleFavorite(cartItem)}
                      className="p-2 rounded-md border border-gray-300 hover:border-pink-400 dark:border-gray-600 transition-colors"
                    ><FaHeart size={15} className={isFavorite(product.id) ? "text-pink-400" : "text-gray-400"} /></button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl font-semibold">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WomenProducts;
