import React, { useEffect, useState } from 'react';
import { SearchIcon, MenuIcon, UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export function Navbar({
  onAuthClick,
  onDashboardClick,
  onFindCourtsClick




}: {onAuthClick?: () => void;onDashboardClick?: () => void;onFindCourtsClick?: () => void;}) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-brand-border py-4' : 'bg-transparent py-6'}`}
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        duration: 0.5
      }}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span
            className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-brand-navy' : 'text-white'}`}>
            
            CourtBook
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onFindCourtsClick}
            className={`text-sm font-medium hover:text-brand-coral transition-colors ${isScrolled ? 'text-brand-navy' : 'text-white/90'}`}>
            
            Find Courts
          </button>
          <a
            href="#"
            className={`text-sm font-medium hover:text-brand-coral transition-colors ${isScrolled ? 'text-brand-navy' : 'text-white/90'}`}>
            
            Tournaments
          </a>
          <button
            onClick={onDashboardClick}
            className={`text-sm font-medium hover:text-brand-coral transition-colors ${isScrolled ? 'text-brand-navy' : 'text-white/90'}`}>
            
            Dashboard
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isScrolled ? 'hover:bg-gray-100 text-brand-navy' : 'hover:bg-white/20 text-white'}`}
            aria-label="Search">
            
            <SearchIcon className="w-4 h-4" />
            <span>Search</span>
          </button>

          <div
            onClick={onAuthClick}
            className={`flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border transition-colors cursor-pointer ${isScrolled ? 'border-brand-border hover:shadow-md bg-white' : 'border-white/30 hover:bg-white/10 bg-white/10 backdrop-blur-sm'}`}>
            
            <MenuIcon
              className={`w-4 h-4 ${isScrolled ? 'text-brand-navy' : 'text-white'}`} />
            
            <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center text-white">
              <UserIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.header>);

}