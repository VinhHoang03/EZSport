import React from 'react';
import { motion } from 'framer-motion';
import { CourtCard } from '../CourtCard';
const FAVORITE_COURTS = [
{
  id: '1',
  name: 'Grand Slam Tennis Center',
  location: 'Downtown Metro, Westside',
  sport: 'Tennis',
  price: 45,
  rating: 4.9,
  reviews: 128,
  imageUrl:
  'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80'
},
{
  id: '3',
  name: 'Sunset Padel Club',
  location: 'Marina Bay',
  sport: 'Padel',
  price: 55,
  rating: 4.9,
  reviews: 215,
  imageUrl:
  'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80'
},
{
  id: '4',
  name: 'City Center Pitch',
  location: 'Financial District',
  sport: 'Football',
  price: 80,
  rating: 4.7,
  reviews: 67,
  imageUrl:
  'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80'
}];

export function FavoriteCourts() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -10
      }}
      className="max-w-6xl">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">
          Favorite Courts
        </h2>
        <p className="text-brand-slate">
          Courts you've saved for quick booking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FAVORITE_COURTS.map((court) =>
        <CourtCard key={court.id} {...court} />
        )}
      </div>

      {FAVORITE_COURTS.length === 0 &&
      <div className="bg-white rounded-2xl border border-brand-border p-12 text-center">
          <p className="text-brand-slate">You haven't saved any courts yet.</p>
        </div>
      }
    </motion.div>);

}