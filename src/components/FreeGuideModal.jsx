import React, { useState } from 'react';
import { useTravelData } from '../context/DataContext';
import { 
  X, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Mail, 
  FileText, 
  Gift,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FreeGuideModal({ isOpen, onClose }) {
  const { recordLead } = useTravelData();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await recordLead({
        email,
        name: firstName || 'Travel Bestie',
        guideType: 'Siargao Secret Roads & Matcha Preset'
      });
    } catch (err) {
      console.warn('Lead save notice:', err);
    }

    setIsSent(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2D6A4F', '#52B788', '#D8F3DC', '#E9C46A']
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-wiz" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '560px',
          padding: '2.25rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-primary)',
            border: 'none',
            color: 'var(--text-heading)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {isSent ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--green-badge)',
                border: '2px solid var(--green-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}
            >
              <CheckCircle2 size={36} color="var(--green-primary)" />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
              Your Free Guide is on the way!
            </h3>
            
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              We've dispatched the <strong>25 Secret Hidden Gems of Asia (48-page PDF)</strong> and your <strong>Matcha Glow Lightroom Preset (.DNG)</strong> to <span style={{ color: 'var(--green-primary)', fontWeight: '700' }}>{email}</span>.
            </p>

            <button 
              onClick={onClose}
              className="btn-wiz btn-wiz-primary"
              style={{ width: '100%' }}
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
              <span className="pill-badge" style={{ background: 'var(--accent-gold-light)', color: '#854D0E', border: '1px solid rgba(233, 196, 106, 0.4)' }}>
                <Gift size={12} color="#CA8A04" />
                <span>100% Free Download</span>
              </span>
              <span className="pill-badge">Instant PDF Access</span>
            </div>

            <h3 style={{ fontSize: '1.65rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '0.6rem', lineHeight: '1.2' }}>
              Secret 25 Asian Hidden Gems + Free Preset
            </h3>

            <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: '1.55', marginBottom: '1.5rem' }}>
              Unlock my personal GPS coordinates, secret coconut roads, low-tide rockpool locations, and our signature <strong>Matcha Glow Mobile Preset</strong> for free.
            </p>

            {/* Checklist */}
            <div style={{ background: 'var(--bg-primary)', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-heading)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--green-primary)" />
                  <span>48-Page High-Res Destination Guide (PDF)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--green-primary)" />
                  <span>1-Click Matcha Glow Mobile Preset (.DNG file)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--green-primary)" />
                  <span>Exact Google Maps Pin Drop Locations</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                  Your First Name
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g., Alex"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#FFFFFF',
                    border: '1.5px solid var(--border-light)',
                    borderRadius: '10px',
                    color: 'var(--text-heading)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <input 
                  type="email"
                  required
                  placeholder="alex@traveler.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#FFFFFF',
                    border: '1.5px solid var(--border-light)',
                    borderRadius: '10px',
                    color: 'var(--text-heading)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button 
                type="submit"
                className="btn-wiz btn-wiz-primary"
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}
              >
                <Download size={18} />
                <span>Send Me The Free Guide & Preset</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} color="var(--green-primary)" />
                <span>Zero spam. Unsubscribe anytime with 1 click.</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
