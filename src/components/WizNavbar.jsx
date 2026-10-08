import React, { useState } from 'react';
import { FacebookIcon, InstagramIcon, TikTokIcon } from './SocialIcons';
import { useTravelData } from '../context/DataContext';
import { 
  Compass, 
  Menu, 
  X, 
  Tag, 
  Map, 
  Calendar, 
  Plane, 
  Sliders, 
  Video, 
  Sparkles,
  Calculator,
  ChevronDown,
  Shield
} from 'lucide-react';

export default function WizNavbar({ onOpenFreeGuide, onOpenAdmin }) {
  const { creatorProfile, isFirebaseLive } = useTravelData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(240, 246, 242, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-light)',
        padding: '0.75rem 0'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          
          {/* Brand Logo & Title */}
          <a 
            href="#" 
            style={{ 
              textDecoration: 'none', 
              color: 'var(--text-heading)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexShrink: 0
            }}
          >
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--green-primary) 0%, var(--green-dark) 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(45, 106, 79, 0.22)'
              }}
            >
              <Compass size={20} strokeWidth={2.5} color="#D8F3DC" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ 
                fontWeight: '900', 
                fontSize: '1.2rem', 
                letterSpacing: '-0.02em', 
                color: 'var(--text-heading)', 
                lineHeight: '1.1' 
              }}>
                TINESKIE
              </span>
              <span style={{ 
                fontSize: '0.65rem', 
                color: 'var(--green-primary)', 
                fontWeight: '700', 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}>
                Travel Notes & Guides
              </span>
            </div>
          </a>

          {/* Center Clean Desktop Navigation */}
          <nav style={{ display: 'none' }} className="wiz-desktop-nav">
            <ul style={{ 
              display: 'flex', 
              listStyle: 'none', 
              gap: '0.35rem', 
              margin: 0, 
              padding: '0.3rem 0.5rem', 
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.65)',
              borderRadius: '9999px',
              border: '1px solid rgba(45, 106, 79, 0.09)',
              boxShadow: '0 2px 8px rgba(27, 67, 50, 0.03)'
            }}>
              <li>
                <a href="#deals" className="nav-item-link">
                  <span>Deals</span>
                </a>
              </li>
              <li>
                <a href="#destinations" className="nav-item-link">
                  <span>Destinations</span>
                </a>
              </li>
              <li>
                <a href="#itineraries" className="nav-item-link">
                  <span>Itineraries</span>
                </a>
              </li>
              <li>
                <a href="#guides" className="nav-item-link">
                  <span>Guides</span>
                </a>
              </li>
              <li>
                <a href="#planner" className="nav-item-link">
                  <span>Planner</span>
                </a>
              </li>
              <li>
                <a href="#reels" className="nav-item-link">
                  <span>Reels</span>
                </a>
              </li>
              <li>
                <a href="#presets" className="nav-item-link">
                  <span>Presets</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Group: Social Icons + Claim Codes CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
            {/* Social Icons with Subtle Divider */}
            <div style={{ display: 'none', alignItems: 'center', gap: '0.45rem', paddingRight: '0.5rem', borderRight: '1px solid rgba(45, 106, 79, 0.15)' }} className="wiz-social-bar">
              <a 
                href={creatorProfile.facebookUrl} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: '#FFFFFF', 
                  border: '1px solid var(--border-light)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--green-primary)',
                  transition: 'all 0.2s ease'
                }}
                title="Facebook Notes by Tineskie (320K)"
                className="social-hover-btn"
              >
                <FacebookIcon size={15} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: '#FFFFFF', 
                  border: '1px solid var(--border-light)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--green-primary)',
                  transition: 'all 0.2s ease'
                }}
                title="Instagram"
                className="social-hover-btn"
              >
                <InstagramIcon size={15} />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: '#FFFFFF', 
                  border: '1px solid var(--border-light)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--green-primary)',
                  transition: 'all 0.2s ease'
                }}
                title="TikTok"
                className="social-hover-btn"
              >
                <TikTokIcon size={15} />
              </a>
            </div>

            {/* Claim Codes CTA */}
            <a
              href="#deals"
              className="btn-wiz btn-wiz-primary btn-wiz-sm"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1.15rem',
                fontSize: '0.84rem',
                fontWeight: '800',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 14px rgba(45, 106, 79, 0.2)'
              }}
            >
              <Tag size={13} />
              <span>Claim Codes</span>
            </a>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                color: 'var(--text-heading)',
                cursor: 'pointer'
              }}
              className="wiz-mobile-toggle"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div 
            style={{
              marginTop: '0.85rem',
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: '20px',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-card-hover)',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <a href="#deals" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Tag size={16} color="var(--green-primary)" />
                  <span>Deals & Promo Codes</span>
                </a>
              </li>
              <li>
                <a href="#destinations" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Map size={16} color="var(--green-primary)" />
                  <span>Pick Your Adventure</span>
                </a>
              </li>
              <li>
                <a href="#itineraries" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Calendar size={16} color="var(--green-primary)" />
                  <span>Travel Itineraries</span>
                </a>
              </li>
              <li>
                <a href="#guides" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Plane size={16} color="var(--green-primary)" />
                  <span>Travel Guides & Visa</span>
                </a>
              </li>
              <li>
                <a href="#planner" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Calculator size={16} color="var(--green-primary)" />
                  <span>Trip Cost & Budget Planner</span>
                </a>
              </li>
              <li>
                <a href="#reels" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Video size={16} color="var(--green-primary)" />
                  <span>Cinematic Reels</span>
                </a>
              </li>
              <li>
                <a href="#presets" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Sliders size={16} color="var(--green-primary)" />
                  <span>Lightroom Presets Studio</span>
                </a>
              </li>
              <li style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <a href={creatorProfile.facebookUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--green-primary)', fontWeight: '800', textDecoration: 'none', fontSize: '0.88rem' }}>Facebook (320K)</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--green-primary)', fontWeight: '800', textDecoration: 'none', fontSize: '0.88rem' }}>Instagram</a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={{ color: 'var(--green-primary)', fontWeight: '800', textDecoration: 'none', fontSize: '0.88rem' }}>TikTok</a>
              </li>
            </ul>
          </div>
        )}

      </div>

      <style>{`
        .nav-item-link {
          color: var(--text-body);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.45rem 0.85rem;
          border-radius: 9999px;
          transition: all 0.2s ease;
          display: inline-block;
        }
        .nav-item-link:hover {
          color: var(--green-dark);
          background: rgba(45, 106, 79, 0.09);
        }
        .social-hover-btn:hover {
          background: var(--green-subtle) !important;
          transform: translateY(-1px);
        }
        @media (min-width: 1024px) {
          .wiz-desktop-nav {
            display: block !important;
          }
          .wiz-social-bar {
            display: flex !important;
          }
          .wiz-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
