import React, { useState } from 'react';
import { 
  Compass, 
  Mail, 
  ArrowUp, 
  Sparkles, 
  Globe, 
  Heart, 
  Send, 
  Check 
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TikTokIcon } from './SocialIcons';
import confetti from 'canvas-confetti';

export default function Footer({ onOpenFreeGuide }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#34d399', '#f4d06f']
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        background: '#04100c',
        borderTop: '1px solid rgba(52, 211, 153, 0.2)',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Main Footer Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Info & Mission */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(167, 243, 208, 0.3)'
                }}
              >
                <Compass size={22} color="#a7f3d0" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '0.04em', color: '#ffffff' }}>
                TINESKIE<span style={{ color: '#34d399' }}>.</span>TRAVEL
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              Documenting remote wilderness, mossy sanctuaries, and authentic island cultures. Committed to Leave No Trace principles and sustainable creator exploration.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
                { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com' },
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
                      background: 'rgba(14, 45, 34, 0.6)',
                      border: '1px solid rgba(52, 211, 153, 0.25)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#10b981';
                      e.currentTarget.style.color = '#071711';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(14, 45, 34, 0.6)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li><a href="#destinations" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Destinations & Guides</a></li>
              <li><a href="#reels" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>4K Showreels & Vlogs</a></li>
              <li><a href="#presets" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Lightroom Presets Studio</a></li>
              <li><a href="#planner" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Interactive Trip Planner</a></li>
              <li><a href="#gear" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Expedition Gear Bag</a></li>
              <li><a href="#mediakit" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Brand Partnerships & Press</a></li>
            </ul>
          </div>

          {/* Curated Travel Series */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Popular Expeditions
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li><a href="#destinations" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>🌿 Siargao Coconut Highways</a></li>
              <li><a href="#destinations" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>🏔️ Batanes Rolling Hills</a></li>
              <li><a href="#destinations" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>❄️ Lofoten Aurora Fjords</a></li>
              <li><a href="#destinations" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>🍵 Kyoto Sacred Moss Temples</a></li>
              <li><a href="#destinations" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>⛰️ Dolomites Blade Ridges</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              The Emerald Dispatch
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: '1.55', marginBottom: '1rem' }}>
              Join 65,000+ travelers receiving weekly flight deals, secret spot coordinates, and photography advice.
            </p>

            {isSubscribed ? (
              <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #34d399', borderRadius: '10px', fontSize: '0.84rem', color: '#a7f3d0' }}>
                ✓ Subscribed! Welcome to the adventurer community.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.85rem',
                      background: 'rgba(7, 23, 17, 0.8)',
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                  >
                    <Send size={15} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onOpenFreeGuide}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--emerald-300)',
                    fontSize: '0.78rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Or download the 25 Secret Hidden Gems PDF free →
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div 
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(52, 211, 153, 0.12)',
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
            © {new Date().getFullYear()} Tineskie Travel. All Rights Reserved. Crafted for nature lovers and visual storytellers.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(14, 45, 34, 0.6)',
              border: '1px solid rgba(52, 211, 153, 0.25)',
              color: 'var(--text-secondary)',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
