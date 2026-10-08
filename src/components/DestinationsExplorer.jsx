import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight, 
  Sparkles,
  Heart
} from 'lucide-react';
import { destinationsData } from '../data/travelData';
import DestinationModal from './DestinationModal';

export default function DestinationsExplorer() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDest, setActiveModalDest] = useState(null);

  const regions = [
    { label: 'All Destinations', value: 'All', emoji: '🌏' },
    { label: 'Philippines', value: 'Philippines', emoji: '🇵🇭' },
    { label: 'Japan', value: 'Japan', emoji: '🇯🇵' },
    { label: 'Indonesia / Bali', value: 'Indonesia', emoji: '🇮🇩' },
    { label: 'Europe & Arctic', value: 'Europe', emoji: '🏔️' },
  ];

  const filteredDestinations = useMemo(() => {
    return destinationsData.filter(item => {
      const matchRegion = selectedRegion === 'All' || 
                          item.country.toLowerCase().includes(selectedRegion.toLowerCase()) || 
                          item.region.toLowerCase().includes(selectedRegion.toLowerCase());
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchSearch;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <section id="guides" className="section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-cute">
          <div className="section-subtitle-pill">
            <span>🗺️ Curated Travel Guides & Itineraries</span>
          </div>
          <h2 className="section-title-cute">
            Handcrafted <span className="font-serif-italic" style={{ color: 'var(--green-matcha)' }}>Travel Guides</span>
          </h2>
          <p className="section-desc-cute">
            Detailed day-by-day itineraries, cute aesthetic cafe spots, budget breakdowns, and exact GPS photo coordinates.
          </p>
        </div>

        {/* Search & Region Filter Bar */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {/* Region Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {regions.map((reg) => (
              <button
                key={reg.value}
                onClick={() => setSelectedRegion(reg.value)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: selectedRegion === reg.value 
                    ? '1.5px solid var(--green-matcha)' 
                    : '1.5px solid var(--color-card-border)',
                  background: selectedRegion === reg.value 
                    ? 'var(--green-matcha)' 
                    : 'var(--color-card)',
                  color: selectedRegion === reg.value ? '#FFFFFF' : 'var(--text-body)',
                  boxShadow: selectedRegion === reg.value ? '0 4px 14px rgba(46, 90, 68, 0.22)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>{reg.emoji}</span>
                <span>{reg.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--color-card)',
              border: '1.5px solid var(--color-card-border)',
              borderRadius: '9999px',
              padding: '0.45rem 1rem',
              boxShadow: 'var(--shadow-cute)',
              minWidth: '220px'
            }}
          >
            <Search size={16} color="var(--green-matcha)" />
            <input 
              type="text"
              placeholder="Search islands, temples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="cute-card"
              onClick={() => setActiveModalDest(dest)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Card Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img 
                  src={dest.image} 
                  alt={dest.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Top Badges */}
                <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', right: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge-matcha" style={{ background: 'rgba(255, 255, 255, 0.92)' }}>
                    {dest.flag} {dest.country}
                  </span>
                  <span className="cute-stamp">
                    {dest.cuteStamp}
                  </span>
                </div>

                {/* Daily Cost Bubble */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    right: '0.85rem',
                    background: 'rgba(31, 61, 46, 0.88)',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  {dest.budget}
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.45rem', lineHeight: '1.3' }}>
                  {dest.title}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: '1.55', marginBottom: '1.25rem', flex: 1 }}>
                  {dest.description}
                </p>

                {/* Quick Info Strip */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--color-bg-subtle)',
                    borderRadius: '12px',
                    marginBottom: '1.25rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-body)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={13} color="var(--green-matcha)" />
                    <span>{dest.duration}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Star size={13} fill="#F9C74F" color="#F9C74F" />
                    <strong style={{ color: 'var(--text-main)' }}>{dest.rating}</strong>
                  </div>

                  <div style={{ color: 'var(--green-matcha)', fontWeight: '700' }}>
                    {dest.vibeTag}
                  </div>
                </div>

                {/* Open Guide CTA */}
                <button 
                  className="btn-cute btn-cute-primary btn-cute-sm"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Read Free Itinerary</span>
                  <ArrowRight size={15} />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Destination Modal */}
      {activeModalDest && (
        <DestinationModal 
          destination={activeModalDest} 
          onClose={() => setActiveModalDest(null)} 
        />
      )}
    </section>
  );
}
