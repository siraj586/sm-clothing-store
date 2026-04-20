import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { FaShoppingBag, FaHeart } from "react-icons/fa";
import { useShop } from "../context/ShopContext";

// نجمع كل صور webp من المجلد الكامل
const webpModules = import.meta.glob("../assets/all products/**/*.webp", { eager: true });
const jpgModules  = import.meta.glob("../assets/all products/**/*.jpg",  { eager: true });
const jpegModules = import.meta.glob("../assets/all products/**/*.jpeg", { eager: true });
const pngModules  = import.meta.glob("../assets/all products/**/*.png",  { eager: true });

const allRawImages = [
  ...Object.entries(webpModules),
  ...Object.entries(jpgModules),
  ...Object.entries(jpegModules),
  ...Object.entries(pngModules),
].map(([path, mod]) => {
  const parts = path.split("/");
  // مثال path: ../assets/all products/men/Belt/type 1/1.webp
  // parts[-2] = "type 1", parts[-3] = "Belt", parts[-4] = "men"
  const fileName   = parts[parts.length - 1];
  const typeFolder = parts[parts.length - 2]; // "type 1" أو اسم الكاتيغوري مباشرة
  const catFolder  = parts[parts.length - 3]; // "Belt" أو "all products"

  // إذا الـ typeFolder بيبدأ بـ "type" أو "tupe" = هيكل جديد
  const isTyped = /^t[yu]pe\s*\d+$/i.test(typeFolder);

  const category = isTyped ? catFolder : typeFolder;
  const typeLabel = isTyped ? typeFolder : "type 1";

  return { id: path, src: mod.default, category, typeLabel, fileName, path };
});

// نستثني مجلدات مش منتجات (trending, new arrivals, summer, winter)
const EXCLUDED = ["trending products", "new arrivals", "summer", "winter", "logo-alt-light-transparent"];
const allImages = allRawImages.filter(
  (img) => !EXCLUDED.some((ex) => img.path.toLowerCase().includes(ex.toLowerCase()))
);

// نجمع: لكل (category + typeLabel) → نمثّله بأول صورة فقط في الـ Grid
function buildProducts(images) {
  const map = new Map();
  for (const img of images) {
    const key = `${img.category}|||${img.typeLabel}`;
    if (!map.has(key)) {
      map.set(key, { ...img, variants: [] });
    }
    map.get(key).variants.push(img);
  }
  return Array.from(map.values());
}

const categories = ["All", ...new Set(allImages.map((i) => i.category))].sort(
  (a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b))
);

const priceByCategory = {
  bag: 49.99, Belt: 24.99, hat: 18.99, shoes: 79.99,
  shorts: 34.99, sunglasses: 28.99, "tank top": 22.99, wallet: 37.99,
  // women
  "w-hat": 22.99, "w-jeans": 54.99, "w-pants": 49.99, "w-shoes": 69.99,
  "w-shortes": 32.99, "w-sport shoes": 79.99, "w-sweater": 58.99,
  "w-t-shirt": 28.99, "w-tanktop": 24.99,
};
const getPrice = (cat) => priceByCategory[cat] ?? 44.99;

const AllProducts = () => {
  const [active, setActive] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useShop();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      const matched = categories.find(
        (cat) => cat.toLowerCase() === searchQuery.toLowerCase()
      );
      setActive(matched || "All");
    }
  }, [searchQuery]);

  const products = useMemo(() => {
    const filtered = allImages.filter((img) => {
      const matchCat = active === "All" || img.category === active;
      const matchSearch =
        searchQuery === "" ||
        img.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
    return buildProducts(filtered).sort((a, b) => {
      if (sortOrder === "high-to-low") return getPrice(b.category) - getPrice(a.category);
      if (sortOrder === "low-to-high") return getPrice(a.category) - getPrice(b.category);
      return 0;
    });
  }, [active, searchQuery, sortOrder]);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          All Products
        </h1>

        <div className="flex justify-start mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back
          </button>
        </div>

        {searchQuery && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-4 text-sm">
            نتائج البحث عن:{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              "{searchQuery}"
            </span>
          </p>
        )}

        {/* Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full border font-medium transition-colors duration-200 capitalize
                ${active === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {products.length} products
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600 dark:text-gray-300">Sort by:</span>
            {[
              { key: "default", label: "Default" },
              { key: "high-to-low", label: "Price: High → Low" },
              { key: "low-to-high", label: "Price: Low → High" },
            ].map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSortOrder(s.key)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  sortOrder === s.key
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
            <p className="text-xl font-semibold mb-2">No products found</p>
            <p className="text-sm">Try searching for: bag, shoes, hat, belt...</p>
          </div>
        )}

        {/* Grid — كل كارد = نوع واحد (type) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => {
            const price = getPrice(product.category);
            const isFav = isFavorite(product.id);
            const inCart = isInCart(product.id);
            const cartItem = { id: product.id, src: product.src, category: product.category, price };

            return (
              <div
                key={product.id}
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
              >
                <div className="relative">
                  <img
                    src={product.src}
                    alt={product.category}
                    onClick={() => navigate(`/product/${encodeURIComponent(product.id)}`)}
                    className="w-full h-52 sm:h-64 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                  {/* عدد الأنواع المتاحة */}
                  {product.variants && product.variants.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                      {product.variants.length} photos
                    </span>
                  )}
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium capitalize text-gray-600 dark:text-gray-300">
                      {product.category}
                    </span>
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-1">
                      ${price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(cartItem)}
                      className={`p-2 rounded-md border transition-colors ${
                        inCart
                          ? "bg-black text-white border-black dark:bg-white dark:text-black"
                          : "border-gray-300 text-gray-600 hover:border-black dark:border-gray-600 dark:text-gray-300"
                      }`}
                      aria-label="Add to cart"
                    >
                      <FaShoppingBag size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(cartItem)}
                      className="p-2 rounded-md border border-gray-300 hover:border-pink-400 dark:border-gray-600 transition-colors"
                      aria-label="Favorite"
                    >
                      <FaHeart
                        size={16}
                        className={isFav ? "text-pink-400" : "text-gray-400 dark:text-gray-300"}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
