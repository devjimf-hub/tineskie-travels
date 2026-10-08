import React, { useState, useEffect } from 'react';
import { useTravelData } from '../context/DataContext';
import { FacebookIcon } from './SocialIcons';
import { 
  Tag, 
  Compass, 
  Sparkles, 
  MapPin, 
  Users, 
  Video, 
  Globe, 
  BookOpen, 
  CheckCircle2, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

export default function WizHero({ onOpenFreeGuide }) {
  const { creatorProfile } = useTravelData();
  
  // Multi-photo list fallback
  const rawPhotos = creatorProfile.heroPhotos && creatorProfile.heroPhotos.length > 0
    ? creatorProfile.heroPhotos
    : [
        {
          id: "photo-1",
          url: creatorProfile.avatar || "/tineskie-profile.jpg",
          location: creatorProfile.currentLocation || "Baguio & Mountain Province, PH",
          badge: `Traveling with ${creatorProfile.petName || 'Max'}`,
          caption: "Mornings in the foggy pine mountains"
        }
      ];

  const photos = rawPhotos;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance circular slideshow smoothly
  useEffect(() => {
    if (!isPlaying || photos.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, photos.length, activeIndex]);

  const goToPhoto = (idx) => {
    setActiveIndex(idx);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const getStatIcon = (iconName) => {
    switch (iconName) {
      case 'Users': return <Users size={18} color="var(--green-primary)" />;
      case 'Video': return <Video size={18} color="var(--green-primary)" />;
      case 'Globe': return <Globe size={18} color="var(--green-primary)" />;
      case 'BookOpen': return <BookOpen size={18} color="var(--green-primary)" />;
      default: return <Sparkles size={18} color="var(--green-primary)" />;
    }
  };

  // Helper to compute position style for each card in the moving circular carousel
  const getCardStyle = (index) => {
    const total = photos.length;
    let diff = (index - activeIndex) % total;
    if (diff < 0) diff += total;

    // Center Active Card
    if (diff === 0) {
      return {
        transform: 'translateX(0px) translateY(0px) scale(1) rotate(0deg)',
        opacity: 1,
        zIndex: 10,
        pointerEvents: 'auto',
        filter: 'blur(0px) brightness(1)',
        cursor: 'default'
      };
    }

    // Right Preview Card (Next in circle)
    if (diff === 1 || (total === 2 && diff === 1)) {
      return {
        transform: 'translateX(175px) translateY(16px) scale(0.66) rotate(11deg)',
        opacity: 0.82,
        zIndex: 5,
        pointerEvents: 'auto',
        filter: 'blur(0.4px) brightness(0.9)',
        cursor: 'pointer'
      };
    }

    // Left Preview Card (Previous in circle)
    if (diff === total - 1) {
      return {
        transform: 'translateX(-175px) translateY(-16px) scale(0.66) rotate(-11deg)',
        opacity: 0.82,
        zIndex: 5,
        pointerEvents: 'auto',
        filter: 'blur(0.4px) brightness(0.9)',
        cursor: 'pointer'
      };
    }

    // Distant background cards in the circle
    return {
      transform: 'translateX(0px) translateY(40px) scale(0.4) rotate(0deg)',
      opacity: 0,
      zIndex: 1,
      pointerEvents: 'none',
      filter: 'blur(4px) brightness(0.7)'
    };
  };

  return (
    <section style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Main 2-Column Hero Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '3rem'
          }}
        >
          {/* Left Column: Typography & Actions */}
          <div>
            {/* Header Badge */}
            <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.95rem',
                  borderRadius: '9999px',
                  background: 'var(--green-pastel)',
                  border: '1px solid rgba(45, 106, 79, 0.2)',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  color: 'var(--green-dark)'
                }}
              >
                <Sparkles size={14} color="var(--green-primary)" />
                <span>Hey, I'm Tineskie!</span>
              </div>

              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: 'var(--green-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <CheckCircle2 size={14} color="#10B981" />
                <span>Verified Travel Creator</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 
              style={{
                fontSize: 'clamp(3rem, 6.5vw, 4.75rem)',
                fontWeight: '900',
                color: 'var(--text-heading)',
                letterSpacing: '-0.03em',
                lineHeight: '1.02',
                marginBottom: '0.65rem'
              }}
            >
              {creatorProfile.name}
            </h1>

            {/* Subtitle Category */}
            <div 
              style={{
                fontSize: '0.88rem',
                fontWeight: '800',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--green-primary)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>TRAVEL CONTENT CREATOR & BESTIE</span>
              <span style={{ color: 'var(--green-mint)' }}>✦</span>
            </div>

            {/* Bio paragraph */}
            <p 
              style={{
                fontSize: '1.08rem',
                color: 'var(--text-body)',
                lineHeight: '1.7',
                marginBottom: '2.25rem',
                maxWidth: '560px'
              }}
            >
              I’m here to help you travel smarter with practical guides, honest staycation reviews, and exclusive verified promo codes so you can explore more for less.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <a 
                href="#deals" 
                className="btn-wiz btn-wiz-primary"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.85rem 1.6rem',
                  fontSize: '0.95rem',
                  fontWeight: '800'
                }}
              >
                <Tag size={17} />
                <span>Claim Discount Codes</span>
              </a>

              <a 
                href="#itineraries" 
                className="btn-wiz btn-wiz-outline"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '800'
                }}
              >
                <Compass size={17} />
                <span>Browse Itineraries</span>
              </a>

              <a 
                href={creatorProfile.facebookUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.85rem 1.35rem',
                  borderRadius: '9999px',
                  background: 'var(--green-subtle)',
                  color: 'var(--green-dark)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: '800',
                  border: '1px solid rgba(45, 106, 79, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                className="social-hover-btn"
              >
                <FacebookIcon size={16} color="var(--green-dark)" />
                <span>Facebook (320K)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Moving 3D Carousel Photo Stage */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Ambient Background Glow */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '440px',
                height: '440px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(183, 228, 199, 0.5) 0%, rgba(216, 243, 220, 0.25) 50%, transparent 75%)',
                filter: 'blur(35px)',
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />

            {/* Orbit Dashed Decorative Ring */}
            <div 
              className="hero-orbit-ring"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '460px',
                height: '460px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(82, 183, 136, 0.35)',
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />

            {/* 3D CAROUSEL STAGE (Houses all smoothly gliding cards) */}
            <div 
              className="hero-carousel-stage"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                height: '440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1000px',
                zIndex: 2
              }}
            >
              {photos.map((photo, idx) => {
                const isCenter = idx === activeIndex;
                const posStyle = getCardStyle(idx);

                return (
                  <div
                    key={photo.id || idx}
                    onClick={() => {
                      if (!isCenter) goToPhoto(idx);
                    }}
                    className="hero-moving-card"
                    style={{
                      position: 'absolute',
                      width: '350px',
                      aspectRatio: '4 / 4.5',
                      borderRadius: '32px',
                      padding: '8px',
                      background: '#FFFFFF',
                      border: isCenter ? '2px solid rgba(45, 106, 79, 0.22)' : '2px solid rgba(82, 183, 136, 0.25)',
                      boxShadow: isCenter ? '0 24px 50px -12px rgba(27, 67, 50, 0.22)' : '0 12px 25px rgba(27, 67, 50, 0.12)',
                      overflow: 'hidden',
                      transformOrigin: 'center center',
                      transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease, filter 0.65s ease, box-shadow 0.65s ease',
                      willChange: 'transform, opacity, filter',
                      ...posStyle
                    }}
                  >
                    {/* Inner Image Container */}
                    <div 
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        background: '#0B291D'
                      }}
                    >
                      <img 
                        src={photo.url} 
                        alt={photo.caption || creatorProfile.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 22%',
                          display: 'block'
                        }}
                      />

                      {/* Gentle base gradient */}
                      <div 
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 40%, rgba(7, 23, 17, 0.4) 100%)',
                          pointerEvents: 'none'
                        }}
                      />
                    </div>

                    {/* Floating Top Badge: Pet / Mood (Only visible on active or semi-visible on side) */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '18px',
                        left: '18px',
                        background: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(45, 106, 79, 0.18)',
                        borderRadius: '9999px',
                        padding: '0.4rem 0.85rem',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.76rem',
                        fontWeight: '800',
                        color: 'var(--green-dark)',
                        zIndex: 4,
                        opacity: isCenter ? 1 : 0,
                        transition: 'opacity 0.4s ease'
                      }}
                    >
                      <Heart size={12} fill="#E63946" color="#E63946" />
                      <span>{photo.badge || `Traveling with ${creatorProfile.petName || 'Max'}`}</span>
                    </div>

                    {/* Floating Bottom Badge: Live Location with Pulse */}
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '18px',
                        right: '18px',
                        background: 'rgba(255, 255, 255, 0.96)',
                        backdropFilter: 'blur(12px)',
                        border: '1.5px solid var(--green-primary)',
                        borderRadius: '9999px',
                        padding: '0.45rem 1rem',
                        boxShadow: '0 8px 20px rgba(27, 67, 50, 0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        color: 'var(--text-heading)',
                        zIndex: 4,
                        opacity: isCenter ? 1 : 0,
                        transition: 'opacity 0.4s ease'
                      }}
                    >
                      <span style={{ 
                        width: '7px', 
                        height: '7px', 
                        borderRadius: '50%', 
                        background: '#10B981',
                        boxShadow: '0 0 8px #10B981'
                      }} />
                      <MapPin size={14} color="var(--green-primary)" />
                      <span>{photo.location || creatorProfile.currentLocation}</span>
                    </div>

                    {/* Small Caption for Side Cards */}
                    {!isCenter && (
                      <div 
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          right: '12px',
                          background: 'rgba(7, 23, 17, 0.85)',
                          backdropFilter: 'blur(6px)',
                          borderRadius: '8px',
                          padding: '0.35rem 0.5rem',
                          textAlign: 'center',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: '800',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {photo.location ? photo.location.split(',')[0] : 'Note'}
                      </div>
                    )}

                    {/* Arrow navigation buttons inside active card */}
                    {isCenter && photos.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="hero-arrow-btn"
                          aria-label="Previous photo"
                          style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(45, 106, 79, 0.2)',
                            color: 'var(--green-dark)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 5,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                          }}
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <button
                          onClick={handleNext}
                          className="hero-arrow-btn"
                          aria-label="Next photo"
                          style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(45, 106, 79, 0.2)',
                            color: 'var(--green-dark)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 5,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                          }}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CIRCLE THUMBNAILS & CLEAN SLIDESHOW CONTROLS BAR */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '1.25rem',
                padding: '0.45rem 0.95rem',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                borderRadius: '9999px',
                border: '1px solid rgba(82, 183, 136, 0.25)',
                boxShadow: '0 8px 20px rgba(27, 67, 50, 0.08)',
                zIndex: 5
              }}
            >
              {/* Circle Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                {photos.map((p, idx) => (
                  <button
                    key={p.id || idx}
                    onClick={() => goToPhoto(idx)}
                    title={p.location || `Photo ${idx + 1}`}
                    style={{
                      width: activeIndex === idx ? '26px' : '10px',
                      height: '10px',
                      borderRadius: '9999px',
                      background: activeIndex === idx ? 'var(--green-primary)' : 'rgba(82, 183, 136, 0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      padding: 0
                    }}
                  />
                ))}
              </div>

              {/* Counter Indicator */}
              <span style={{ fontSize: '0.74rem', fontWeight: '800', color: 'var(--green-dark)' }}>
                {activeIndex + 1} / {photos.length}
              </span>

              {/* Play / Pause Toggle */}
              {photos.length > 1 && (
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--green-primary)',
                    cursor: 'pointer',
                    padding: '2px 4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Full-Width 4-Column Stats Banner */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            background: '#FFFFFF',
            padding: '1.5rem 2rem',
            borderRadius: '24px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          {creatorProfile.stats.map((st, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                paddingRight: i < 3 ? '1rem' : 0,
                borderRight: i < 3 ? '1px solid rgba(45, 106, 79, 0.08)' : 'none'
              }}
              className="stat-banner-item"
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--green-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(45, 106, 79, 0.1)'
                }}
              >
                {getStatIcon(st.icon)}
              </div>
              <div>
                <div style={{ fontWeight: '900', fontSize: '1.35rem', color: 'var(--text-heading)', lineHeight: '1.1' }}>
                  {st.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
                  {st.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Orbit & Keyframe Styles */}
      <style>{`
        /* Orbit dashed ring rotation */
        .hero-orbit-ring {
          animation: orbitRotate 45s linear infinite;
        }

        @keyframes orbitRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .hero-moving-card:not([style*="scale(1)"]):hover {
          filter: brightness(1) !important;
          transform: scale(0.72) !important;
        }

        .hero-arrow-btn:hover {
          background: #FFFFFF !important;
          color: var(--green-primary) !important;
          transform: translateY(-50%) scale(1.15) !important;
        }

        @media (max-width: 1024px) {
          .hero-carousel-stage {
            max-width: 380px;
          }
        }

        @media (max-width: 768px) {
          .hero-moving-card:not([style*="scale(1)"]) {
            display: none !important;
          }
          .hero-orbit-ring {
            display: none !important;
          }
          .stat-banner-item {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

