import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  MapPinIcon,
  XIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Booking {
  id?: string;
  userId: string;
  courtId: string;
  courtName?: string;
  location?: string;
  date: string;
  time: string;
  duration: number;
  totalPrice: number;
  createdAt: string;
}

interface Court {
  id: string;
  name: string;
  location: string;
  sport: string;
}

export function BookingHistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Normalize userId for comparison (ensure string)
        const userId = String(user?.id || "");
        console.log("📚 Fetching bookings for user:", userId);

        // Fetch bookings with timeout
        const bookingsController = new AbortController();
        const bookingsTimeout = setTimeout(
          () => bookingsController.abort(),
          10000,
        ); // 10s timeout

        const bookingsResponse = await fetch("http://localhost:3001/bookings", {
          signal: bookingsController.signal,
        });
        clearTimeout(bookingsTimeout);

        if (!bookingsResponse.ok) {
          throw new Error(`Bookings API error: ${bookingsResponse.status}`);
        }

        const bookingsData = await bookingsResponse.json();
        console.log("✓ Bookings fetched:", bookingsData.length);

        // Filter bookings for current user - ensure string comparison
        const userBookings = bookingsData.filter(
          (booking: Booking) => String(booking.userId) === userId,
        );
        console.log("✓ User bookings:", userBookings.length);

        // Fetch courts with timeout
        const courtsController = new AbortController();
        const courtsTimeout = setTimeout(() => courtsController.abort(), 10000); // 10s timeout

        const courtsResponse = await fetch("http://localhost:3001/courts", {
          signal: courtsController.signal,
        });
        clearTimeout(courtsTimeout);

        if (!courtsResponse.ok) {
          throw new Error(`Courts API error: ${courtsResponse.status}`);
        }

        const courtsData = await courtsResponse.json();
        console.log("✓ Courts fetched:", courtsData.length);

        // Merge court details with bookings
        const enrichedBookings = userBookings.map((booking: Booking) => {
          const court = courtsData.find((c: Court) => c.id === booking.courtId);
          return {
            ...booking,
            courtName: court?.name || "Unknown Court",
            location: court?.location || "Unknown Location",
          };
        });

        setBookings(
          enrichedBookings.sort(
            (a: Booking, b: Booking) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
        console.log("✓ Bookings loaded successfully");
      } catch (err: any) {
        const errorMsg =
          err?.name === "AbortError"
            ? "Request timeout - Server not responding. Make sure json-server is running on port 3001"
            : `Failed to load booking history: ${err?.message}`;
        setError(errorMsg);
        console.error("❌ Booking fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const handleCancelBooking = async (bookingId?: string) => {
    if (!bookingId) return;
    try {
      console.log("🗑️ Canceling booking:", bookingId);

      const cancelController = new AbortController();
      const cancelTimeout = setTimeout(() => cancelController.abort(), 10000);

      const response = await fetch(
        `http://localhost:3001/bookings/${bookingId}`,
        {
          method: "DELETE",
          signal: cancelController.signal,
        },
      );
      clearTimeout(cancelTimeout);

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      setBookings(bookings.filter((b) => b.id !== bookingId));
      console.log("✓ Booking canceled successfully");
    } catch (err: any) {
      const errorMsg =
        err?.name === "AbortError"
          ? "Cancellation timeout - Server not responding"
          : `Failed to cancel booking: ${err?.message}`;
      setError(errorMsg);
      console.error("❌ Cancel error:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex-1 flex flex-col pt-24">
      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-coral" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-semibold mb-2">❌ {error}</p>
            <p className="text-sm text-red-700 mb-3">
              Make sure json-server is running:{" "}
              <code className="bg-red-100 px-2 py-1 rounded">npm run dev</code>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              🔄 Retry Loading
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2">
              No Bookings Yet
            </h2>
            <p className="text-brand-slate mb-6">
              You haven't made any court reservations yet.
            </p>
            <button
              onClick={() => navigate("/listing")}
              className="px-6 py-3 bg-brand-coral hover:bg-[#e0484d] text-white font-semibold rounded-full transition-all"
            >
              Browse Courts
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Your Bookings ({bookings.length})
            </h2>
            <AnimatePresence>
              {bookings.map((booking, index) => (
                <div
                  key={booking.id || index}
                  className="bg-white rounded-lg border border-brand-border shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-brand-navy">
                        {booking.courtName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-brand-slate mt-1">
                        <MapPinIcon className="w-4 h-4" />
                        {booking.location}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="p-2 text-brand-slate hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Cancel booking"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-brand-coral" />
                      <div>
                        <p className="text-xs text-brand-slate">Date</p>
                        <p className="font-semibold text-brand-navy">
                          {formatDate(booking.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-brand-coral" />
                      <div>
                        <p className="text-xs text-brand-slate">Time</p>
                        <p className="font-semibold text-brand-navy">
                          {booking.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-brand-coral">⏱️</div>
                      <div>
                        <p className="text-xs text-brand-slate">Duration</p>
                        <p className="font-semibold text-brand-navy">
                          {booking.duration} hour(s)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSignIcon className="w-4 h-4 text-brand-coral" />
                      <div>
                        <p className="text-xs text-brand-slate">Total</p>
                        <p className="font-semibold text-brand-navy">
                          ${booking.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-border text-xs text-brand-slate">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
