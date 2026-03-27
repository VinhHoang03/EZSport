import React from "react";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Tennis Enthusiast",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    quote:
      "EZSport completely changed how I play tennis. No more calling clubs to check availability. I can book a court in 30 seconds from my phone.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Weekend Basketballer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    quote:
      "Finding an indoor court during winter used to be impossible. Now my friends and I have a regular weekly game booked through the platform.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Padel Beginner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    quote:
      "The interface is so clean and easy to use. I love being able to see photos of the courts before I book them. Highly recommended!",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Loved by players everywhere
          </h2>
          <p className="text-lg text-brand-slate max-w-2xl mx-auto">
            Join thousands of athletes who use EZSport to find and reserve their
            perfect playing space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.2,
              }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? "fill-brand-coral text-brand-coral" : "text-white/20"}`}
                  />
                ))}
              </div>

              <p className="text-lg text-white/90 mb-8 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />

                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-brand-slate">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
