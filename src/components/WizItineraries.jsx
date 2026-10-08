import React, { useState } from 'react';
import { useTravelData } from '../context/DataContext';
import DestinationModal from './DestinationModal';
import { FlagIcon } from './FlagIcons';
import { ArrowRight, Clock, Star, MapPin, Sparkles } from 'lucide-react';

export default function WizItineraries({ filterCountry }) {
  const { destinations } = useTravelData();
  const [activeModalDest, setActiveModalDest] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Highland Staycations', 'Island Adventures', 'Scenic Staycations', 'Hidden Gems', 'Aesthetic & Cafes'];

  let displayedDestinations = destinations;
  if (filterCountry) {
    displayedDestinations = displayedDestinations.filter(d => (d.country || '').toLowerCase() === filterCountry.toLowerCase());
  }
  if (activeCategory !== 'All') {
    displayedDestinations = displayedDestinations.filter(d => d.category === activeCategory);
  }

  return (
    <section id="itineraries" className="section-spacing">
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Travel Itineraries
          </div>
          <h2 className="section-title-wiz">
            Travel itineraries based on experience
          </h2>
          <p className="section-desc-wiz">
            Thoughtfully planned day-by-day itineraries designed to help you make the most of your time. Whether you're traveling for 3 days or 1 week, simply follow the guide and enjoy your trip.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: activeCategory === cat ? '1.5px solid var(--green-primary)' : '1px solid var(--border-light)',
                background: activeCategory === cat ? 'var(--green-primary)' : 'var(--bg-card)',
                color: activeCategory === cat ? '#FFFFFF' : 'var(--text-heading)',
                transition: 'all 0.2s ease',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(45, 106, 79, 0.2)' : 'var(--shadow-sm)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Itinerary Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {displayedDestinations.map((dest) => (
            <div 
              key={dest.id}
              className="wiz-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => setActiveModalDest(dest)}
            >
              {/* Image with Duration Badge */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img 
                  src={dest.image} 
                  alt={dest.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Duration Badge with Clock icon */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: '9999px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    color: 'var(--green-primary)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Clock size={12} color="var(--green-primary)" />
                  <span>{dest.duration}</span>
                </div>

                {/* Country Flag Pill */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    right: '0.85rem',
                    background: '#FFFFFF',
                    borderRadius: '9999px',
                    padding: '0.25rem 0.7rem',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    color: 'var(--text-heading)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <FlagIcon country={dest.country} size={14} />
                  <span>{dest.country}</span>
                </div>

                {/* Category Pill at bottom of image */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(19, 46, 34, 0.85)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '9999px',
                    padding: '0.2rem 0.65rem',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    color: '#D8F3DC'
                  }}
                >
                  {dest.category}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.4rem', lineHeight: '1.3' }}>
                  {dest.title}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: '1.55', marginBottom: '1.25rem', flex: 1 }}>
                  {dest.description}
                </p>

                {/* Bottom Action */}
                <button 
                  className="btn-wiz btn-wiz-primary btn-wiz-sm"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>View Itinerary</span>
                  <ArrowRight size={14} />
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
