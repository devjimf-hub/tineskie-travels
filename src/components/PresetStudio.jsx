import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Check, 
  Download, 
  Star, 
  ArrowRight, 
  Eye, 
  Flame,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { presetsData } from '../data/travelData';
import confetti from 'canvas-confetti';

export default function PresetStudio({ onOpenFreeGuide }) {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isPurchased, setIsPurchased] = useState(false);

  const activePreset = presetsData[selectedPresetIndex];

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleBuy = () => {
    setIsPurchased(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#f4d06f', '#ffffff']
    });
    setTimeout(() => setIsPurchased(false), 4000);
  };

  return (
    <section id="presets" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Sliders size={16} />
            <span>Lightroom & LUT Presets</span>
          </div>
          <h2 className="section-title">
            The Signature <span className="text-gradient-green font-serif" style={{ fontStyle: 'italic' }}>Color Studio</span>
          </h2>
          <p className="section-description">
            Transform your raw travel photos and drone captures into cinematic masterpieces with our 1-click Lightroom desktop and mobile presets.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}
        >
          {presetsData.map((pack, idx) => (
            <button
              key={pack.id}
              onClick={() => {
                setSelectedPresetIndex(idx);
                setSliderPos(50);
              }}
              style={{
                padding: '0.75rem 1.4rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: selectedPresetIndex === idx 
                  ? '1.5px solid #34d399' 
                  : '1px solid rgba(52, 211, 153, 0.2)',
                background: selectedPresetIndex === idx 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(6, 78, 59, 0.5) 100%)' 
                  : 'rgba(14, 45, 34, 0.5)',
                color: selectedPresetIndex === idx ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: selectedPresetIndex === idx ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <span>{pack.title.split('Pack')[0]}</span>
              <span className={selectedPresetIndex === idx ? "badge-gold" : "badge-green"} style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
                {pack.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Main Interactive Preset Showcase (2 Columns) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Interactive Before/After Split Slider */}
          <div className="glass-panel" style={{ padding: '1.25rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Interactive Preview
              </span>
              <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: '600' }}>
                ◀ Drag slider left/right ▶
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
                height: '420px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'ew-resize',
                userSelect: 'none'
              }}
            >
              {/* After Image (Full width underneath) */}
              <img 
                src={activePreset.afterImg} 
                alt="After Lightroom Preset"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(7, 23, 17, 0.8)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#34d399',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  zIndex: 4
                }}
              >
                AFTER (Preset Applied)
              </div>

              {/* Before Image (Clipped overlay) */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${sliderPos}%`,
                  overflow: 'hidden',
                  zIndex: 2,
                  borderRight: '2px solid #34d399'
                }}
              >
                <img 
                  src={activePreset.beforeImg} 
                  alt="Before Raw Photo"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    minWidth: '400px',
                    objectFit: 'cover',
                    filter: 'saturate(0.85) contrast(0.9)'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    background: 'rgba(7, 23, 17, 0.8)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 4
                  }}
                >
                  BEFORE (RAW)
                </div>
              </div>

              {/* Divider Line & Handle Button */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${sliderPos}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#10b981',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 15px rgba(0,0,0,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 5,
                  pointerEvents: 'none'
                }}
              >
                <Sliders size={16} color="#071711" />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              100% Non-destructive color science tailored for Sony, Canon, iPhone & DJI D-Log.
            </div>
          </div>

          {/* Right Column: Preset Details & Pricing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f4d06f' }}>
                <Star size={16} fill="#f4d06f" />
                <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>{activePreset.rating}</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                ({activePreset.salesCount} creative downloads)
              </span>
            </div>

            <h3 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.2' }}>
              {activePreset.title}
            </h3>

            <p style={{ color: '#a7f3d0', fontSize: '1.05rem', fontWeight: '500', lineHeight: '1.5' }}>
              {activePreset.tagline}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              {activePreset.description}
            </p>

            {/* What's Included */}
            <div 
              style={{
                background: 'rgba(14, 45, 34, 0.6)',
                border: '1px solid rgba(52, 211, 153, 0.2)',
                borderRadius: '16px',
                padding: '1.25rem'
              }}
            >
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f4d06f', marginBottom: '0.75rem' }}>
                Included in this Collection:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activePreset.includes.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} color="#34d399" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & Purchase CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                    {activePreset.price}
                  </span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {activePreset.originalPrice}
                  </span>
                  <span className="badge-green" style={{ fontSize: '0.7rem' }}>40% OFF SALE</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Instant digital download via email
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  onClick={handleBuy}
                  className="btn btn-primary btn-lg"
                >
                  <ShoppingBag size={18} />
                  <span>{isPurchased ? 'Pack Unlocked! ✓' : 'Get Preset Pack'}</span>
                </button>

                <button
                  onClick={onOpenFreeGuide}
                  className="btn btn-secondary btn-lg"
                  title="Try 1 free preset sample"
                >
                  <Sparkles size={18} color="#f4d06f" />
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
