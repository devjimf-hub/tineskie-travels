import React, { useState } from 'react';
import { Tag, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { AgodaLogo, AgodaIconBadge, KlookLogo, KlookIconBadge } from './BrandLogos';
import { useTravelData } from '../context/DataContext';
import confetti from 'canvas-confetti';

export default function WizPromoCards() {
  const { promoCodes } = useTravelData();
  const [copiedCode, setCopiedCode] = useState(null);

  const getBrandElements = (item) => {
    const pLower = (item.partner || item.id || '').toLowerCase();
    if (pLower.includes('agoda')) {
      return {
        logo: <AgodaLogo width={110} height={34} />,
        iconBadge: <AgodaIconBadge size={46} />,
        actionText: item.actionText || 'Claim on Agoda'
      };
    }
    if (pLower.includes('klook')) {
      return {
        logo: <KlookLogo width={110} height={34} />,
        iconBadge: <KlookIconBadge size={46} />,
        actionText: item.actionText || 'Claim on Klook'
      };
    }
    return {
      logo: <span style={{ fontWeight: '900', fontSize: '1.2rem', color: 'var(--green-primary)' }}>{item.partner || item.category}</span>,
      iconBadge: (
        <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'var(--green-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
          <Tag size={20} color="var(--green-primary)" />
        </div>
      ),
      actionText: item.actionText || `Claim on ${item.partner || 'Website'}`
    };
  };

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#2D6A4F', '#52B788', '#FF5B00', '#E12D39', '#FFB700', '#1E88E5']
    });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="deals" style={{ paddingBottom: '3.5rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.4rem' }}>
              Verified Partner Codes
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
              Exclusive Bestie Deals & Discounts
            </h2>
          </div>
          <div 
            style={{ 
              fontSize: '0.85rem', 
              color: 'var(--green-primary)', 
              fontWeight: '700', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.45rem',
              background: '#FFFFFF',
              padding: '0.45rem 0.95rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Sparkles size={15} color="var(--green-primary)" />
            <span>Updated & Tested For 2026</span>
          </div>
        </div>

        {/* 2-Card Spacious Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {promoCodes.map((item) => {
            const isCopied = copiedCode === item.id;
            const brand = getBrandElements(item);
            return (
              <div 
                key={item.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '1.75rem',
                  border: '1.5px solid var(--border-light)',
                  boxShadow: '0 10px 30px -8px rgba(27, 67, 50, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="promo-card-hover"
              >
                <div>
                  {/* Top Bar: Official Logo & Verified Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {brand.iconBadge}
                      <div>
                        {brand.logo}
                      </div>
                    </div>

                    <span 
                      style={{ 
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        color: 'var(--green-primary)',
                        background: 'var(--green-subtle)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(45, 106, 79, 0.15)'
                      }}
                    >
                      {item.badge || 'Official Partner'}
                    </span>
                  </div>

                  {/* Big Discount Tagline */}
                  <div 
                    style={{
                      fontSize: '2.4rem',
                      fontWeight: '900',
                      color: 'var(--green-primary)',
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '-0.03em',
                      lineHeight: '1.05',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {item.discount}
                  </div>

                  {/* Category & Platform */}
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>
                    {item.category}
                  </div>

                  <div style={{ fontSize: '0.88rem', color: 'var(--green-medium)', fontWeight: '700', marginBottom: '0.65rem' }}>
                    {item.platform}
                  </div>

                  {/* Subtext */}
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    {item.subtext}
                  </div>
                </div>

                {/* Bottom Code Box & Claim Button */}
                <div>
                  {/* Copyable Code Box */}
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'var(--bg-primary)',
                      border: '1.5px dashed rgba(45, 106, 79, 0.25)',
                      borderRadius: '14px',
                      padding: '0.65rem 1rem',
                      marginBottom: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Tag size={15} color="var(--green-primary)" />
                      <span style={{ fontFamily: 'monospace', fontWeight: '900', fontSize: '1.05rem', color: 'var(--text-heading)', letterSpacing: '0.06em' }}>
                        {item.code}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(item.id, item.code)}
                      style={{
                        background: isCopied ? '#10B981' : '#FFFFFF',
                        color: isCopied ? '#FFFFFF' : 'var(--green-primary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        padding: '0.4rem 0.75rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontWeight: '800',
                        fontSize: '0.82rem',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        transition: 'all 0.2s ease'
                      }}
                      title="Click to copy promo code"
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  {/* Action Button */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-wiz btn-wiz-primary"
                    style={{ 
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.25rem',
                      fontSize: '0.95rem',
                      fontWeight: '800',
                      boxShadow: '0 4px 14px rgba(45, 106, 79, 0.2)'
                    }}
                  >
                    <span>{item.actionText}</span>
                    <ExternalLink size={15} />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .promo-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -6px rgba(27, 67, 50, 0.14) !important;
          border-color: rgba(45, 106, 79, 0.3) !important;
        }
      `}</style>
    </section>
  );
}
