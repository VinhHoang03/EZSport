import { useState, useEffect } from "react";
import { CourtCard } from "./CourtCard";
import { getAllCourts } from "../api/client";

interface Court {
  id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

export function FeaturedCourts({
  onCourtClick,
}: {
  onCourtClick?: (court: Court) => void;
}) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setLoading(true);
        const data = await getAllCourts();
        setCourts(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch courts:", error);
        setCourts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy tracking-tight mb-3">
            Featured Courts
          </h2>
          <p className="text-lg text-brand-slate max-w-2xl">
            Discover top-rated facilities near you, ready for your next match.
          </p>
        </div>
        <button className="text-brand-coral font-semibold hover:text-[#e0484d] transition-colors flex items-center gap-1 shrink-0">
          View all courts
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-coral"></div>
            <p className="text-brand-slate mt-3">Loading featured courts...</p>
          </div>
        </div>
      ) : courts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-brand-slate">No courts available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courts.map((court) => (
            <div
              key={court.id}
              onClick={() => onCourtClick?.(court)}
              className="cursor-pointer"
            >
              <CourtCard {...court} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
