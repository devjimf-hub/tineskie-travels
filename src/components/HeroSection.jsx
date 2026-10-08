import React from 'react';
import { 
  Play, 
  MapPin, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Flame,
  CheckCircle2,
  Globe2
} from 'lucide-react';

export default function HeroSection({ onOpenShowreel, onOpenFreeGuide }) {
  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Image with Layered Green Gradient Masks */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=2000&q=85')`,
          backgroundPosition: 'center 40%',
          backgroundSize: 'cover',
          zIndex: 1,
          filter: 'brightness(0.55) contrast(1.15) saturate(1.2)'
        }}
      />

      {/* Atmospheric Emerald Light Overlays */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(7, 23, 17, 0.75) 0%, rgba(10, 31, 23, 0.4) 40%, rgba(7, 23, 17, 0.95) 100%)',
          zIndex: 2
        }}
      />
      
      {/* Floating Emerald Ambient Orbs */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
        className="animate-pulse-glow"
      />

      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 160, 0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
        className="animate-pulse-glow"
      />

      {/* Hero Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ maxWidth: '820px' }}>
          
          {/* Live Status Pill */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(14, 45, 34, 0.85)',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              backdropFilter: 'blur(12px)',
              marginBottom: '1.75rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}
          >
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#00f5a0',
              boxShadow: '0 0 10px #00f5a0'
            }} />
            <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--emerald-200)' }}>
              Currently Exploring: <strong style={{ color: '#ffffff' }}>Siargao & Catangnan Palms, PH</strong>
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
              fontWeight: '900',
              lineHeight: '1.08',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              textShadow: '0 4px 25px rgba(0,0,0,0.7)'
            }}
          >
            Wild Horizons & <br />
            <span className="text-gradient-green font-serif" style={{ fontStyle: 'italic', fontWeight: '800' }}>
              Emerald Escapes.
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--sage-200)',
              lineHeight: '1.65',
              marginBottom: '2.25rem',
              maxWidth: '680px',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)'
            }}
          >
            Hi, I’m <strong>Tineskie</strong> — travel filmmaker, drone photographer, and adventure storyteller. 
            I document untouched landscapes, sacred moss trails, and remote islands to inspire your next eco-conscious voyage.
          </p>

          {/* Action CTAs */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '3.5rem'
            }}
          >
            <a href="#destinations" className="btn btn-primary btn-lg">
              <Compass size={20} />
              <span>Explore Guides</span>
            </a>

            <button 
              onClick={onOpenShowreel}
              className="btn btn-secondary btn-lg"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                border: '1px solid rgba(52, 211, 153, 0.4)'
              }}
            >
              <div 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Play size={13} fill="#a7f3d0" color="#a7f3d0" style={{ marginLeft: '2px' }} />
              </div>
              <span>Watch 2026 Showreel</span>
            </button>

            <button 
              onClick={onOpenFreeGuide}
              className="btn btn-outline-green btn-lg"
              style={{ padding: '0.95rem 1.6rem' }}
            >
              <Sparkles size={18} />
              <span>Get Free Preset Sample</span>
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1.25rem',
              padding: '1.5rem',
              background: 'rgba(12, 36, 27, 0.75)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
              borderRadius: '20px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
            }}
          >
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#34d399', fontFamily: 'var(--font-heading)' }}>
                485K+
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                Global Followers
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#a7f3d0', fontFamily: 'var(--font-heading)' }}>
                92M+
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                Video Reel Views
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#34d399', fontFamily: 'var(--font-heading)' }}>
                44
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                Countries Explored
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#f4d06f', fontFamily: 'var(--font-heading)' }}>
                14.2K+
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                Travelers Guided
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Bottom Wave / Fade */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '90px',
          background: 'linear-gradient(to top, var(--green-deep-forest) 0%, transparent 100%)',
          zIndex: 5
        }}
      />
    </section>
  );
}
