import React from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { cuteTravelTips } from '../data/travelData';

export default function CuteTipsSection({ onOpenFreeGuide }) {
  return (
    <section id="tips" className="section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="section-header-cute">
          <div className="section-subtitle-pill">
            <span>💡 Travel Bestie Secrets</span>
          </div>
          <h2 className="section-title-cute">
            Quick Hacks for <span className="font-serif-italic" style={{ color: 'var(--green-matcha)' }}>Cute & Stress-Free</span> Travel
          </h2>
          <p className="section-desc-cute">
            Tested across 44 countries so you never overpay for flights, lose luggage, or get stuck with ATM fees.
          </p>
        </div>

        {/* Tips Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {cuteTravelTips.map((tip, idx) => (
            <div 
              key={idx}
              className="cute-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '2.4rem', marginBottom: '0.85rem' }}>
                  {tip.icon}
                </div>
                
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                  {tip.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
                  {tip.summary}
                </p>
              </div>

              <div style={{ paddingTop: '1.25rem', marginTop: '1.25rem', borderTop: '1px solid var(--color-card-border)', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--green-matcha)', fontSize: '0.8rem', fontWeight: '700' }}>
                <CheckCircle2 size={15} />
                <span>Tried & Tested</span>
              </div>
            </div>
          ))}
        </div>

        {/* Free Cheatsheet Callout Banner */}
        <div 
          className="cute-card"
          style={{
            padding: '2rem',
            background: 'var(--green-pistachio)',
            border: '2px dashed var(--green-matcha)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div className="badge-peach" style={{ marginBottom: '0.4rem' }}>
              🎁 100% Free Travel Bestie Resource
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--green-matcha-dark)', marginBottom: '0.3rem' }}>
              Want the full 25 Secret Hidden Gems & GPS Map Pins?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              Download our 48-page illustrated PDF guide + free 1-click Matcha mobile preset directly to your email.
            </p>
          </div>

          <button
            onClick={onOpenFreeGuide}
            className="btn-cute btn-cute-peach"
          >
            <Sparkles size={16} />
            <span>Download Cheatsheet Free</span>
          </button>
        </div>

      </div>
    </section>
  );
}
