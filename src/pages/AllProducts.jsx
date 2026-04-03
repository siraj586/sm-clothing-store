const imageModules = import.meta.glob(
  '../assets/all products/**/*.webp',
  { eager: true }
);

const categories = ['All', 'bag', 'Belt', 'hat', 'shoes', 'shorts', 'sunglasses', 'tank top', 'wallet'];

const allImages = Object.entries(imageModules).map(([path, mod]) => {
  const parts = path.split('/');
  const category = parts[parts.length - 2];
  return { id: path, src: mod.default, category };
});

import { useEffect, useState } from 'react';
import { FaShoppingBag, FaHeart } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

const AllProducts = () => {
  const [active, setActive] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useShop();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedId(null);
  }, [active]);

  const priceByCategory = {
    bag: 49.99,
    Belt: 24.99,
    hat: 18.99,
    shoes: 79.99,
    shorts: 34.99,
    sunglasses: 28.99,
    'tank top': 22.99,
    wallet: 37.99,
  };

  const getPrice = (category) => priceByCategory[category] ?? 44.99;

  const filtered = active === 'All'
    ? allImages
    : allImages.filter(img => img.category === active);

    
  return (
    <section className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">All Products</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full border font-medium transition-colors duration-200 
                ${active === cat 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((img) => {
            const price = getPrice(img.category);
            const isSelected = selectedId === img.id;
            const isFav = isFavorite(img.id);
            const inCart = isInCart(img.id);

            const product = {
              id: img.id,
              src: img.src,
              category: img.category,
              price,
            };

            return (
              <div
                key={img.id}
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedId((prev) => (prev === img.id ? null : img.id))}
                    className="block w-full"
                  >
                    <img
                      src={img.src}
                      alt={img.category}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </button>

                  {isSelected && (
                    <div className="absolute inset-0 bg-black/60 flex items-end p-3">
                      <div className="w-full flex items-center justify-between gap-3">
                        <div className="text-white font-bold text-lg">${price.toFixed(2)}</div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className={`p-2 rounded-md border transition-colors ${
                              inCart
                                ? 'bg-white text-black border-white'
                                : 'bg-black/40 text-white border-white hover:bg-black/60'
                            }`}
                            aria-label="Add to cart"
                          >
                            <FaShoppingBag size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(product);
                            }}
                            className="p-2 rounded-md border border-white bg-black/40 text-white hover:bg-black/60 transition-colors"
                            aria-label="Favorite"
                          >
                            <FaHeart size={18} className={isFav ? 'text-pink-400' : 'text-white'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <span className="text-sm font-medium capitalize text-gray-600 dark:text-gray-300">{img.category}</span>
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