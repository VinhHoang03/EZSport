import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CalendarIcon, TrendingUpIcon, DollarSignIcon, Clock } from "lucide-react";

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    totalHours: 0,
    upcomingBookings: 0,
  });

  useEffect(() => {
    if (user?.id) {
      loadBookingStats();
    }
  }, [user?.id]);

  const loadBookingStats = async () => {
    try {
      const response = await fetch("http://localhost:3001/bookings");
      const allBookings = await response.json();
      const userBookings = allBookings.filter(
        (booking: Booking) => booking.userId === user?.id
      );

      setBookings(userBookings);

      const totalSpent = userBookings.reduce(
        (sum: number, b: Booking) => sum + b.totalPrice,
        0
      );
      const totalHours = userBookings.reduce(
        (sum: number, b: Booking) => sum + b.duration,
        0
      );
      const upcomingBookings = userBookings.filter(
        (b: Booking) => new Date(b.date) >= new Date()
      ).length;

      setStats({
        totalBookings: userBookings.length,
        totalSpent,
        totalHours,
        upcomingBookings,
      });
    } catch (error) {
      console.error("Failed to load booking stats:", error);
    }
  };

  const StatCard = ({
    icon: Icon,
    label,
    value,
    unit,
  }: {
    icon: any;
    label: string;
    value: number;
    unit?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-brand-border p-4 sm:p-6"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs sm:text-sm text-brand-slate font-medium">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-brand-navy mt-1">
            {value}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </p>
        </div>
        <div className="p-2 bg-brand-coral/10 rounded-lg">
          <Icon className="w-5 h-5 text-brand-coral" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy mb-1">
            Your Bookings
          </h2>
          <p className="text-sm text-brand-slate">
            Quick overview of your court bookings
          </p>
        </div>
        <button
          onClick={() => navigate("/bookings")}
          className="px-4 py-2 text-sm font-medium text-brand-coral hover:text-brand-navy transition-colors"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarIcon}
          label="Total Bookings"
          value={stats.totalBookings}
        />
        <StatCard
          icon={DollarSignIcon}
          label="Total Spent"
          value={stats.totalSpent}
          unit="$"
        />
        <StatCard icon={Clock} label="Total Hours" value={stats.totalHours} />
        <StatCard
          icon={TrendingUpIcon}
          label="Upcoming"
          value={stats.upcomingBookings}
        />
      </div>
    </div>
  );
}
