import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import WizNavbar from './components/WizNavbar';
import WizHero from './components/WizHero';
import WizPromoCards from './components/WizPromoCards';
import WizItineraries from './components/WizItineraries';
import CuteBudgetPlanner from './components/CuteBudgetPlanner';
import ReelsShowcase from './components/ReelsShowcase';
import WizTravelGuides from './components/WizTravelGuides';
import CutePresetStudio from './components/CutePresetStudio';
import GearBagSection from './components/GearBagSection';
import WizAffiliate from './components/WizAffiliate';
import FaqSection from './components/FaqSection';
import WizFooter from './components/WizFooter';
import FreeGuideModal from './components/FreeGuideModal';
import AdminPortal from './components/admin/AdminPortal';

function MainApp() {
  const [freeGuideOpen, setFreeGuideOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [filterCountry, setFilterCountry] = useState(null);

  // Check URL parameters for ?admin, ?admin=true, or #admin
  useEffect(() => {
    const checkAdminRoute = () => {
      const search = window.location.search;
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      const isParam = search.includes('admin');
      const isHash = hash.toLowerCase() === '#admin';
      const isPath = path.toLowerCase().endsWith('/admin');

      if (isParam || isHash || isPath) {
        setAdminOpen(true);
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Keyboard shortcut (Ctrl+Shift+A or Cmd+Shift+A)
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleSelectCountry = (country) => {
    setFilterCountry(country);
    const itElem = document.getElementById('itineraries');
    if (itElem) {
      itElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation Bar */}
      <WizNavbar 
        onOpenFreeGuide={() => setFreeGuideOpen(true)} 
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        
        {/* Hero Section */}
        <WizHero onOpenFreeGuide={() => setFreeGuideOpen(true)} />

        {/* Promo Codes & Discounts (Agoda / Klook) */}
        <WizPromoCards />

        {/* Travel Itineraries Based on Experience */}
        <WizItineraries filterCountry={filterCountry} />

        {/* Interactive Trip Cost & Budget Planner */}
        <CuteBudgetPlanner onOpenFreeGuide={() => setFreeGuideOpen(true)} />

        {/* Cinematic Stories & Viral Reels */}
        <ReelsShowcase />

        {/* Travel Guides: Plan Smarter, Travel with Confidence */}
        <WizTravelGuides onOpenFreeGuide={() => setFreeGuideOpen(true)} />

        {/* Signature Lightroom Presets Before/After Studio */}
        <CutePresetStudio onOpenFreeGuide={() => setFreeGuideOpen(true)} />

        {/* What's in My Bag / Camera Gear */}
        <GearBagSection />

        {/* Earn While You Create / Affiliate Programs */}
        <WizAffiliate />

        {/* Creator FAQs */}
        <FaqSection />

      </main>

      {/* Footer */}
      <WizFooter onOpenAdmin={() => setAdminOpen(true)} />

      {/* Free Guide & Preset Modal */}
      <FreeGuideModal 
        isOpen={freeGuideOpen} 
        onClose={() => setFreeGuideOpen(false)} 
      />

      {/* Dynamic Firebase Admin Portal */}
      <AdminPortal 
        isOpen={adminOpen}
        onClose={() => {
          setAdminOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, null, ' ');
          }
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
