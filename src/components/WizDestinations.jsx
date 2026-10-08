import React, { useState } from 'react';
import { ArrowRight, MapPin, Compass, Sparkles } from 'lucide-react';
import { FlagIcon } from './FlagIcons';

export default function WizDestinations({ onSelectDestination }) {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const destinations = [
    { country: "Philippines", code: "PH", popular: "Baguio, Cebu, Siargao, Batanes", region: "Southeast Asia", guidesCount: "12 Guides" },
    { country: "Taiwan", code: "TW", popular: "Taipei, Jiufen, Taichung, Alishan", region: "East Asia", guidesCount: "6 Guides" },
    { country: "Vietnam", code: "VN", popular: "Da Nang, Hoi An, Ho Chi Minh", region: "Southeast Asia", guidesCount: "5 Guides" },
    { country: "Malaysia", code: "MY", popular: "Kuala Lumpur, Penang, Langkawi", region: "Southeast Asia", guidesCount: "4 Guides" },
    { country: "South Korea", code: "KR", popular: "Seoul, Busan, Jeju, Gyeongju", region: "East Asia", guidesCount: "8 Guides" },
    { country: "Hong Kong", code: "HK", popular: "Victoria Peak, Disneyland, Mong Kok", region: "East Asia", guidesCount: "4 Guides" },
    { country: "Macao", code: "MO", popular: "Taipa Village, Ruins of St. Paul", region: "East Asia", guidesCount: "3 Guides" },
    { country: "Mongolia", code: "MN", popular: "Gobi Desert, Ulaanbaatar, Terelj", region: "Central Asia", guidesCount: "3 Guides" },
    { country: "Japan", code: "JP", popular: "Kyoto, Tokyo, Osaka, Nara, Uji", region: "East Asia", guidesCount: "10 Guides" },
    { country: "Indonesia", code: "ID", popular: "Bali, Ubud, Nusa Penida, Komodo", region: "Southeast Asia", guidesCount: "7 Guides" }
  ];

  const regions = ['All', 'Southeast Asia', 'East Asia', 'Central Asia'];

  const filteredDestinations = selectedRegion === 'All' 
    ? destinations 
    : destinations.filter(d => d.region === selectedRegion);

  return (
    <section id="destinations" className="section-spacing" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Destinations
          </div>
          <h2 className="section-title-wiz">
            Pick your next adventure
          </h2>
          <p className="section-desc-wiz">
            Complete guides per country from airport arrival to the best local eats. No fluff, just what you actually need.
          </p>
        </div>

        {/* Region Filter Chips */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: selectedRegion === reg ? '1.5px solid var(--green-primary)' : '1px solid var(--border-light)',
                background: selectedRegion === reg ? 'var(--green-primary)' : '#FFFFFF',
                color: selectedRegion === reg ? '#FFFFFF' : 'var(--text-heading)',
                transition: 'all 0.2s ease',
                boxShadow: selectedRegion === reg ? '0 4px 12px rgba(45, 106, 79, 0.2)' : 'var(--shadow-sm)'
              }}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Flag Cards Grid with Crisp Vector Flags */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '1rem'
          }}
        >
          {filteredDestinations.map((item, idx) => (
            <a
              key={idx}
              href="#itineraries"
              onClick={() => onSelectDestination && onSelectDestination(item.country)}
              className="wiz-card"
              style={{
                padding: '1.25rem 1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div 
                style={{
                  background: 'var(--bg-primary)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-light)',
                  flexShrink: 0
                }}
              >
                <FlagIcon country={item.country} size={22} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: '800', color: 'var(--text-heading)', fontSize: '1rem', lineHeight: '1.2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{item.country}</span>
                  <ArrowRight size={13} color="var(--green-muted)" />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.popular.split(',')[0]}, {item.popular.split(',')[1]}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
