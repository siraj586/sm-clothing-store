import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { FaCheck, FaLock } from "react-icons/fa";

const steps = ["Personal Info", "Shipping", "Payment", "Review"];

const DISCOUNT_CODES = { SM10: 10, SM20: 20, SAVE15: 15 };

const Checkout = () => {
  const { cartItems, removeFromCart } = useShop();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
    discountCode: "",
    appliedDiscount: 0,
    discountError: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const discountAmount = (subtotal * form.appliedDiscount) / 100;
  const total = subtotal - discountAmount + shipping;

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const applyDiscount = () => {
    const code = form.discountCode.trim().toUpperCase();
    if (DISCOUNT_CODES[code]) {
      update("appliedDiscount", DISCOUNT_CODES[code]);
      update("discountError", "");
    } else {
      update("appliedDiscount", 0);
      update("discountError", "Invalid discount code");
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handlePlaceOrder = () => {
    const orderData = {
      form,
      cartItems: [...cartItems],
      total,
      subtotal,
      shipping,
      discountAmount,
    };
    cartItems.forEach((item) => removeFromCart(item.id));
    navigate('/order-confirmation', { state: orderData });
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/all-products")}
            className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-black dark:focus:border-gray-300 transition-colors";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
          Checkout
        </h1>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    index < currentStep
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : index === currentStep
                        ? "bg-black text-white dark:bg-white dark:text-black ring-4 ring-black/20"
                        : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  {index < currentStep ? <FaCheck size={12} /> : index + 1}
                </div>
                <span
                  className={`text-xs mt-1 font-medium hidden sm:block ${
                    index === currentStep
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-2 mb-4 transition-colors ${
                    index < currentStep
                      ? "bg-black dark:bg-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">

              {/* Step 1 - Personal Info */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Personal Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input className={inputClass} placeholder="John"
                        value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input className={inputClass} placeholder="Doe"
                        value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input className={inputClass} type="email" placeholder="john@example.com"
                      value={form.email} onChange={(e) => update("email", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input className={inputClass} type="tel" placeholder="+1 555 000 0000"
                      value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>
                </div>
              )}

              {/* Step 2 - Shipping */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Shipping Address
                  </h2>
                  <div>
                    <label className={labelClass}>Street Address</label>
                    <input className={inputClass} placeholder="123 Fashion Street"
                      value={form.address} onChange={(e) => update("address", e.target.value)} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>City</label>
                      <input className={inputClass} placeholder="New York"
                        value={form.city} onChange={(e) => update("city", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>ZIP Code</label>
                      <input className={inputClass} placeholder="10001"
                        value={form.zip} onChange={(e) => update("zip", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <input className={inputClass} placeholder="United States"
                      value={form.country} onChange={(e) => update("country", e.target.value)} />
                  </div>
                </div>
              )}

              {/* Step 3 - Payment */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Payment Method
                  </h2>
                  <div className="flex gap-3">
                    {["card", "cash"].map((method) => (
                      <button key={method} type="button"
                        onClick={() => update("paymentMethod", method)}
                        className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-colors capitalize ${
                          form.paymentMethod === method
                            ? "bg-black text-white border-black dark:bg-white dark:text-black"
                            : "border-gray-300 text-gray-700 hover:border-black dark:border-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {method === "card" ? "💳 Credit Card" : "💵 Cash on Delivery"}
                      </button>
                    ))}
                  </div>

                  {form.paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass}>Card Number</label>
                        <input className={inputClass} placeholder="1234 5678 9012 3456"
                          maxLength={19} value={form.cardNumber}
                          onChange={(e) => update("cardNumber", e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>Cardholder Name</label>
                        <input className={inputClass} placeholder="John Doe"
                          value={form.cardName} onChange={(e) => update("cardName", e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Expiry Date</label>
                          <input className={inputClass} placeholder="MM/YY" maxLength={5}
                            value={form.cardExpiry} onChange={(e) => update("cardExpiry", e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>CVV</label>
                          <input className={inputClass} placeholder="123" maxLength={3}
                            type="password" value={form.cardCVV}
                            onChange={(e) => update("cardCVV", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}

                  {form.paymentMethod === "cash" && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300">
                      💡 Pay when your order arrives at your door. No extra fees.
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>Discount Code</label>
                    <div className="flex gap-2">
                      <input className={inputClass} placeholder="e.g. SM10"
                        value={form.discountCode}
                        onChange={(e) => update("discountCode", e.target.value)} />
                      <button type="button" onClick={applyDiscount}
                        className="px-4 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap">
                        Apply
                      </button>
                    </div>
                    {form.discountError && (
                      <p className="text-red-500 text-xs mt-1">{form.discountError}</p>
                    )}
                    {form.appliedDiscount > 0 && (
                      <p className="text-green-500 text-xs mt-1">
                        ✓ {form.appliedDiscount}% discount applied!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4 - Review */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Review Your Order
                  </h2>
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img src={item.src} alt={item.category}
                          className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="font-medium capitalize text-gray-900 dark:text-gray-100">
                            {item.category}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          {/* ✅ Size بالـ Review */}
                          {item.size && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Size: <span className="font-semibold">{item.size}</span>
                            </p>
                          )}
                        </div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>📦 Ship to:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {form.address}, {form.city}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>💳 Payment:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                        {form.paymentMethod === "card" ? "Credit Card" : "Cash on Delivery"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button type="button"
                  onClick={() => currentStep === 0 ? navigate("/cart") : handleBack()}
                  className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-gray-300 transition-colors"
                >
                  ← Back
                </button>

                {currentStep < steps.length - 1 ? (
                  <button type="button" onClick={handleNext}
                    className="px-8 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Next →
                  </button>
                ) : (
                  <button type="button" onClick={handlePlaceOrder}
                    className="px-8 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <FaLock size={12} />
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 capitalize">
                        {item.category} × {item.quantity}
                      </span>
                      {/* ✅ Size بالـ Order Summary */}
                      {item.size && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "🎉 Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {form.appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount ({form.appliedDiscount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 text-base pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;