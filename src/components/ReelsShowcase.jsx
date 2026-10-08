import React, { useState } from 'react';
import { 
  Film, 
  Play, 
  Eye, 
  Heart, 
  Sparkles, 
  Tv,
  ArrowRight,
  ExternalLink,
  Video
} from 'lucide-react';
import { useTravelData } from '../context/DataContext';
import ReelModal from './ReelModal';

export default function ReelsShowcase({ onOpenShowreel }) {
  const { reels, creatorProfile } = useTravelData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeReel, setActiveReel] = useState(null);

  const categories = ['All', 'Scenic Staycations', 'Travel Guides', 'Island Adventures', 'Hidden Gems'];

  const filteredReels = selectedCategory === 'All' 
    ? reels 
    : reels.filter(r => r.category === selectedCategory);

  return (
    <section id="reels" className="section-spacing">
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Short-Form Filmmaking
          </div>
          <h2 className="section-title-wiz">
            Cinematic stories & viral reels
          </h2>
          <p className="section-desc-wiz">
            Experience 4K drone cinematography, off-the-beaten-track expeditions, and authentic budget breakdowns with 65M+ total views.
          </p>
        </div>

        {/* Category Tabs & Channel Link */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: selectedCategory === cat 
                    ? '1.5px solid var(--green-primary)' 
                    : '1px solid var(--border-light)',
                  background: selectedCategory === cat 
                    ? 'var(--green-primary)' 
                    : 'var(--bg-card)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-heading)',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedCategory === cat ? '0 4px 12px rgba(45, 106, 79, 0.2)' : 'var(--shadow-sm)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Facebook Watch Direct */}
          <a
            href={creatorProfile.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-wiz btn-wiz-outline btn-wiz-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Video size={15} color="var(--green-primary)" />
            <span>Watch All on Facebook</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Reels Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              className="wiz-card"
              onClick={() => setActiveReel(reel)}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                aspectRatio: '9/15',
                maxHeight: '440px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem'
              }}
            >
              {/* Background Thumbnail */}
              <img 
                src={reel.thumbnail} 
                alt={reel.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.8)',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />

              {/* Gradient Vignette */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(19, 46, 34, 0.5) 0%, transparent 40%, rgba(19, 46, 34, 0.95) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Top Bar on Reel */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="pill-badge" style={{ background: '#FFFFFF', color: 'var(--green-primary)', fontWeight: '800' }}>
                  {reel.category}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#FFFFFF', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                  {reel.duration}
                </span>
              </div>

              {/* Central Glowing Play Button */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 2,
                  alignSelf: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  border: '1.5px solid #FFFFFF',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Play size={20} fill="var(--green-primary)" color="var(--green-primary)" style={{ marginLeft: '3px' }} />
              </div>

              {/* Bottom Info on Reel */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.3', marginBottom: '0.65rem' }}>
                  {reel.title}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#D8F3DC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Eye size={14} color="#74C69D" />
                    <span>{reel.views} views</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Heart size={14} color="#F87171" fill="#F87171" />
                    <span>{reel.likes}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reel Modal */}
      {activeReel && (
        <ReelModal 
          reel={activeReel} 
          onClose={() => setActiveReel(null)} 
        />
      )}
    </section>
  );
}
