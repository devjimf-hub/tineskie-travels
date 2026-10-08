import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Film, 
  Sliders, 
  MapPin, 
  Briefcase,
  Sparkles,
  Luggage
} from 'lucide-react';
import { toggleAmbientSound } from '../utils/audio';

export default function Navbar({ onOpenFreeGuide, theme, setTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
    { name: 'Destinations', href: '#destinations', icon: MapPin },
    { name: 'Reels & Films', href: '#reels', icon: Film },
    { name: 'Color Presets', href: '#presets', icon: Sliders },
    { name: 'Trip Planner', href: '#planner', icon: Compass },
    { name: 'Gear Bag', href: '#gear', icon: Luggage },
    { name: 'Media Kit', href: '#mediakit', icon: Briefcase },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#071711]/90 backdrop-blur-md border-b border-emerald-500/20 py-3 shadow-lg shadow-black/40' 
          : 'bg-gradient-to-b from-[#071711]/90 via-[#071711]/40 to-transparent py-5'
      }`}
      style={{
        background: isScrolled ? 'rgba(7, 23, 17, 0.88)' : 'linear-gradient(180deg, rgba(7, 23, 17, 0.95) 0%, rgba(7, 23, 17, 0.3) 70%, transparent 100%)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(52, 211, 153, 0.2)' : 'none'
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Brand Logo */}
          <a 
            href="#" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              textDecoration: 'none',
              color: 'var(--text-primary)'
            }}
          >
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                border: '1px solid rgba(167, 243, 208, 0.3)'
              }}
            >
              <Compass size={24} className="text-emerald-100" color="#a7f3d0" />
            </div>
            <div>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: '900', 
                fontSize: '1.25rem', 
                letterSpacing: '0.06em',
                display: 'block',
                lineHeight: '1.1'
              }}>
                TINESKIE<span style={{ color: '#34d399' }}>.</span>TRAVEL
              </span>
              <span style={{ 
                fontSize: '0.68rem', 
                letterSpacing: '0.18em', 
                color: 'var(--emerald-300)',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>
                Explorer & Visual Creator
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', listStyle: 'none', gap: '1.75rem', alignItems: 'center', margin: 0, padding: 0 }}>
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* Ambient Nature Sound Button */}
            <button
              onClick={handleAudioToggle}
              title={isAudioPlaying ? "Mute Nature Breeze" : "Play Rainforest Breeze Ambient"}
              aria-label="Toggle Ambient Audio"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: isAudioPlaying ? 'rgba(16, 185, 129, 0.25)' : 'rgba(14, 45, 34, 0.6)',
                border: isAudioPlaying ? '1px solid #34d399' : '1px solid rgba(52, 211, 153, 0.2)',
                color: isAudioPlaying ? '#a7f3d0' : 'var(--text-secondary)',
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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
                  <span>Nature Audio ON</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} />
                  <span>Ambient Audio</span>
                </>
              )}
            </button>

            {/* Free Guide CTA */}
            <button
              onClick={onOpenFreeGuide}
              className="btn btn-primary btn-sm"
              style={{ display: 'none' }}
              id="nav-free-guide-btn"
            >
              <Sparkles size={14} />
              <span>Free Secret Guide</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'rgba(14, 45, 34, 0.7)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                color: 'var(--text-primary)',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              className="mobile-hamburger"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div 
            style={{
              marginTop: '1rem',
              background: 'rgba(10, 31, 23, 0.98)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              borderRadius: '18px',
              padding: '1.25rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {navLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)'
                      }}
                    >
                      <IconComponent size={18} color="#34d399" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              })}
              <li style={{ paddingTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenFreeGuide();
                  }}
                  className="btn btn-primary"
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
        @media (min-width: 900px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
          #nav-free-guide-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
