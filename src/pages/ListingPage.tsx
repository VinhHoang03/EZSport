import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FiltersSidebar } from '../components/listing/FiltersSidebar';
import { CourtGrid } from '../components/listing/CourtGrid';
interface ListingPageProps {
  onAuthClick: () => void;
  onDashboardClick: () => void;
}
export function ListingPage({
  onAuthClick,
  onDashboardClick
}: ListingPageProps) {
  return (
    <div className="min-h-screen bg-brand-offWhite font-sans selection:bg-brand-coral/20 selection:text-brand-navy flex flex-col">
      {/* We reuse the Navbar but force it to be solid by wrapping it in a div with padding,
             or we can just let it be sticky and add top padding to main */}
      <div className="bg-brand-navy">
        <Navbar onAuthClick={onAuthClick} onDashboardClick={onDashboardClick} />
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8 mt-20">
        {/* Left Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-64 lg:w-72 shrink-0">
          <FiltersSidebar />
        </aside>

        {/* Main Content Area */}
        <CourtGrid />
      </main>

      <Footer />
    </div>);

}