import React from 'react';
import { MapPinIcon, CalendarIcon, ClockIcon, SearchIcon } from 'lucide-react';
export function SearchBar() {
  return (
    <div className="bg-white rounded-full shadow-xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 md:gap-0 max-w-4xl mx-auto w-full border border-brand-border relative z-10">
      {/* Location */}
      <div className="flex-1 w-full md:w-auto px-4 py-2 md:py-0 md:border-r border-brand-border hover:bg-gray-50 rounded-full md:rounded-none md:rounded-l-full transition-colors cursor-pointer group">
        <label className="block text-xs font-bold text-brand-navy tracking-wide mb-1 cursor-pointer">
          Location
        </label>
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-brand-slate group-hover:text-brand-coral transition-colors" />
          <input
            type="text"
            placeholder="Where do you want to play?"
            className="w-full bg-transparent border-none outline-none text-sm text-brand-navy placeholder:text-brand-slate truncate" />
          
        </div>
      </div>

      {/* Sport */}
      <div className="flex-1 w-full md:w-auto px-4 py-2 md:py-0 md:border-r border-brand-border hover:bg-gray-50 rounded-full md:rounded-none transition-colors cursor-pointer group">
        <label className="block text-xs font-bold text-brand-navy tracking-wide mb-1 cursor-pointer">
          Sport
        </label>
        <select className="w-full bg-transparent border-none outline-none text-sm text-brand-navy cursor-pointer appearance-none">
          <option value="">Any sport</option>
          <option value="tennis">Tennis</option>
          <option value="basketball">Basketball</option>
          <option value="padel">Padel</option>
          <option value="football">Football</option>
        </select>
      </div>

      {/* Date */}
      <div className="flex-1 w-full md:w-auto px-4 py-2 md:py-0 md:border-r border-brand-border hover:bg-gray-50 rounded-full md:rounded-none transition-colors cursor-pointer group">
        <label className="block text-xs font-bold text-brand-navy tracking-wide mb-1 cursor-pointer">
          Date
        </label>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-brand-slate group-hover:text-brand-coral transition-colors" />
          <input
            type="date"
            className="w-full bg-transparent border-none outline-none text-sm text-brand-navy cursor-pointer" />
          
        </div>
      </div>

      {/* Time */}
      <div className="flex-1 w-full md:w-auto px-4 py-2 md:py-0 hover:bg-gray-50 rounded-full md:rounded-none transition-colors cursor-pointer group">
        <label className="block text-xs font-bold text-brand-navy tracking-wide mb-1 cursor-pointer">
          Time
        </label>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-brand-slate group-hover:text-brand-coral transition-colors" />
          <input
            type="time"
            className="w-full bg-transparent border-none outline-none text-sm text-brand-navy cursor-pointer" />
          
        </div>
      </div>

      {/* Search Button */}
      <button
        className="w-full md:w-auto mt-2 md:mt-0 bg-brand-coral hover:bg-[#e0484d] text-white p-4 md:px-8 md:py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-brand-coral/30 outline-none"
        aria-label="Search courts">
        
        <SearchIcon className="w-5 h-5" />
        <span className="md:hidden font-medium">Search</span>
      </button>
    </div>);

}