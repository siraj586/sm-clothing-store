import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaShoppingBag, FaHeart, FaArrowLeft, FaStar } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';
import { trendingProducts, newArrivals } from '../data';

const allHomeProducts = [...trendingProducts, ...newArrivals];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const HomeProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useShop();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const productId = parseInt(id);
  const product = allHomeProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // إذا المنتج عنده مصفوفة images (ألوان متعددة) نستخدمها، وإلا نحط الصورة الوحيدة
  const colorVariants = product.images && product.images.length > 0
    ? product.images
    : [{ src: product.image, color: 'Default', hex: '#1a1a1a' }];

  const currentVariant = colorVariants[selectedColorIndex] ?? colorVariants[0];
  const currentImage = currentVariant.src ?? currentVariant;

  const isFav = isFavorite(`home-${product.id}-${selectedSize || 'no-size'}-${selectedColorIndex}`);
  const inCart = isInCart(`home-${product.id}-${selectedSize || 'no-size'}-${selectedColorIndex}`);

  const cartProduct = {
    id: `home-${product.id}-${selectedSize || 'no-size'}-${selectedColorIndex}`,
    src: currentImage,
    category: product.title,
    price: product.price,
    size: selectedSize,
    color: currentVariant.color,
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-8 transition-colors"
        >
          <FaArrowLeft size={14} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ===== قسم الصور ===== */}
          <div className="flex flex-col gap-4">

            {/* الصورة الرئيسية */}
            <div className="rounded-xl overflow-hidden shadow-lg relative">
              <img
                src={currentImage}
                alt={product.title}
                className="w-full h-[480px] object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails — تظهر بس إذا في أكتر من لون */}
            {colorVariants.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {colorVariants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedColorIndex === index
                        ? 'border-black dark:border-white scale-105 shadow-md'
                        : 'border-transparent hover:border-gray-400 opacity-70 hover:opacity-100'
                      }`}
                    title={variant.color}
                  >
                    <img
                      src={variant.src}
                      alt={variant.color}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== تفاصيل المنتج ===== */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} size={16} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-3">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${product.price.toFixed(2)}
                </p>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* ===== Color Swatches — تظهر بس إذا في أكتر من لون ===== */}
            {colorVariants.length > 1 && (
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Color
                  <span className="ml-2 font-normal text-gray-500">
                    — {currentVariant.color}
                  </span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {colorVariants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColorIndex(index)}
                      title={variant.color}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColorIndex === index
                          ? 'border-black dark:border-white scale-110 shadow-md'
                          : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                        }`}
                      style={{ backgroundColor: variant.hex ?? '#ccc' }}
                      aria-label={variant.color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Select Size
                {selectedSize && <span className="ml-2 font-normal text-gray-500">— {selectedSize}</span>}
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md border text-sm font-semibold transition-colors ${selectedSize === size
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-red-400 mt-2">Please select a size to add to cart</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  if (!selectedSize) return alert('Please select a size first!');
                  addToCart(cartProduct);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-colors ${inCart
                    ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                  }`}
              >
                <FaShoppingBag size={16} />
                {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite(cartProduct)}
                className={`p-3 rounded-full border transition-colors ${isFav
                    ? 'border-pink-400 bg-pink-50 dark:bg-pink-900/20'
                    : 'border-gray-300 hover:border-pink-400 dark:border-gray-600'
                  }`}
              >
                <FaHeart size={18} className={isFav ? 'text-pink-400' : 'text-gray-400'} />
              </button>
            </div>

            {/* Extra Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ Free returns within 30 days</p>
              <p>✓ Authentic premium quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProductDetail;
