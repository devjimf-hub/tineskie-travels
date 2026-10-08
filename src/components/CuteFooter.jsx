import React, { useState } from 'react';
import { 
  Heart, 
  Send, 
  ArrowUp, 
  Sparkles,
  Gift
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TikTokIcon } from './SocialIcons';
import { creatorProfile } from '../data/travelData';
import confetti from 'canvas-confetti';

export default function CuteFooter({ onOpenFreeGuide }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2E5A44', '#FF8F70', '#34D399']
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        background: 'var(--color-bg-subtle)',
        borderTop: '1.5px solid var(--color-card-border)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        
        {/* Footer Top Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--green-matcha)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '1.1rem'
                }}
              >
                🌿
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '900', fontSize: '1.25rem', color: 'var(--text-main)' }}>
                notesby<span style={{ color: 'var(--green-matcha)' }}>tineskie</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Sharing honest travel notes, solo trip guides, mountain & island staycations, and discount codes for your next adventure.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {[
                { name: 'Facebook', icon: FacebookIcon, href: creatorProfile.facebookUrl },
                { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
                { name: 'TikTok', icon: TikTokIcon, href: 'https://tiktok.com' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'var(--color-card)',
                      border: '1.5px solid var(--color-card-border)',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: 'var(--shadow-cute)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--green-matcha)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-card)';
                      e.currentTarget.style.color = 'var(--text-main)';
                    }}
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Featured Itineraries
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><a href="#guides" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>🌲 Baguio & Mt. Camisong Solo Guide</a></li>
              <li><a href="#guides" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>✨ Cebu Mist Mountain Resort Staycation</a></li>
              <li><a href="#guides" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>🌴 Siargao Coconut Highways & Lagoons</a></li>
              <li><a href="#guides" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>🌾 Batanes Rolling Hills & Stone Houses</a></li>
              <li><a href="#guides" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>🍵 Kyoto Matcha Cafes & Moss Temples</a></li>
            </ul>
          </div>

          {/* Promo Deals */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Official Promo Codes
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><a href="#promos" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>🏨 Agoda: Code <strong style={{ color: 'var(--green-matcha)' }}>TINESKIE</strong> (15% OFF)</a></li>
              <li><a href="#promos" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>🎟️ Klook: Code <strong style={{ color: 'var(--green-matcha)' }}>TINESKIEKLOOK</strong> (10% OFF)</a></li>
              <li><a href="#promos" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>📶 Holafly eSIM: Code <strong style={{ color: 'var(--green-matcha)' }}>TINESKIE</strong> (5% OFF)</a></li>
              <li><a href={creatorProfile.facebookUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--green-matcha)', textDecoration: 'none', fontWeight: '700' }}>→ Follow on Facebook for updates</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              The Tineskie Dispatch 🍃
            </h4>
            <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: '1.55', marginBottom: '0.85rem' }}>
              Join 320,000+ travel besties for staycation drops, flash promo deals & secret photo spots.
            </p>

            {isSubscribed ? (
              <div style={{ padding: '0.75rem', background: 'var(--green-pistachio)', border: '1.5px solid var(--green-matcha)', borderRadius: '12px', fontSize: '0.84rem', color: 'var(--green-matcha-dark)', fontWeight: '700' }}>
                ✓ Subscribed! Welcome to the family ✨
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input 
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.85rem',
                      background: 'var(--color-card)',
                      border: '1.5px solid var(--color-card-border)',
                      borderRadius: '10px',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                  <button type="submit" className="btn-cute btn-cute-primary btn-cute-sm">
                    <Send size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onOpenFreeGuide}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--green-matcha)',
                    fontSize: '0.78rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: '700',
                    textDecoration: 'underline'
                  }}
                >
                  Or download the free 25 Secret Hidden Gems PDF →
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            paddingTop: '1.75rem',
            borderTop: '1.5px solid var(--color-card-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Notes by Tineskie 🌿 Crafted for curious solo travelers and staycation lovers.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--color-card)',
              border: '1.5px solid var(--color-card-border)',
              color: 'var(--text-main)',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: '700',
              boxShadow: 'var(--shadow-cute)'
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}
