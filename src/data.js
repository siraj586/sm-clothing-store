import img1 from "./assets/all products/trending products/photo-1591047139829-d91aecb6caea.jpeg";
import img2 from "./assets/all products/trending products/photo-1581655353564-df123a1eb820.jpeg";
import img3 from "./assets/all products/trending products/photo-1473966968600-fa801b869a1a.jpeg";
import img4 from "./assets/all products/new arrivals/photo-1620799140188-3b2a02fd9a77.jpeg";
import img5 from "./assets/all products/new arrivals/photo-1556821840-3a63f95609a7.jpeg";
import img6 from "./assets/all products/new arrivals/photo-1594633312681-425c7b97ccd1.jpeg";
import img7 from "./assets/all products/new arrivals/photo-1525966222134-fcfa99b8ae77.jpeg";
import img8 from "./assets/all products/new arrivals/photo-1556905055-8f358a7a47b2.jpeg";

// ===== مثال: القميص الكتان عنده 3 ألوان =====
// import shirtBeige from "./assets/all products/summer/shirt-beige-linen.jpg";
// import shirtBlue  from "./assets/all products/summer/shirt-blue-linen.jpg";
// import shirtNavy  from "./assets/all products/summer/shirt-navy-linen.jpg";

export const trendingProducts = [
  {
    id: 1,
    title: "Classic Denim Jacket",
    price: 89.00,
    originalPrice: null,
    image: img8,          // الصورة الافتراضية (تظهر في الكارد)
    // images: مصفوفة الألوان — اشيل التعليق وأضيف الصور الحقيقية
    // images: [
    //   { src: img8,      color: 'Indigo', hex: '#3b4d8a' },
    //   { src: img_dark,  color: 'Black',  hex: '#1a1a1a' },
    //   { src: img_light, color: 'White',  hex: '#f0f0ec' },
    // ],
    badge: "SALE",
    rating: 4.5,
    reviewCount: 68,
  },
  {
    id: 2,
    title: "Cotton Overshirt",
    price: 75.00,
    originalPrice: null,
    image: img1,
    badge: "NEW",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 3,
    title: "Relaxed Fit Tee",
    price: 35.00,
    originalPrice: 45.00,
    image: img2,
    badge: "SALE",
    rating: 4.3,
    reviewCount: 92,
  },
  {
    id: 4,
    title: "Cargo Pants",
    price: 78.00,
    originalPrice: null,
    image: img3,
    badge: "ORIGINAL",
    rating: 4.6,
    reviewCount: 45,
  }
];

export const newArrivals = [
  {
    id: 5,
    title: "Premium Knit Sweater",
    price: 85.00,
    originalPrice: null,
    image: img4,
    badge: "NEW",
    rating: 4.7,
    reviewCount: 42,
  },
  {
    id: 6,
    title: "Casual Graphic Hoodie",
    price: 65.50,
    originalPrice: 80.00,
    image: img5,
    badge: "SALE",
    rating: 4.5,
    reviewCount: 112,
  },
  {
    id: 7,
    title: "Slim Fit Chino Pants",
    price: 75.00,
    originalPrice: null,
    image: img6,
    badge: null,
    rating: 4.4,
    reviewCount: 89,
  },
  {
    id: 8,
    title: "Canvas High-Top Sneakers",
    price: 110.00,
    originalPrice: null,
    image: img7,
    badge: "NEW",
    rating: 4.9,
    reviewCount: 34,
  }
];
