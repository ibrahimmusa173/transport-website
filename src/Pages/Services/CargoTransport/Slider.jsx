


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "John",
    title: "Operations Director",
    quote: "Outstanding reliability and efficiency!",
    text: "Their heavy-duty fleet solutions transformed our supply chain operations. The real-time GPS tracking and preventive maintenance programs .",
  },
  {
    name: "Jane",
    title: "Logistics Manager",
    quote: "Truly revolutionary!",
    text: "Thanks to their advanced tracking tools, our deliveries are always on schedule. I highly recommend their services to any logistics firm.",
  },
  {
    name: "Michael",
    title: "Fleet Supervisor",
    quote: "Unmatched service quality!",
    text: "Their support team is top-notch. They always respond promptly and help us maintain peak efficiency in fleet operations.",
  },
];

function Practice1() {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const testimonial = testimonials[index];

  return (
    <div className="my-20 px-4 sm:px-10 md:px-40 py-10 border border-gray-200 shadow-lg rounded-2xl bg-white">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        What Our Clients Say About Us
      </h2>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6"
          >
            <p className="text-xl font-bold text-indigo-700">{testimonial.name}</p>
            <p className="text-indigo-500 mb-4">{testimonial.title}</p>
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
              {testimonial.quote}
            </h3>
            <p className="text-indigo-600 text-lg">{testimonial.text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center space-x-8">
          <button
            onClick={prevTestimonial}
            className="text-indigo-600 hover:text-indigo-800 transition"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={nextTestimonial}
            className="text-indigo-600 hover:text-indigo-800 transition"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Practice1;
