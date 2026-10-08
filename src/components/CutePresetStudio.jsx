import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Check, 
  Download, 
  Star, 
  ShoppingBag,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { cutePresetsData } from '../data/travelData';
import confetti from 'canvas-confetti';

export default function CutePresetStudio({ onOpenFreeGuide }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isPurchased, setIsPurchased] = useState(false);

  const activePreset = cutePresetsData[selectedIdx];

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleBuy = () => {
    setIsPurchased(true);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2D6A4F', '#52B788', '#D8F3DC', '#E9C46A']
    });
    setTimeout(() => setIsPurchased(false), 3500);
  };

  return (
    <section id="presets" className="section-spacing">
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Lightroom Presets
          </div>
          <h2 className="section-title-wiz">
            The Signature Matcha Color Studio
          </h2>
          <p className="section-desc-wiz">
            Transform raw phone and camera photos into dreamy, soft green aesthetic memories in 1 click using the free Lightroom Mobile app.
          </p>
        </div>

        {/* Preset Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {cutePresetsData.map((pack, idx) => (
            <button
              key={pack.id}
              onClick={() => {
                setSelectedIdx(idx);
                setSliderPos(50);
              }}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                border: selectedIdx === idx 
                  ? '1.5px solid var(--green-primary)' 
                  : '1px solid var(--border-light)',
                background: selectedIdx === idx 
                  ? 'var(--green-primary)' 
                  : 'var(--bg-card)',
                color: selectedIdx === idx ? '#FFFFFF' : 'var(--text-heading)',
                boxShadow: selectedIdx === idx ? '0 4px 15px rgba(45, 106, 79, 0.2)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{pack.title.split('Pack')[0]}</span>
              <span className="pill-badge" style={{ background: selectedIdx === idx ? 'rgba(255,255,255,0.2)' : 'var(--green-badge)', color: selectedIdx === idx ? '#FFFFFF' : 'var(--green-primary)', padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
                {pack.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Before/After Showcase */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Interactive Slider */}
          <div className="wiz-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={13} color="var(--green-primary)" />
                <span>LIVE INTERACTIVE PREVIEW</span>
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--green-primary)', fontWeight: '800' }}>
                ◀ Drag slider to compare ▶
              </span>
            </div>

            {/* Slider Container */}
            <div
              onMouseMove={handleSliderMove}
              onTouchMove={(e) => {
                if (e.touches[0]) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                  const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                  setSliderPos(percent);
                }
              }}
              style={{
                position: 'relative',
                height: '380px',
                borderRadius: '18px',
                overflow: 'hidden',
                cursor: 'ew-resize',
                userSelect: 'none'
              }}
            >
              {/* After Image */}
              <img 
                src={activePreset.afterImg} 
                alt="After preset applied"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0.85rem',
                  right: '0.85rem',
                  background: 'rgba(19, 46, 34, 0.9)',
                  color: '#FFFFFF',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  zIndex: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Sparkles size={12} color="#52B788" />
                <span>AFTER (Matcha Glow)</span>
              </div>

              {/* Before Image (Clipped) */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${sliderPos}%`,
                  overflow: 'hidden',
                  zIndex: 2,
                  borderRight: '3px solid #FFFFFF'
                }}
              >
                <img 
                  src={activePreset.beforeImg} 
                  alt="Before raw photo"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    minWidth: '380px',
                    objectFit: 'cover',
                    filter: 'saturate(0.85)'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    zIndex: 4
                  }}
                >
                  BEFORE (RAW)
                </div>
              </div>

              {/* Handle Knob */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${sliderPos}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--green-primary)',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 5,
                  pointerEvents: 'none'
                }}
              >
                <Sliders size={15} color="#FFFFFF" />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Works with iPhone, Android, Canon & Sony RAW / JPEG.
            </div>
          </div>

          {/* Right Column: Preset Details & Buy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ display: 'flex', color: '#E9C46A' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#E9C46A" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                {activePreset.rating} ({activePreset.reviews})
              </span>
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-heading)', lineHeight: '1.2' }}>
              {activePreset.title}
            </h3>

            <p style={{ color: 'var(--green-primary)', fontSize: '1rem', fontWeight: '700' }}>
              {activePreset.tagline}
            </p>

            {/* Checklist */}
            <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '18px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-heading)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--green-primary)" />
                  <span>10 Signature Desktop (.XMP) & Mobile (.DNG) Presets</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--green-primary)" />
                  <span>1-Click Free Lightroom Mobile App Installation Video</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--green-primary)" />
                  <span>Skin Tone Recovery & Sun Flare Texture Overlays</span>
                </div>
              </div>
            </div>

            {/* Price & Buy Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                    {activePreset.price}
                  </span>
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₱899
                  </span>
                  <span className="pill-badge" style={{ fontSize: '0.7rem' }}>Save 45%</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instant digital download via email</div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  onClick={handleBuy}
                  className="btn-wiz btn-wiz-primary"
                >
                  <ShoppingBag size={17} />
                  <span>{isPurchased ? 'Pack Unlocked!' : 'Get Preset Pack'}</span>
                </button>

                <button
                  onClick={onOpenFreeGuide}
                  className="btn-wiz btn-wiz-outline"
                >
                  <Sparkles size={16} />
                  <span>Free Sample</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
