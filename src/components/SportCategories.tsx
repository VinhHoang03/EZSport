import React from "react";
import { motion } from "framer-motion";
import {
  CircleDotIcon,
  DribbbleIcon,
  ActivityIcon,
  WindIcon,
  GoalIcon,
} from "lucide-react";
import { SPORT_CATEGORIES } from "../data/mockData";

export function SportCategories() {
  return (
    <section className="py-16 bg-white border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-8">
          Browse by Sport
        </h2>

        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 sm:gap-6 snap-x hide-scrollbar">
          {SPORT_CATEGORIES.map((category, index) => {
            const icons = [
              CircleDotIcon,
              DribbbleIcon,
              ActivityIcon,
              GoalIcon,
              WindIcon,
              CircleDotIcon,
            ];
            const Icon = icons[index] || CircleDotIcon;

            return (
              <motion.div
                key={category.name}
                className="flex-none w-40 sm:w-48 group cursor-pointer snap-start"
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
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -4,
                }}
              >
                <div className="bg-brand-offWhite border border-brand-border rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full transition-all duration-300 group-hover:border-brand-coral group-hover:shadow-md group-hover:bg-white">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand-coral/10 transition-colors">
                    <Icon className="w-7 h-7 text-brand-navy group-hover:text-brand-coral transition-colors" />
                  </div>
                  <h3 className="font-bold text-brand-navy mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-brand-slate">{category.count}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
