import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useShop();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="py-16 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaShoppingBag size={22} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Cart
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate('/all-products')}
            className="px-4 py-2 rounded-md border border-gray-300 hover:border-black dark:border-gray-700 dark:hover:border-gray-200 text-gray-900 dark:text-gray-100"
          >
            Continue shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-300">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 dark:text-gray-100"
                >
                  <img
                    src={item.src}
                    alt={item.category}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <div className="font-medium capitalize text-gray-900 dark:text-gray-100">
                      {item.category}
                    </div>
                    <div className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                      ${item.price.toFixed(2)}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-4 px-3 py-2 rounded-md border border-gray-300 hover:border-black dark:border-gray-700 dark:hover:border-gray-200 text-sm text-gray-900 dark:text-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-end">
              <div className="text-right">
                <div className="text-gray-600 dark:text-gray-300">Total</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${total.toFixed(2)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;

