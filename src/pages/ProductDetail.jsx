import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { FaShoppingBag, FaHeart, FaArrowLeft } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

// ======= تحميل كل الصور =======
const webpModules = import.meta.glob('../assets/all products/**/*.webp', { eager: true });
const jpgModules  = import.meta.glob('../assets/all products/**/*.jpg',  { eager: true });
const jpegModules = import.meta.glob('../assets/all products/**/*.jpeg', { eager: true });
const pngModules  = import.meta.glob('../assets/all products/**/*.png',  { eager: true });

const allRawImages = [
  ...Object.entries(webpModules),
  ...Object.entries(jpgModules),
  ...Object.entries(jpegModules),
  ...Object.entries(pngModules),
].map(([path, mod]) => {
  const parts = path.split('/');
  const typeFolder = parts[parts.length - 2];
  const catFolder  = parts[parts.length - 3];
  const isTyped = /^t[yu]pe\s*\d+$/i.test(typeFolder);
  const category  = isTyped ? catFolder  : typeFolder;
  const typeLabel = isTyped ? typeFolder : 'type 1';
  return { id: path, src: mod.default, category, typeLabel, path };
});

const EXCLUDED = ['trending products', 'new arrivals', 'summer', 'winter'];
const allImages = allRawImages.filter(
  (img) => !EXCLUDED.some((ex) => img.path.toLowerCase().includes(ex.toLowerCase()))
);

// ======= أسعار ووصف =======
const priceByCategory = {
  bag: 49.99, Belt: 24.99, hat: 18.99, shoes: 79.99,
  shorts: 34.99, sunglasses: 28.99, 'tank top': 22.99, wallet: 37.99,
  'w-hat': 22.99, 'w-jeans': 54.99, 'w-pants': 49.99, 'w-shoes': 69.99,
  'w-shortes': 32.99, 'w-sport shoes': 79.99, 'w-sweater': 58.99,
  'w-t-shirt': 28.99, 'w-tanktop': 24.99,
};

const descriptionByCategory = {
  bag: 'Crafted from premium materials, this bag combines style and functionality.',
  Belt: 'A classic belt made from genuine leather. Adjustable and versatile.',
  hat: 'A stylish hat designed for comfort and protection.',
  shoes: 'Step up your style with these premium shoes. Designed for all-day comfort.',
  shorts: 'Lightweight and comfortable shorts perfect for warm weather.',
  sunglasses: 'Protect your eyes in style with UV-400 polarized lenses.',
  'tank top': 'A versatile tank top made from soft cotton blend.',
  wallet: 'A slim functional wallet with multiple card slots. Made from premium leather.',
  'w-hat': 'A chic women\'s hat that blends style and comfort effortlessly.',
  'w-jeans': 'Perfectly fitted women\'s jeans crafted for everyday elegance.',
  'w-pants': 'Stylish and comfortable pants for the modern woman.',
  'w-shoes': 'Elegant women\'s shoes designed for style and all-day comfort.',
  'w-shortes': 'Trendy women\'s shorts perfect for warm sunny days.',
  'w-sport shoes': 'Performance sport shoes built for active women.',
  'w-sweater': 'A cozy premium knit sweater for cool days.',
  'w-t-shirt': 'Soft and breathable women\'s t-shirt for everyday wear.',
  'w-tanktop': 'A lightweight tank top perfect for layering or wearing alone.',
};

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

// ألوان للـ swatches — يتناوب عليها كل type
const colorPalettes = [
  { name: 'Midnight',  hex: '#1a1a2e' },
  { name: 'Caramel',   hex: '#c19a6b' },
  { name: 'Slate',     hex: '#4a5568' },
  { name: 'Burgundy',  hex: '#7c2d3e' },
  { name: 'Olive',     hex: '#6b7c45' },
  { name: 'Sand',      hex: '#d4b896' },
  { name: 'Navy',      hex: '#1e3a5f' },
  { name: 'Rust',      hex: '#b5451b' },
  { name: 'Forest',    hex: '#2d5a27' },
  { name: 'Ivory',     hex: '#f5f0e8' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useShop();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const decodedId = decodeURIComponent(id);

  // نلاقي الصورة المطلوبة
  const clickedImage = allImages.find((img) => img.id === decodedId);

  // كل الـ types لهذا المنتج (نفس الـ category)
  // مجمّعة: { typeLabel, images: [...] }
  const typeGroups = useMemo(() => {
    if (!clickedImage) return [];
    const sameCategory = allImages.filter((img) => img.category === clickedImage.category);
    const map = new Map();
    for (const img of sameCategory) {
      if (!map.has(img.typeLabel)) map.set(img.typeLabel, []);
      map.get(img.typeLabel).push(img);
    }
    return Array.from(map.entries()).map(([typeLabel, images]) => ({ typeLabel, images }));
  }, [clickedImage]);

  // نعرف الـ type index الابتدائي بناءً على الصورة المضغوطة
  const initialTypeIndex = useMemo(() => {
    if (!clickedImage || typeGroups.length === 0) return 0;
    const idx = typeGroups.findIndex((g) => g.typeLabel === clickedImage.typeLabel);
    return idx >= 0 ? idx : 0;
  }, [clickedImage, typeGroups]);

  // نستخدم initialTypeIndex كقيمة ابتدائية للـ selectedTypeIndex
  const [typeIndex, setTypeIndex] = useState(() => initialTypeIndex);

  const currentGroup = typeGroups[typeIndex] ?? typeGroups[0];
  const currentImages = currentGroup?.images ?? [];
  const currentImage = currentImages[selectedImageIndex] ?? currentImages[0];

  // عند تغيير الـ type، نرجع للصورة الأولى
  const handleTypeChange = (idx) => {
    setTypeIndex(idx);
    setSelectedImageIndex(0);
  };

  if (!clickedImage || typeGroups.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const category = clickedImage.category;
  const price = priceByCategory[category] ?? 44.99;
  const description = descriptionByCategory[category] ?? 'A premium quality product for the modern lifestyle.';
  const selectedColor = colorPalettes[typeIndex % colorPalettes.length];
  const isFav = isFavorite(`${currentImage?.id}-${selectedSize || 'no-size'}`);
  const inCart = isInCart(`${currentImage?.id}-${selectedSize || 'no-size'}`);

  const cartProduct = {
    id: `${currentImage?.id}-${selectedSize || 'no-size'}`,
    src: currentImage?.src,
    category,
    price,
    size: selectedSize,
    color: selectedColor?.name,
    type: currentGroup?.typeLabel,
  };

  // عنوان المنتج: نحوّل "w-jeans" → "Jeans" و "tank top" → "Tank Top"
  const productTitle = category
    .replace(/^w-/, '')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
            <div className="rounded-xl overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800">
              <img
                key={currentImage?.id}
                src={currentImage?.src}
                alt={productTitle}
                className="w-full h-[480px] object-cover transition-opacity duration-300"
              />
            </div>

            {/* Thumbnails — صور نفس الـ type الحالي */}
            {currentImages.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {currentImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === idx
                        ? 'border-black dark:border-white scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== تفاصيل المنتج ===== */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                {category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {productTitle}
              </h1>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-3">
                ${price.toFixed(2)}
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {description}
            </p>

            {/* ===== Type / Color Swatches ===== */}
            {typeGroups.length > 1 && (
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Style
                  <span className="ml-2 font-normal text-gray-500 capitalize">
                    — {currentGroup?.typeLabel} · {selectedColor?.name}
                  </span>
                </p>
                <div className="flex gap-3 flex-wrap items-center">
                  {typeGroups.map((group, idx) => {
                    const color = colorPalettes[idx % colorPalettes.length];
                    const thumbSrc = group.images[0]?.src;
                    return (
                      <button
                        key={group.typeLabel}
                        onClick={() => handleTypeChange(idx)}
                        title={`${group.typeLabel} — ${color.name}`}
                        className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          typeIndex === idx
                            ? 'border-black dark:border-white scale-110 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        {/* صورة مصغرة */}
                        <img src={thumbSrc} alt={group.typeLabel} className="w-full h-full object-cover" />
                        {/* شريط لون في الأسفل */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1.5"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===== Size Selector ===== */}
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Size
                {selectedSize && (
                  <span className="ml-2 font-normal text-gray-500">— {selectedSize}</span>
                )}
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md border text-sm font-semibold transition-colors ${
                      selectedSize === size
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

            {/* ===== Buttons ===== */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  if (!selectedSize) return alert('Please select a size first!');
                  addToCart(cartProduct);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-colors ${
                  inCart
                    ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                    : 'bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <FaShoppingBag size={16} />
                {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite(cartProduct)}
                className={`p-3 rounded-full border transition-colors ${
                  isFav
                    ? 'border-pink-400 bg-pink-50 dark:bg-pink-900/20'
                    : 'border-gray-300 hover:border-pink-400 dark:border-gray-600'
                }`}
                aria-label="Favorite"
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

export default ProductDetail;
