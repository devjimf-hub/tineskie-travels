import React, { useState } from 'react';
import { FacebookIcon, InstagramIcon, TikTokIcon } from './SocialIcons';
import { useTravelData } from '../context/DataContext';
import { ArrowUp, Compass, Mail, CheckCircle2, Send, Tag, Map, Calendar, Plane, ShieldCheck, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WizFooter({ onOpenAdmin }) {
  const { creatorProfile, recordLead } = useTravelData();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await recordLead({ email, name: 'Newsletter Subscriber', guideType: 'Weekly Tineskie Dispatch' });
    } catch (err) {}
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2D6A4F', '#52B788', '#D8F3DC']
    });
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer 
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-light)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        
        {/* Newsletter Box */}
        <div 
          style={{
            background: 'linear-gradient(135deg, var(--green-subtle) 0%, #FFFFFF 100%)',
            border: '1.5px solid var(--border-light)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            marginBottom: '3.5rem',
            boxShadow: 'var(--shadow-card)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>
              The Tineskie Dispatch
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
              Get Exclusive Promo Drops & Secret Guides
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
              Join 45,000+ travel besties who receive new Agoda flash deals, weekend itinerary drops, and Lightroom preset giveaways.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div 
                style={{
                  background: 'var(--green-badge)',
                  border: '1px solid var(--green-mint)',
                  borderRadius: '16px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: 'var(--green-dark)',
                  fontWeight: '700',
                  fontSize: '0.9rem'
                }}
              >
                <CheckCircle2 size={20} color="#10B981" />
                <span>You're in! Welcome to the travel bestie inner circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      borderRadius: '9999px',
                      border: '1.5px solid var(--border-light)',
                      background: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                      color: 'var(--text-heading)'
                    }}
                  />
                </div>
                <button type="submit" className="btn-wiz btn-wiz-primary btn-wiz-sm">
                  <span>Subscribe</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Main Links */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          
          {/* Brand Logo & Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--green-primary) 0%, var(--green-dark) 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Compass size={18} strokeWidth={2.5} color="#D8F3DC" />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '900', fontSize: '1.25rem', color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
              TINESKIE TRAVEL
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '480px', margin: 0 }}>
            Practical guides, honest tips, and exclusive deals so you can explore more for less.
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <a 
              href={creatorProfile.facebookUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-primary)', textDecoration: 'none' }}
              title="Facebook"
            >
              <FacebookIcon size={17} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-primary)', textDecoration: 'none' }}
              title="Instagram"
            >
              <InstagramIcon size={17} />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noreferrer"
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-primary)', textDecoration: 'none' }}
              title="TikTok"
            >
              <TikTokIcon size={17} />
            </a>
          </div>

          {/* Copyright & Back to Top */}
          <div 
            style={{
              width: '100%',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-light)',
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
              © Notes by Tineskie 2026. All rights reserved.
            </div>

            <button
              onClick={scrollToTop}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-heading)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: '700'
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
