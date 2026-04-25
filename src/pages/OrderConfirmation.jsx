import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaBoxOpen, FaTruck, FaHome, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderNumber] = useState(() => `SM-${Math.floor(100000 + Math.random() * 900000)}`);

  // لو حد فتح الصفحة مباشرة بدون data
  useEffect(() => {
    if (!state?.form) navigate('/');
  }, [state, navigate]);

  if (!state?.form) return null;

  const { form, cartItems = [], total = 0, subtotal = 0, shipping = 0, discountAmount = 0 } = state;

  const steps = [
    { icon: FaCheckCircle, label: 'Order Confirmed', done: true },
    { icon: FaBoxOpen,     label: 'Processing',      done: false },
    { icon: FaTruck,       label: 'On the Way',      done: false },
    { icon: FaHome,        label: 'Delivered',        done: false },
  ];

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const dateStr = estimatedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ===== Success Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="flex justify-center mb-4"
          >
            <FaCheckCircle size={64} className="text-green-500" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Thank you, {form.firstName}! 🎉
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Your order has been placed successfully.
          </p>
          <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-5 py-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Order #</span>
            <span className="ml-1 text-sm font-bold text-gray-900 dark:text-gray-100 tracking-widest">
              {orderNumber}
            </span>
          </div>
        </motion.div>

        {/* ===== Order Tracking Steps ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-widest">
            Order Status
          </h2>
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 z-0" />
            <div className="absolute top-5 left-[10%] w-[5%] h-0.5 bg-green-500 z-0" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex flex-col items-center z-10 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step.done
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-600'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <p className={`text-xs mt-2 text-center font-medium ${
                    step.done ? 'text-green-500' : 'text-gray-400 dark:text-gray-600'
                  }`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-5">
            🗓 Estimated delivery: <span className="font-semibold text-gray-700 dark:text-gray-300">{dateStr}</span>
          </p>
        </motion.div>

        {/* ===== Order Items ===== */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-widest">
              Items Ordered
            </h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.src}
                    alt={item.category}
                    className="w-14 h-14 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize truncate">
                      {item.category}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {item.size && `Size: ${item.size} · `}Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Shipping</span><span>{shipping === 0 ? '🎉 Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span><span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 text-base pt-2 border-t border-gray-100 dark:border-gray-800">
                <span>Total Paid</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== Shipping Info ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-widest">
            Shipping To
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {form.firstName} {form.lastName}
            </p>
            <p>{form.address}</p>
            <p>{form.city}{form.zip ? `, ${form.zip}` : ''} · {form.country}</p>
            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-gray-500">
              <FaEnvelope size={12} />
              <span>{form.email}</span>
            </div>
          </div>
        </motion.div>

        {/* ===== CTA Buttons ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/all-products"
            className="flex-1 text-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="flex-1 text-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-full font-semibold hover:border-black dark:hover:border-white transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default OrderConfirmation;
