import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Banknote, 
  Sun, 
  Camera, 
  Utensils, 
  Check, 
  Share2, 
  Sparkles, 
  Calendar, 
  Tag,
  ExternalLink,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FlagIcon } from './FlagIcons';

export default function DestinationModal({ destination, onClose }) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  if (!destination) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2D6A4F', '#52B788', '#D8F3DC', '#E9C46A']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-wiz" 
        onClick={(e) => e.stopPropagation()}
        style={{ overflow: 'hidden' }}
      >
        {/* Banner */}
        <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden' }}>
          <img 
            src={destination.image} 
            alt={destination.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(19, 46, 34, 0.92) 100%)'
            }}
          />

          {/* Close button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: '#FFFFFF',
              border: 'none',
              color: 'var(--text-heading)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Title on Banner */}
          <div 
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.5rem',
              right: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="pill-badge" style={{ background: '#FFFFFF', color: 'var(--green-primary)' }}>
                <FlagIcon country={destination.country} size={14} />
                <span>{destination.country}</span>
              </span>
              <span className="pill-badge" style={{ background: 'var(--accent-gold-light)', color: '#854D0E', border: '1px solid rgba(233, 196, 106, 0.4)' }}>
                <Sparkles size={12} color="#CA8A04" />
                <span>{destination.cuteStamp}</span>
              </span>
              <span className="pill-badge" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', backdropFilter: 'blur(4px)' }}>
                {destination.vibeTag}
              </span>
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#FFFFFF', lineHeight: '1.2' }}>
              {destination.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          
          {/* Quick Metrics Strip */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '0.85rem',
              background: 'var(--bg-primary)',
              padding: '0.85rem 1.15rem',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Clock size={16} color="var(--green-primary)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Duration</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-heading)' }}>{destination.duration}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Banknote size={16} color="var(--green-primary)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Daily Cost</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-heading)' }}>{destination.budget}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Sun size={16} color="#E76F51" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Best Season</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-heading)' }}>{destination.season}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <MapPin size={16} color="var(--green-primary)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Coordinates</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-heading)' }}>{destination.coordinates.lat}° N</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs with Real Icons */}
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1.5px solid var(--border-light)', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setActiveTab('itinerary')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'itinerary' ? '2.5px solid var(--green-primary)' : '2.5px solid transparent',
                color: activeTab === 'itinerary' ? 'var(--green-primary)' : 'var(--text-muted)',
                fontWeight: '800',
                padding: '0.5rem 0.85rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Calendar size={15} />
              <span>Daily Plan</span>
            </button>

            <button
              onClick={() => setActiveTab('food')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'food' ? '2.5px solid var(--green-primary)' : '2.5px solid transparent',
                color: activeTab === 'food' ? 'var(--green-primary)' : 'var(--text-muted)',
                fontWeight: '800',
                padding: '0.5rem 0.85rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Utensils size={15} />
              <span>Must-Eat Cafes</span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'photos' ? '2.5px solid var(--green-primary)' : '2.5px solid transparent',
                color: activeTab === 'photos' ? 'var(--green-primary)' : 'var(--text-muted)',
                fontWeight: '800',
                padding: '0.5rem 0.85rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Camera size={15} />
              <span>Photo Spots</span>
            </button>
          </div>

          {/* Tab 1: Day-by-Day Itinerary */}
          {activeTab === 'itinerary' && (
            <div>
              <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                {destination.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {destination.itineraryDays.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start',
                      padding: '0.85rem 1rem',
                      background: checkedItems[idx] ? 'var(--green-subtle)' : 'var(--bg-primary)',
                      border: checkedItems[idx] ? '1.5px solid var(--green-primary)' : '1px solid var(--border-light)',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div 
                      style={{
                        minWidth: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: checkedItems[idx] ? 'var(--green-primary)' : '#FFFFFF',
                        border: '1.5px solid var(--green-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px'
                      }}
                    >
                      {checkedItems[idx] ? (
                        <Check size={14} color="#FFFFFF" strokeWidth={3} />
                      ) : (
                        <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--green-primary)' }}>{item.day}</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '800', color: 'var(--text-heading)', fontSize: '0.92rem', marginBottom: '0.15rem' }}>
                        Day {item.day}: {item.title}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: '1.5' }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights Checklist */}
              <div style={{ background: 'var(--bg-primary)', padding: '1.15rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: '800', fontSize: '0.85rem', color: 'var(--green-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={14} color="var(--green-primary)" />
                  <span>Bestie Must-Do Checklist:</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {destination.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                      <CheckCircle2 size={14} color="var(--green-primary)" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Food Spots */}
          {activeTab === 'food' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Tried & tested cafe spots that are aesthetic and budget-friendly!
              </div>

              {destination.cuteFoodSpots.map((cafe, i) => (
                <div 
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'var(--bg-primary)',
                    borderRadius: '14px',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div 
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Coffee size={18} color="var(--green-primary)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-heading)' }}>
                        {cafe.name}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--green-primary)', fontWeight: '600' }}>
                        Must-try: {cafe.dish}
                      </div>
                    </div>
                  </div>

                  <span className="pill-badge" style={{ fontSize: '0.8rem', fontWeight: '800' }}>
                    {cafe.price}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Photo Spots */}
          {activeTab === 'photos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--green-subtle)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: '800', color: 'var(--green-dark)', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Camera size={16} color="var(--green-primary)" />
                  <span>Golden Hour & Camera Tips</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-heading)', lineHeight: '1.55' }}>
                  {destination.photoSpotGuide}
                </p>
              </div>

              {/* Gallery thumbnails */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {destination.gallery.map((img, i) => (
                  <div key={i} style={{ height: '140px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={img} alt="Gallery view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div 
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <button
              onClick={handleShare}
              className="btn-wiz btn-wiz-outline btn-wiz-sm"
            >
              <Share2 size={14} />
              <span>{copied ? 'Link Copied!' : 'Share Itinerary'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                const promoEl = document.getElementById('deals');
                if (promoEl) promoEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-wiz btn-wiz-primary btn-wiz-sm"
            >
              <Tag size={14} />
              <span>Claim Hotel Promo Codes for this Trip</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
