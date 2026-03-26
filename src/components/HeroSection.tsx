import React from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1551773188-d4f40b30fc62?w=1600&q=80"
          alt="Aerial view of a sports court"
          className="w-full h-full object-cover object-center" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/40 to-brand-navy/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-12">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.1
          }}>
          
          Find your perfect court. <br className="hidden md:block" />
          <span className="text-brand-coral">Play your best game.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl font-medium"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.2
          }}>
          
          Book premium tennis, basketball, and padel courts near you in seconds.
          No memberships required.
        </motion.p>

        <motion.div
          className="w-full"
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.3
          }}>
          
          <SearchBar />
        </motion.div>
      </div>
    </section>);

}