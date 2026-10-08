import React, { useState } from 'react';
import { Sparkles, ExternalLink, Award, Building2, Ticket, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WizAffiliate() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2D6A4F', '#52B788', '#D8F3DC']
    });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="affiliate" className="section-spacing">
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Earn While You Create
          </div>
          <h2 className="section-title-wiz">
            Turn your content into income streams
          </h2>
          <p className="section-desc-wiz">
            Turn your content into income streams with these affiliate programs. Join creator ambassador networks and earn commissions while sharing authentic travel guides.
          </p>
        </div>

        {/* 2 Affiliate Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {/* Card 1: Agoda Ambassador */}
          <div 
            className="wiz-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1.5px solid var(--border-light)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--green-subtle)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Building2 size={24} color="var(--green-primary)" />
                </div>
                <span className="pill-badge">Agoda Partner</span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.65rem' }}>
                Agoda Ambassador
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Earn up to 8% commission on hotel bookings made through your creator links. Includes access to dedicated creator discounts and monthly bonuses.
              </p>

              <div 
                style={{
                  background: 'var(--bg-primary)',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.84rem',
                  color: 'var(--text-heading)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <span>Referral Code: <strong style={{ color: 'var(--green-primary)', fontFamily: 'monospace', fontSize: '0.95rem' }}>TINESKIE</strong></span>
                <button
                  onClick={() => handleCopy('agoda', 'TINESKIE')}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'var(--green-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  {copiedCode === 'agoda' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                  <span>{copiedCode === 'agoda' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <a
              href="https://www.agoda.com"
              target="_blank"
              rel="noreferrer"
              className="btn-wiz btn-wiz-primary"
              style={{ width: '100%' }}
            >
              <span>Apply Now</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Card 2: GetYourGuide & Klook Creator */}
          <div 
            className="wiz-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1.5px solid var(--border-light)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--green-subtle)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Ticket size={24} color="var(--green-primary)" />
                </div>
                <span className="pill-badge">Tours & Activities</span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.65rem' }}>
                Klook & GetYourGuide Creator
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Promote activities, sim cards, rail passes, and island hopping experiences worldwide. Earn generous affiliate payouts and creative sponsorships.
              </p>

              <div 
                style={{
                  background: 'var(--bg-primary)',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.84rem',
                  color: 'var(--text-heading)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <span>Referral Code: <strong style={{ color: 'var(--green-primary)', fontFamily: 'monospace', fontSize: '0.95rem' }}>TINESKIEKLOOK</strong></span>
                <button
                  onClick={() => handleCopy('klook', 'TINESKIEKLOOK')}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'var(--green-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  {copiedCode === 'klook' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                  <span>{copiedCode === 'klook' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <a
              href="https://www.klook.com"
              target="_blank"
              rel="noreferrer"
              className="btn-wiz btn-wiz-primary"
              style={{ width: '100%' }}
            >
              <span>Apply Now</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
