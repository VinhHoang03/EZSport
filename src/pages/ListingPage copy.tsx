import { useState } from "react";
import { Footer } from "../components/Footer";
import { FiltersSidebar } from "../components/listing/FiltersSidebar";
import { CourtGrid } from "../components/listing/CourtGrid";

export interface FilterState {
  sports: Set<string>;
  locations: Set<string>;
  maxPrice: number;
  minRating: number;
  searchTerm: string;
  availableToday: boolean;
}

export function ListingPage() {
  const [filters, setFilters] = useState<FilterState>({
    sports: new Set(["Tennis", "Padel"]),
    locations: new Set(),
    maxPrice: 100,
    minRating: 4.0,
    searchTerm: "",
    availableToday: true,
  });

  const [sortBy, setSortBy] = useState("recommended");

  return (
    <div className="flex-1 flex flex-col pt-24">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-64 lg:w-72 shrink-0">
          <FiltersSidebar filters={filters} setFilters={setFilters} />
        </aside>

        {/* Main Content Area */}
        <CourtGrid
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </main>

      <Footer />
    </div>
  );
}
