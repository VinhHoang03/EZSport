import React from "react";
import { CourtCard } from "./CourtCard";
import { MOCK_COURTS } from "../data/mockData";

export function FeaturedCourts() {
  const featuredCourts = MOCK_COURTS.slice(0, 6);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {featuredCourts.map((court) => (
          <CourtCard key={court.id} {...court} />
        ))}
      </div>
    </section>
  );
}
