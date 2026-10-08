import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  Tag, 
  Sliders, 
  Luggage,
  Heart
} from 'lucide-react';
import { toggleAmbientSound } from '../utils/audio';

export default function CuteNavbar({ onOpenFreeGuide, theme, setTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = toggleAmbientSound((state) => setIsAudioPlaying(state));
    setIsAudioPlaying(active);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navLinks = [
    { name: 'Travel Guides', href: '#guides', emoji: '🗺️' },
    { name: 'Promo Codes', href: '#promos', emoji: '🏷️' },
    { name: 'Budget Planner', href: '#planner', emoji: '✨' },
    { name: 'Presets', href: '#presets', emoji: '📸' },
    { name: 'Travel Tips', href: '#tips', emoji: '💡' },
  ];

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.25s ease',
        background: isScrolled 
          ? (theme === 'dark' ? 'rgba(13, 33, 23, 0.92)' : 'rgba(244, 247, 244, 0.92)') 
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--color-card-border)' : 'none',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Brand Logo & Cute Leaf */}
          <a 
            href="#" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.65rem', 
              textDecoration: 'none',
              color: 'var(--text-main)'
            }}
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--green-matcha)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '1.2rem',
                boxShadow: '0 4px 12px rgba(46, 90, 68, 0.25)'
              }}
            >
              🌿
            </div>
            <div>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: '900', 
                fontSize: '1.25rem', 
                letterSpacing: '-0.01em',
                display: 'block',
                lineHeight: '1.1',
                color: 'var(--text-main)'
              }}>
                notesby<span style={{ color: 'var(--green-matcha)' }}>tineskie</span>
              </span>
              <span style={{ 
                fontSize: '0.72rem', 
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}>
                solo travel & staycation notes 🌿
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none' }} className="desktop-cute-nav">
            <ul style={{ 
              display: 'flex', 
              listStyle: 'none', 
              gap: '0.5rem', 
              alignItems: 'center', 
              margin: 0, 
              padding: '0.35rem 0.6rem',
              background: 'var(--color-card)',
              borderRadius: '9999px',
              border: '1.5px solid var(--color-card-border)',
              boxShadow: 'var(--shadow-cute)'
            }}>
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    style={{
                      color: 'var(--text-body)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      padding: '0.45rem 1rem',
                      borderRadius: '9999px',
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--green-pistachio)';
                      e.currentTarget.style.color = 'var(--green-matcha-dark)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-body)';
                    }}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            
            {/* Ambient Sound Button */}
            <button
              onClick={handleAudioToggle}
              title={isAudioPlaying ? "Mute Ocean Breeze" : "Play Island Breeze Audio"}
              aria-label="Toggle Ambient Audio"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: isAudioPlaying ? 'var(--green-pistachio)' : 'var(--color-card)',
                border: isAudioPlaying ? '1.5px solid var(--green-matcha)' : '1.5px solid var(--color-card-border)',
                color: isAudioPlaying ? 'var(--green-matcha-dark)' : 'var(--text-body)',
                padding: '0.45rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-cute)'
              }}
            >
              {isAudioPlaying ? (
                <>
                  <div className="sound-bars">
                    <div className="sound-bar" />
                    <div className="sound-bar" />
                    <div className="sound-bar" />
                    <div className="sound-bar" />
                  </div>
                  <span>Breeze ON 🍃</span>
                </>
              ) : (
                <>
                  <span>🍃</span>
                  <span>Audio</span>
                </>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? "Light Matcha Mode" : "Dark Forest Mode"}
              aria-label="Toggle Theme"
              style={{
                background: 'var(--color-card)',
                border: '1.5px solid var(--color-card-border)',
                color: 'var(--text-body)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-cute)'
              }}
            >
              {theme === 'dark' ? <Sun size={17} color="#F9C74F" /> : <Moon size={17} color="var(--green-matcha)" />}
            </button>

            {/* Free Guide CTA */}
            <button
              onClick={onOpenFreeGuide}
              className="btn-cute btn-cute-peach btn-cute-sm"
              style={{ display: 'none' }}
              id="cute-nav-cta"
            >
              <Sparkles size={14} />
              <span>Free Guide ✨</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'var(--color-card)',
                border: '1.5px solid var(--color-card-border)',
                color: 'var(--text-main)',
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-cute)'
              }}
              className="mobile-cute-toggle"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div 
            style={{
              marginTop: '0.85rem',
              background: 'var(--color-card)',
              border: '1.5px solid var(--color-card-border)',
              borderRadius: '24px',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-modal)'
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      color: 'var(--text-main)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      padding: '0.6rem 0.85rem',
                      borderRadius: '12px',
                      background: 'var(--color-bg-subtle)'
                    }}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
              <li style={{ paddingTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenFreeGuide();
                  }}
                  className="btn-cute btn-cute-peach"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Sparkles size={16} />
                  <span>Download Free 25 Hidden Gems Guide</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 920px) {
          .desktop-cute-nav {
            display: block !important;
          }
          .mobile-cute-toggle {
            display: none !important;
          }
          #cute-nav-cta {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
