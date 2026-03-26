import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCourts } from './components/FeaturedCourts';
import { SportCategories } from './components/SportCategories';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { CTABanner } from './components/CTABanner';
import { Footer } from './components/Footer';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ListingPage } from './pages/ListingPage';
export function App() {
  const [currentView, setCurrentView] = useState<
    'landing' | 'auth' | 'dashboard' | 'listing'>(
    'landing');
  if (currentView === 'auth') {
    return <AuthPage onBack={() => setCurrentView('landing')} />;
  }
  if (currentView === 'dashboard') {
    return <DashboardPage onBack={() => setCurrentView('landing')} />;
  }
  if (currentView === 'listing') {
    return (
      <ListingPage
        onAuthClick={() => setCurrentView('auth')}
        onDashboardClick={() => setCurrentView('dashboard')} />);


  }
  return (
    <div className="min-h-screen bg-brand-offWhite font-sans selection:bg-brand-coral/20 selection:text-brand-navy">
      <Navbar
        onAuthClick={() => setCurrentView('auth')}
        onDashboardClick={() => setCurrentView('dashboard')}
        onFindCourtsClick={() => setCurrentView('listing')} />
      

      <main>
        <HeroSection />
        <SportCategories />
        <FeaturedCourts />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
      </main>

      <Footer />
    </div>);

}