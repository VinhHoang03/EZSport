import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, TrophyIcon } from 'lucide-react';
const STATS = [
{
  label: 'Upcoming Matches',
  value: '3',
  icon: CalendarIcon,
  color: 'text-brand-coral',
  bgColor: 'bg-brand-coral/10'
},
{
  label: 'Hours Played',
  value: '24.5',
  icon: ClockIcon,
  color: 'text-brand-teal',
  bgColor: 'bg-brand-teal/10'
},
{
  label: 'Courts Visited',
  value: '8',
  icon: TrophyIcon,
  color: 'text-brand-navy',
  bgColor: 'bg-brand-navy/10'
}];

export function BookingStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {STATS.map((stat, index) => {
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