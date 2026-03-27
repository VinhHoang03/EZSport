import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  StarIcon,
  UsersIcon,
  LayersIcon,
  ClockIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Court {
  id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  amenities?: string[];
  facilities?: string[];
  operatingHours?: string;
  maxPlayers?: number;
  surfaceType?: string;
  availability?: string;
  cancellationPolicy?: string;
  images?: string[];
}

interface CourtDetailProps {
  court: Court | null;
  isOpen: boolean;
  onClose: () => void;
  onBook?: () => void;
}

export function CourtDetail({
  court,
  isOpen,
  onClose,
  onBook,
}: CourtDetailProps) {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("09:00");
  const [bookingDuration, setBookingDuration] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [bookingMessage, setBookingMessage] = useState("");

  if (!court) return null;

  const images = court.images || [court.imageUrl];
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBooking = async () => {
    if (!bookingDate || !bookingTime) {
      setBookingStatus("error");
      setBookingMessage("Please select a complete date and time");
      return;
    }

    setIsBooking(true);
    setBookingStatus("idle");

    try {
      const booking = {
        userId: user?.id || "1",
        courtId: court.id,
        date: bookingDate,
        time: bookingTime,
        duration: bookingDuration,
        totalPrice: court.price * bookingDuration,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        setBookingStatus("success");
        setBookingMessage(
          `Booking successful! Total price: $${booking.totalPrice}`,
        );
        setBookingDate("");
        setBookingTime("09:00");
        setBookingDuration(1);
        if (onBook) onBook();
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      setBookingStatus("error");
      setBookingMessage("An error occurred while booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative"
              layoutId="court-detail-modal"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
                aria-label="Close modal"
              >
                <XIcon className="w-6 h-6 text-brand-navy" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {/* Image Gallery */}
                <div className="relative h-64 md:h-80 bg-brand-offWhite overflow-hidden">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={images[currentImageIndex]}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="w-5 h-5 text-brand-navy" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="w-5 h-5 text-brand-navy" />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-2 rounded-full transition-all ${
                              idx === currentImageIndex
                                ? "bg-brand-coral w-6"
                                : "bg-white/60 w-2 hover:bg-white"
                            }`}
                            aria-label={`Image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
                          {court.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-5 h-5 fill-brand-coral text-brand-coral" />
                            <span className="font-bold text-brand-navy">
                              {court.rating}
                            </span>
                          </div>
                          <span className="text-brand-slate text-sm">
                            ({court.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-brand-coral">
                          ${court.price}
                        </div>
                        <div className="text-xs text-brand-slate">per hour</div>
                      </div>
                    </div>
                    {court.description && (
                      <p className="text-brand-slate mt-3">
                        {court.description}
                      </p>
                    )}
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-brand-offWhite p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-brand-coral mb-1">
                        {court.sport}
                      </div>
                      <div className="text-xs text-brand-slate">Sport Type</div>
                    </div>
                    <div className="bg-brand-offWhite p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-brand-navy mb-1">
                        {court.maxPlayers}
                      </div>
                      <div className="text-xs text-brand-slate">
                        Max Players
                      </div>
                    </div>
                    <div className="bg-brand-offWhite p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-brand-navy mb-1 truncate">
                        {court.surfaceType}
                      </div>
                      <div className="text-xs text-brand-slate">Surface</div>
                    </div>
                    <div className="bg-brand-offWhite p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-brand-navy mb-1">
                        Open
                      </div>
                      <div className="text-xs text-brand-slate">
                        {court.availability}
                      </div>
                    </div>
                  </div>

                  {/* Location & Contact */}
                  <div className="space-y-3 py-4 border-y border-brand-border">
                    {court.address && (
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="w-5 h-5 text-brand-coral mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-brand-navy text-sm">
                            Address
                          </div>
                          <div className="text-brand-slate text-sm">
                            {court.address}
                          </div>
                        </div>
                      </div>
                    )}

                    {court.phone && (
                      <div className="flex items-start gap-3">
                        <PhoneIcon className="w-5 h-5 text-brand-coral mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-brand-navy text-sm">
                            Phone
                          </div>
                          <a
                            href={`tel:${court.phone}`}
                            className="text-brand-coral hover:text-brand-navy text-sm font-medium"
                          >
                            {court.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {court.email && (
                      <div className="flex items-start gap-3">
                        <MailIcon className="w-5 h-5 text-brand-coral mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-brand-navy text-sm">
                            Email
                          </div>
                          <a
                            href={`mailto:${court.email}`}
                            className="text-brand-coral hover:text-brand-navy text-sm font-medium"
                          >
                            {court.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {court.operatingHours && (
                      <div className="flex items-start gap-3">
                        <ClockIcon className="w-5 h-5 text-brand-coral mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-brand-navy text-sm">
                            Operating Hours
                          </div>
                          <div className="text-brand-slate text-sm">
                            {court.operatingHours}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  {court.amenities && court.amenities.length > 0 && (
                    <div>
                      <h3 className="font-bold text-brand-navy mb-3 flex items-center gap-2">
                        <LayersIcon className="w-5 h-5 text-brand-coral" />
                        Amenities
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {court.amenities.map((amenity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-brand-slate text-sm"
                          >
                            <CheckIcon className="w-4 h-4 text-brand-coral flex-shrink-0" />
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Facilities */}
                  {court.facilities && court.facilities.length > 0 && (
                    <div>
                      <h3 className="font-bold text-brand-navy mb-3 flex items-center gap-2">
                        <UsersIcon className="w-5 h-5 text-brand-coral" />
                        Facilities
                      </h3>
                      <div className="space-y-2">
                        {court.facilities.map((facility, idx) => (
                          <div key={idx} className="text-brand-slate text-sm">
                            • {facility}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cancellation Policy */}
                  {court.cancellationPolicy && (
                    <div className="bg-brand-offWhite p-4 rounded-lg">
                      <h4 className="font-bold text-brand-navy text-sm mb-2">
                        Cancellation Policy
                      </h4>
                      <p className="text-brand-slate text-sm">
                        {court.cancellationPolicy}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer with Booking Form */}
              <div className="border-t border-brand-border p-6 md:p-8 bg-brand-offWhite space-y-4">
                {/* Status Messages */}
                {bookingStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg"
                  >
                    <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{bookingMessage}</span>
                  </motion.div>
                )}
                {bookingStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg"
                  >
                    <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{bookingMessage}</span>
                  </motion.div>
                )}

                {/* Booking Form - Hidden after success */}
                {bookingStatus !== "success" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Date */}
                      <div>
                        <label className="block text-xs font-semibold text-brand-navy mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={getTodayDate()}
                          className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        />
                      </div>

                      {/* Time */}
                      <div>
                        <label className="block text-xs font-semibold text-brand-navy mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        />
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="block text-xs font-semibold text-brand-navy mb-2">
                          Duration (hours)
                        </label>
                        <select
                          value={bookingDuration}
                          onChange={(e) =>
                            setBookingDuration(Number(e.target.value))
                          }
                          className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                            <option key={hour} value={hour}>
                              {hour} hour(s)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-brand-border">
                      <span className="text-sm font-medium text-brand-slate">
                        {bookingDuration} hour(s) × ${court.price}/hour
                      </span>
                      <span className="text-lg font-bold text-brand-coral">
                        ${court.price * bookingDuration}
                      </span>
                    </div>
                  </>
                )}

                {/* Book Button / Close Button */}
                {bookingStatus === "success" ? (
                  <button
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-300 outline-none"
                  >
                    Close
                  </button>
                ) : (
                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full bg-brand-coral hover:bg-[#e0484d] disabled:bg-gray-400 text-white font-bold py-3 rounded-full transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-brand-coral/30 outline-none flex items-center justify-center gap-2"
                  >
                    {isBooking ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <ClockIcon className="w-5 h-5" />
                        </motion.div>
                        Booking...
                      </>
                    ) : (
                      <>Book Now</>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
