import React, { useState } from 'react';
import { 
  Tag, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Percent, 
  Gift
} from 'lucide-react';
import { promoCodesData } from '../data/travelData';
import confetti from 'canvas-confetti';

export default function PromoCodesSection() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#2E5A44', '#FF8F70', '#F9C74F', '#34D399']
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="promos" className="section-padding" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header-cute">
          <div className="section-subtitle-pill">
            <span>🏷️ Exclusive Travel Bestie Deals</span>
          </div>
          <h2 className="section-title-cute">
            Hotel & Tour <span className="font-serif-italic" style={{ color: 'var(--green-matcha)' }}>Promo Codes</span>
          </h2>
          <p className="section-desc-cute">
            Use these verified discount codes at checkout to save money on your hotels, tours, SIM cards, and travel insurance!
          </p>
        </div>

        {/* Promo Code Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {promoCodesData.map((promo) => {
            const isCopied = copiedId === promo.id;
            return (
              <div 
                key={promo.id}
                className="coupon-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-cute)'
                }}
              >
                <div>
                  {/* Top Bar with Emoji & Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{promo.logoEmoji}</span>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{promo.partner}</strong>
                    </div>
                    <span className="cute-stamp">{promo.badge}</span>
                  </div>

                  {/* Discount Offer */}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: '1.3' }}>
                    {promo.discount}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Category: <strong>{promo.category}</strong>
                  </div>
                </div>

                {/* Bottom Copy Box */}
                <div>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'var(--color-bg)',
                      border: '1.5px solid var(--color-card-border)',
                      borderRadius: '12px',
                      padding: '0.5rem 0.75rem',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
                        Promo Code
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: '900', color: 'var(--green-matcha-dark)', letterSpacing: '0.04em' }}>
                        {promo.code}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyCode(promo.id, promo.code)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        background: isCopied ? '#10B981' : 'var(--green-matcha)',
                        color: '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{isCopied ? 'Copied! ✨' : 'Copy'}</span>
                    </button>
                  </div>

                  <a
                    href={promo.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      color: 'var(--green-matcha)',
                      fontWeight: '700',
                      textDecoration: 'none',
                      padding: '0.35rem'
                    }}
                  >
                    <span>Redeem on {promo.partner.split(' ')[0]}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Community Perk Banner */}
        <div 
          style={{
            marginTop: '3rem',
            padding: '1.5rem 2rem',
            background: 'var(--color-card)',
            border: '1.5px solid var(--color-card-border)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: 'var(--shadow-cute)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '2rem' }}>🎉</span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                Have a favorite hotel or airline you want a code for?
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                DM <strong style={{ color: 'var(--green-matcha)' }}>@tineskietravel</strong> on Instagram and I will reach out to their team!
              </div>
            </div>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn-cute btn-cute-outline btn-cute-sm"
          >
            <span>DM on Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
}
