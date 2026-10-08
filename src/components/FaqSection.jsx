import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Compass
} from 'lucide-react';
import { creatorFaqs } from '../data/travelData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="section-spacing">
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Frequently Asked Questions
          </div>
          <h2 className="section-title-wiz">
            Creator insights & travel tips
          </h2>
          <p className="section-desc-wiz">
            Everything you need to know about our discount promo codes, presets, itinerary planning, and solo safety.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {creatorFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="wiz-card"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: isOpen ? '1.5px solid var(--green-primary)' : '1px solid var(--border-light)',
                  transition: 'all 0.25s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-heading)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: '900' }}>Q:</span>
                    <span>{faq.q}</span>
                  </span>
                  <div 
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? 'var(--green-subtle)' : 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? 'var(--green-primary)' : 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  >
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div 
                    style={{
                      padding: '0 1.5rem 1.35rem 1.5rem',
                      color: 'var(--text-body)',
                      fontSize: '0.92rem',
                      lineHeight: '1.65',
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '1rem'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
