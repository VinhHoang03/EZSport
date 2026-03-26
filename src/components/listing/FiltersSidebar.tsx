import { motion } from "framer-motion";
import { FilterIcon, StarIcon } from "lucide-react";
import type { FilterState } from "../../pages/ListingPage";

const SPORTS = [
  "Tennis",
  "Basketball",
  "Padel",
  "Football",
  "Badminton",
  "Volleyball",
];

const LOCATIONS = [
  "Downtown",
  "Westside",
  "Brooklyn",
  "Marina Bay",
  "Financial District",
  "Santa Monica",
  "Downtown Metro",
  "Brooklyn Heights",
  "Eastside Complex",
];

interface FiltersSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export function FiltersSidebar({ filters, setFilters }: FiltersSidebarProps) {
  const handleSportToggle = (sport: string) => {
    const newSports = new Set(filters.sports);
    if (newSports.has(sport)) {
      newSports.delete(sport);
    } else {
      newSports.add(sport);
    }
    setFilters({ ...filters, sports: newSports });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = new Set(filters.locations);
    if (newLocations.has(location)) {
      newLocations.delete(location);
    } else {
      newLocations.add(location);
    }
    setFilters({ ...filters, locations: newLocations });
  };

  const handleRatingChange = (rating: number) => {
    setFilters({ ...filters, minRating: rating });
  };

  const handleResetFilters = () => {
    setFilters({
      sports: new Set(["Tennis", "Padel"]),
      locations: new Set(),
      maxPrice: 100,
      minRating: 4.0,
      searchTerm: "",
      availableToday: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-6 sticky top-32">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border">
        <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
          <FilterIcon className="w-5 h-5" /> Filters
        </h2>
        <button
          onClick={handleResetFilters}
          className="text-sm font-medium text-brand-coral hover:text-[#e0484d] transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-8">
        {/* Sport Type */}
        <div>
          <h3 className="text-sm font-bold text-brand-navy mb-3">Sport Type</h3>
          <div className="space-y-2">
            {SPORTS.map((sport) => (
              <label
                key={sport}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.sports.has(sport)}
                  onChange={() => handleSportToggle(sport)}
                  className="w-4 h-4 rounded border-brand-border text-brand-coral focus:ring-brand-coral/30 cursor-pointer"
                />

                <span className="text-sm text-brand-slate group-hover:text-brand-navy transition-colors">
                  {sport}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-brand-navy">Max Price</h3>
            <span className="text-sm font-medium text-brand-coral">
              ${filters.maxPrice}/hr
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="150"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
            className="w-full h-2 bg-brand-offWhite rounded-lg appearance-none cursor-pointer accent-brand-coral"
          />

          <div className="flex justify-between text-xs text-brand-slate mt-2">
            <span>$10</span>
            <span>$150+</span>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-sm font-bold text-brand-navy mb-3">Location</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {LOCATIONS.map((loc) => (
              <label
                key={loc}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.locations.has(loc)}
                  onChange={() => handleLocationToggle(loc)}
                  className="w-4 h-4 rounded border-brand-border text-brand-coral focus:ring-brand-coral/30 cursor-pointer"
                />

                <span className="text-sm text-brand-slate group-hover:text-brand-navy transition-colors">
                  {loc}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <h3 className="text-sm font-bold text-brand-navy mb-3">
            Minimum Rating
          </h3>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 border-brand-border text-brand-coral focus:ring-brand-coral/30 cursor-pointer"
                />

                <div className="flex items-center gap-1">
                  <span className="text-sm text-brand-slate group-hover:text-brand-navy transition-colors">
                    {rating}+
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="text-sm font-bold text-brand-navy mb-3">
            Availability
          </h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.availableToday}
              onChange={(e) =>
                setFilters({ ...filters, availableToday: e.target.checked })
              }
              className="w-4 h-4 rounded border-brand-border text-brand-coral focus:ring-brand-coral/30 cursor-pointer"
            />

            <span className="text-sm text-brand-slate group-hover:text-brand-navy transition-colors">
              Available today
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
