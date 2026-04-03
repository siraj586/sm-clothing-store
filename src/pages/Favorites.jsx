import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Favorites = () => {
  const { favoriteItems, toggleFavorite } = useShop();
  const navigate = useNavigate();

  return (
    <section className="py-16 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaHeart size={22} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Favorites
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate('/all-products')}
            className="px-4 py-2 rounded-md border border-gray-300 hover:border-black dark:border-gray-700 dark:hover:border-gray-200 text-gray-900 dark:text-gray-100"
          >
            Back to products
          </button>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-300">
            You have no favorites yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 dark:text-gray-100"
              >
                <img
                  src={item.src}
                  alt={item.category}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium capitalize text-gray-900 dark:text-gray-100">
                      {item.category}
                    </div>
                    <div className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(item)}
                    className="px-3 py-2 rounded-md border border-pink-300 hover:border-pink-500 text-sm text-pink-600 dark:border-pink-800 dark:text-pink-300 dark:hover:border-pink-600"
                    aria-label="Remove from favorites"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;

