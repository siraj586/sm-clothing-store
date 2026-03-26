import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Michael T.",
    text: "The quality of these t-shirts is unbelievable for the price. They fit perfectly and haven't shrunk at all after multiple washes. Will definitely be buying more in different colors.",
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    name: "David R.",
    text: "Fast shipping and excellent customer service. Had to exchange a jacket for a different size and the process was completely seamless. Highly recommend this store!",
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    name: "James L.",
    text: "I've practically replaced my entire casual wardrobe with SM clothing. The designs are minimalist but very stylish, and the fabrics feel premium.",
    rating: 5,
    verified: true,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2">Based on 10,000+ reviews</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">Verified Buyer</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;