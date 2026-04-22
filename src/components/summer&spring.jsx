import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import imgTshirt from '../assets/all products/summer/tshirt-black.jpg';
import imgShorts from '../assets/all products/summer/ripped-jeans.webp';
import imgNavyLinen from '../assets/all products/summer/shirt-navy-linen.jpg';
import imgBlueLinen from '../assets/all products/summer/shirt-blue-linen.jpg';
import imgBeigeLinen from '../assets/all products/summer/shirt-beige-linen.jpg';
import imgJeans from '../assets/all products/summer/denim-shorts.webp';

const items = [
  { img: imgNavyLinen, label: 'Linen Shirt', tag: 'BESTSELLER', span: 'row-span-2' },
  { img: imgTshirt, label: 'Classic Tee', tag: 'NEW', span: '' },
  { img: imgShorts, label: 'Denim Shorts', tag: 'SUMMER', span: '' },
  { img: imgBlueLinen, label: 'Blue Linen', tag: 'NEW', span: '' },
  { img: imgBeigeLinen, label: 'Beige Linen', tag: 'SUMMER', span: '' },
  { img: imgJeans, label: 'Ripped Jeans', tag: 'TRENDING', span: '' },
];

const tagColors = {
  BESTSELLER: 'bg-amber-400 text-black',
  NEW: 'bg-white text-black',
  SUMMER: 'bg-sky-400 text-white',
  TRENDING: 'bg-rose-500 text-white',
};

const SummerSpring = () => {
  return (
    <section className="
      bg-zinc-100 dark:bg-zinc-950
      text-gray-900 dark:text-white
      py-20 overflow-hidden transition-colors duration-300
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.4em] text-zinc-400 dark:text-zinc-500 uppercase mb-3">
              Limited Drop · 2025
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-gray-900 dark:text-white">
              SPRING /
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">SUMMER</span>
            </h2>
          </div>

          <div className="md:text-right max-w-sm">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-5">
              Fresh colors, lightweight fabrics and modern silhouettes — built for the warm season ahead.
            </p>
            <Link
              to="/all-products"
              className="
                inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full
                border border-gray-900 dark:border-white
                text-gray-900 dark:text-white
                hover:bg-gray-900 hover:text-white
                dark:hover:bg-white dark:hover:text-black
                transition-all duration-300
              "
            >
              Shop the Collection <span>→</span>
            </Link>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[280px] md:auto-rows-[320px]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className={`relative overflow-hidden group cursor-pointer rounded-xl ${item.span}`}
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay — lighter in light mode */}
              <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

              {/* Tag */}
              <span className={`absolute top-3 left-3 text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full ${tagColors[item.tag]}`}>
                {item.tag}
              </span>

              {/* Label on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-bold text-sm tracking-wide">{item.label}</p>
                <p className="text-zinc-300 text-xs mt-0.5">Summer 2025</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase"
        >
          {['Free Shipping over $50', 'New Drops Weekly', 'Easy Returns'].map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600 inline-block" />
              {t}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SummerSpring;
