import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, StarIcon, MapPinIcon } from 'lucide-react';
export interface CourtCardProps {
  id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}
export function CourtCard({
  name,
  location,
  sport,
  price,
  rating,
  reviews,
  imageUrl
}: CourtCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <motion.div
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      whileHover={{
        y: -4
      }}
      initial={{
        opacity: 0,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-50px'
      }}>
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <motion.img
          src={imageUrl}
          alt={`${name} court`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        

        {/* Badges & Actions */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-navy shadow-sm uppercase tracking-wider">
            {sport}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white transition-colors shadow-sm z-10"
          aria-label={isSaved ? 'Remove from saved' : 'Save court'}>
          
          <HeartIcon
            className={`w-5 h-5 transition-colors ${isSaved ? 'fill-brand-coral text-brand-coral' : 'text-brand-navy'}`} />
          
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-brand-navy line-clamp-1 group-hover:text-brand-coral transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <StarIcon className="w-4 h-4 fill-brand-navy text-brand-navy" />
            <span className="text-sm font-medium text-brand-navy">
              {rating}
            </span>
            <span className="text-sm text-brand-slate">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-brand-slate mb-4">
          <MapPinIcon className="w-4 h-4 shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-brand-border flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-brand-navy">${price}</span>
            <span className="text-sm text-brand-slate"> / hour</span>
          </div>
          <span className="text-sm font-medium text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">
            Available today
          </span>
        </div>
      </div>
    </motion.div>);

}