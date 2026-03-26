import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  UserIcon,
  ShieldIcon,
  HeartIcon,
  LogOutIcon } from
'lucide-react';
import { ProfileSettings } from '../components/dashboard/ProfileSettings';
import { SecuritySettings } from '../components/dashboard/SecuritySettings';
import { FavoriteCourts } from '../components/dashboard/FavoriteCourts';
interface DashboardPageProps {
  onBack: () => void;
}
type TabType = 'profile' | 'security' | 'favorites';
export function DashboardPage({ onBack }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const TABS = [
  {
    id: 'profile',
    label: 'Profile Settings',
    icon: UserIcon
  },
  {
    id: 'security',
    label: 'Password & Security',
    icon: ShieldIcon
  },
  {
    id: 'favorites',
    label: 'Favorite Courts',
    icon: HeartIcon
  }];

  return (
    <div className="min-h-screen bg-brand-offWhite font-sans selection:bg-brand-coral/20 selection:text-brand-navy flex flex-col">
      {/* Simple Header */}
      <header className="bg-white border-b border-brand-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-brand-slate hover:text-brand-navy hover:bg-brand-offWhite rounded-full transition-colors"
              aria-label="Back to home">
              
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-navy hidden sm:block">
                CourtBook
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-brand-navy hidden sm:block">
              Sarah Jenkins
            </span>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-brand-border" />
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar sticky top-24">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${isActive ? 'bg-white text-brand-coral shadow-sm border border-brand-border/50' : 'text-brand-slate hover:text-brand-navy hover:bg-brand-border/30 border border-transparent'}`}>
                  
                  <Icon
                    className={`w-5 h-5 ${isActive ? 'text-brand-coral' : 'text-brand-slate'}`} />
                  
                  {tab.label}
                </button>);

            })}

            <div className="hidden md:block w-full h-px bg-brand-border my-4" />

            <button
              onClick={onBack}
              className="hidden md:flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all border border-transparent">
              
              <LogOutIcon className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Tab Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && <ProfileSettings key="profile" />}
            {activeTab === 'security' && <SecuritySettings key="security" />}
            {activeTab === 'favorites' && <FavoriteCourts key="favorites" />}
          </AnimatePresence>
        </div>
      </main>
    </div>);

}