import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, TrophyIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Booking {
  id?: string;
  userId: string;
  courtId: string;
  date: string;
  time: string;
  duration: number;
  totalPrice: number;
  createdAt: string;
}

export function BookingStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { label: 'Upcoming Bookings', value: '0', icon: CalendarIcon, color: 'text-brand-coral', bgColor: 'bg-brand-coral/10' },
    { label: 'Total Hours', value: '0', icon: ClockIcon, color: 'text-brand-teal', bgColor: 'bg-brand-teal/10' },
    { label: 'Courts Visited', value: '0', icon: TrophyIcon, color: 'text-brand-navy', bgColor: 'bg-brand-navy/10' }
  ]);

  useEffect(() => {
    if (user?.id) {
      loadStats();
    }
  }, [user?.id]);

  const loadStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/bookings');
      const allBookings = await response.json();
      const userBookings = allBookings.filter((booking: Booking) => booking.userId === user?.id);

      const upcomingBookings = userBookings.filter(
        (b: Booking) => new Date(b.date) >= new Date()
      ).length;

      const totalHours = userBookings.reduce(
        (sum: number, b: Booking) => sum + b.duration,
        0
      );

      const courtsVisited = new Set(userBookings.map((b: Booking) => b.courtId)).size;

      setStats([
        { label: 'Upcoming Bookings', value: upcomingBookings.toString(), icon: CalendarIcon, color: 'text-brand-coral', bgColor: 'bg-brand-coral/10' },
        { label: 'Total Hours', value: totalHours.toString(), icon: ClockIcon, color: 'text-brand-teal', bgColor: 'bg-brand-teal/10' },
        { label: 'Courts Visited', value: courtsVisited.toString(), icon: TrophyIcon, color: 'text-brand-navy', bgColor: 'bg-brand-navy/10' }
      ]);
    } catch (error) {
      console.error('Failed to load booking stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.1
            }}
            className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex items-center gap-4">
            
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${stat.bgColor}`}>
              
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-brand-slate mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-brand-navy">{stat.value}</p>
            </div>
          </motion.div>);

      })}
    </div>);

}