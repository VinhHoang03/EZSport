import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { CourtCard } from "../CourtCard";
import { MOCK_COURTS } from "../../data/mockData";
import type { FilterState } from "../../pages/ListingPage";

interface CourtGridProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function CourtGrid({
  filters,
  setFilters,
  sortBy,
  setSortBy,
}: CourtGridProps) {
  const [searchInput, setSearchInput] = React.useState("");

  const filteredAndSortedCourts = useMemo(() => {
    let result = MOCK_COURTS;

    // Apply search filter
    if (searchInput.trim()) {
      const search = searchInput.toLowerCase();
      result = result.filter(
        (court) =>
          court.name.toLowerCase().includes(search) ||
          court.location.toLowerCase().includes(search) ||
          court.sport.toLowerCase().includes(search),
      );
    }

    // Apply sport filter
    if (filters.sports.size > 0) {
      result = result.filter((court) => filters.sports.has(court.sport));
    }

    // Apply location filter
    if (filters.locations.size > 0) {
      result = result.filter((court) =>
        Array.from(filters.locations).some((loc) =>
          court.location.toLowerCase().includes(loc.toLowerCase()),
        ),
      );
    }

    // Apply price filter
    result = result.filter((court) => court.price <= filters.maxPrice);

    // Apply rating filter
    result = result.filter((court) => court.rating >= filters.minRating);

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "recommended":
      default:
        // Keep original order
        break;
    }

    return result;
  }, [filters, searchInput, sortBy]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-brand-slate" />
          </div>
          <input
            type="text"
            placeholder="Search courts by name or location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-white shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="md:hidden flex items-center justify-center gap-2 px-4 py-3 border border-brand-border rounded-xl bg-white text-brand-navy font-medium hover:bg-gray-50 transition-colors flex-1">
            <SlidersHorizontalIcon className="w-4 h-4" />
            Filters
          </button>

          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-4 pr-10 py-3 border border-brand-border rounded-xl text-brand-navy font-medium bg-white shadow-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-brand-slate">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">
          Courts in your area
        </h1>
        <p className="text-brand-slate mt-1">
          Showing {filteredAndSortedCourts.length} of {MOCK_COURTS.length}{" "}
          available courts
        </p>
      </div>

      {/* Grid */}
      {filteredAndSortedCourts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedCourts.map((court, index) => (
            <motion.div
              key={court.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
            >
              <CourtCard {...court} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold text-brand-navy mb-2">
              No courts found
            </p>
            <p className="text-brand-slate">
              Try adjusting your filters or search terms
            </p>
          </div>
        </div>
      )}

      {/* Pagination (Static) */}
      {filteredAndSortedCourts.length > 0 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 rounded-xl border border-brand-border flex items-center justify-center text-brand-slate hover:bg-white hover:text-brand-navy transition-colors disabled:opacity-50"
              disabled
            >
              &larr;
            </button>
            <button className="w-10 h-10 rounded-xl bg-brand-coral text-white font-medium flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-10 h-10 rounded-xl border border-brand-border bg-white flex items-center justify-center text-brand-navy font-medium hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-xl border border-brand-border bg-white flex items-center justify-center text-brand-navy font-medium hover:bg-gray-50 transition-colors">
              3
            </button>
            <span className="text-brand-slate px-2">...</span>
            <button className="w-10 h-10 rounded-xl border border-brand-border bg-white flex items-center justify-center text-brand-slate hover:text-brand-navy transition-colors">
              &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
