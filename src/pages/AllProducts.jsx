const imageModules = import.meta.glob(
  '../assets/all products/**/*.webp',
  { eager: true }
);

const categories = ['All', 'bag', 'Belt', 'hat', 'shoes', 'shorts', 'sunglasses', 'tank top', 'wallet'];

const allImages = Object.entries(imageModules).map(([path, mod]) => {
  const parts = path.split('/');
  const category = parts[parts.length - 2];
  return { src: mod.default, category };
});

import { useState } from 'react';

const AllProducts = () => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? allImages
    : allImages.filter(img => img.category === active);

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full border font-medium transition-colors duration-200 
                ${active === cat 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-black'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((img, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img
                src={img.src}
                alt={img.category}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3">
                <span className="text-sm font-medium capitalize text-gray-600">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;