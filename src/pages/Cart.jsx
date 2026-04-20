import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="py-16 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
  <div className="flex items-center gap-3">
    <FaShoppingBag size={22} className="text-gray-900 dark:text-gray-100" />
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
      Cart
    </h1>
  </div>

  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => navigate('/')}
      className="px-4 py-2 rounded-md border border-gray-300 hover:border-black dark:border-gray-700 dark:hover:border-gray-200 text-gray-900 dark:text-gray-100"
    >
      ← Home
    </button>
    <buttonf
      type="button"
      onClick={() => navigate('/all-products')}
      className="px-4 py-2 rounded-md border border-gray-300 hover:border-black dark:border-gray-700 dark:hover:border-gray-200 text-gray-900 dark:text-gray-100"
    >
      Continue shopping
    </buttonf>
  </div>
</div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FaShoppingBag size={64} className="text-gray-200 dark:text-gray-700 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
              Looks like you haven't added anything yet. Start shopping and find something you love!
            </p>
            <button
              type="button"
              onClick={() => navigate('/all-products')}
              className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800"
                >
                  <img
                    src={item.src}
                    alt={item.category}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    {/* Category & Price */}
                    <div className="font-medium capitalize text-gray-900 dark:text-gray-100">
                      {item.category}
                    </div>
                    {item.size && (
  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
    Size: <span className="font-semibold">{item.size}</span>
  </div>
)}
                    <div className="mt-1 font-bold text-gray-900 dark:text-gray-100">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity Controls + Subtotal & Remove */}
                    <div className="mt-4 flex items-center justify-between">
                      
                      {/* + و − */}
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg font-medium"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-gray-900 dark:text-gray-100 font-semibold border-x border-gray-300 dark:border-gray-600">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, +1)}
                          className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg font-medium"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal + Remove */}
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-10 flex justify-end">
              <div className="text-right">
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                </div>
                <div className="text-gray-600 dark:text-gray-300">Total</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${total.toFixed(2)}
                </div>
              </div>
            </div>
            
<button
  type="button"
  onClick={() => navigate('/checkout')}
  className="mt-4 w-full px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
>
  Proceed to Checkout →
</button>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;