import React from "react";
import { motion } from "framer-motion";
export function CTABanner() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        className="relative rounded-3xl overflow-hidden bg-brand-navy shadow-2xl"
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-coral rounded-full blur-[128px] opacity-40" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-brand-teal rounded-full blur-[128px] opacity-30" />

        <div className="relative z-10 px-6 py-16 md:py-20 md:px-12 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 max-w-2xl">
            Ready to hit the court?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">
            Join EZSport today and get 10% off your first booking. No
            subscription required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="px-8 py-4 bg-brand-coral hover:bg-[#e0484d] text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Sign up for free
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg transition-all backdrop-blur-sm">
              List your court
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
