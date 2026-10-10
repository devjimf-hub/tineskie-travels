import React, { useState } from 'react';
import { 
  Luggage, 
  Camera, 
  Zap, 
  BatteryCharging, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { gearBagData } from '../data/travelData';

export default function GearBagSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeCategory = gearBagData[activeCategoryIndex];

  return (
    <section id="gear" className="section-spacing" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Expedition Loadout
          </div>
          <h2 className="section-title-wiz">
            What’s in my camera & travel bag?
          </h2>
          <p className="section-desc-wiz">
            The exact lightweight, rugged filmmaking gear and optics I rely on through tropical monsoons and high mountain summits.
          </p>
        </div>

        {/* Category Tabs */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}
        >
          {gearBagData.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategoryIndex(idx)}
              style={{
                padding: '0.55rem 1.35rem',
                borderRadius: '9999px',
                fontSize: '0.86rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: activeCategoryIndex === idx 
                  ? '1.5px solid var(--green-primary)' 
                  : '1px solid var(--border-light)',
                background: activeCategoryIndex === idx 
                  ? 'var(--green-primary)' 
                  : '#FFFFFF',
                color: activeCategoryIndex === idx ? '#FFFFFF' : 'var(--text-heading)',
                boxShadow: activeCategoryIndex === idx ? '0 4px 12px rgba(45, 106, 79, 0.2)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Gear Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {activeCategory.items.map((item, idx) => (
            <div 
              key={idx}
              className="wiz-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Badge & Role */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="pill-badge">{item.badge}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    {item.role}
                  </span>
                </div>

                {/* Name */}
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                  {item.name}
                </h3>

                {/* Specs Box */}
                <div 
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-primary)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.8rem',
                    color: 'var(--green-dark)',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Zap size={14} color="var(--green-primary)" />
                  <span>{item.specs}</span>
                </div>

                {/* Why I use it */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                  {item.why}
                </p>
              </div>

              {/* Creator Recommendation Tag */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.9rem',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '0.8rem',
                  color: 'var(--green-primary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={16} color="var(--green-primary)" />
                  <span style={{ fontWeight: '700' }}>Field-Tested</span>
                </div>

                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  Ultra-light travel approved
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Lightweight Packing Manifesto */}
        <div 
          style={{
            marginTop: '3.5rem',
            padding: '2rem',
            background: '#FFFFFF',
            border: '1.5px solid var(--border-light)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{ maxWidth: '650px', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div 
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--green-subtle)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Luggage size={24} color="var(--green-primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.3rem' }}>
                The 7kg One-Bag Travel Philosophy
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.5', margin: 0 }}>
                I travel carry-on only whether staying 1 week in Siargao or 1 month in Japan. All gear is water-sealed, modular, and rechargeable via USB-C.
              </p>
            </div>
          </div>

          <a 
            href="#itineraries"
            className="btn-wiz btn-wiz-primary btn-wiz-sm"
          >
            <span>Explore Itineraries</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
