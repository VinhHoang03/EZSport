import React from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, CalendarIcon, TrophyIcon } from 'lucide-react';
const STEPS = [
{
  icon: SearchIcon,
  title: 'Search',
  description:
  'Find courts near you by sport, location, and time. Filter by price and amenities.'
},
{
  icon: CalendarIcon,
  title: 'Book',
  description:
  'Reserve your slot instantly with secure booking. No phone calls required.'
},
{
  icon: TrophyIcon,
  title: 'Play',
  description:
  'Show up, unlock the court with your digital pass, and enjoy your game.'
}];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy tracking-tight mb-4">
          How it works
        </h2>
        <p className="text-lg text-brand-slate max-w-2xl mx-auto">
          Get on the court in three simple steps. We make playing your favorite
          sports easier than ever.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connecting Line (Desktop only) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-brand-border z-0" />

        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              className="relative z-10 flex flex-col items-center text-center"
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.2
              }}>
              
              <div className="w-24 h-24 bg-white rounded-full border-4 border-brand-offWhite shadow-lg flex items-center justify-center mb-6 relative group">
                <div className="absolute inset-0 bg-brand-coral rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out opacity-10" />
                <Icon className="w-10 h-10 text-brand-coral" />

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-brand-navy mb-3">
                {step.title}
              </h3>
              <p className="text-brand-slate leading-relaxed">
                {step.description}
              </p>
            </motion.div>);

        })}
      </div>
    </section>);

}