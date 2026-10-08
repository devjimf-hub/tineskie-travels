import React, { useState } from 'react';
import { 
  Plane, 
  ShieldCheck, 
  Map, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  X,
  Compass,
  MapPin,
  Globe2
} from 'lucide-react';

export default function WizTravelGuides({ onOpenFreeGuide }) {
  const [selectedGuide, setSelectedGuide] = useState(null);

  const guides = [
    {
      id: "airport",
      title: "Airport Departure Guide (For First-Time Travelers)",
      tag: "Airport Tips",
      icon: <Plane size={24} color="var(--green-primary)" />,
      description: "A step-by-step walkthrough of what actually happens at the airport from check-in to boarding.",
      content: [
        "1. Arrive 3-4 hours before international flights (NAIA / Clark / Mactan).",
        "2. Prepare passport, printed e-ticket, and travel tax receipt (₱1,620).",
        "3. Complete eTravel QR registration online within 72 hours before departure.",
        "4. Proceed to airline check-in counter for baggage drop & boarding pass.",
        "5. Go through final immigration interview with clean return flight proof."
      ]
    },
    {
      id: "immigration",
      title: "Immigration Tips (For First-Time Travelers)",
      tag: "Immigration",
      icon: <ShieldCheck size={24} color="var(--green-primary)" />,
      description: "Feel confident facing immigration with clear, practical advice. This guide covers common questions officers ask and how to answer smoothly.",
      content: [
        "1. Direct, calm answers: state exact length of stay and accommodation name.",
        "2. Keep documents organized: Company ID, approved Leave of Absence, hotel booking.",
        "3. Never volunteer extra unneeded stories; answer only what is asked.",
        "4. Dress comfortably and professionally (smart casual)."
      ]
    },
    {
      id: "cherryblossom",
      title: "Seoul South Korea Cherry Blossom Google Map",
      tag: "Curated Map",
      icon: <MapPin size={24} color="var(--green-primary)" />,
      description: "A curated Google Map featuring the best cherry blossom viewing spots in Seoul, quiet cafes, and photo spots.",
      content: [
        "1. Yeouido Spring Flower Festival & Yunjung-ro path.",
        "2. Seokchon Lake Cherry Blossom Walk behind Lotte World.",
        "3. Seoul Forest deer park & hidden picnic benches.",
        "4. Kyung Hee University gothic architecture with pink cherry blooms."
      ]
    },
    {
      id: "koreavisa",
      title: "South Korea Visa Application Guide 2026",
      tag: "Visa Guide",
      icon: <FileText size={24} color="var(--green-primary)" />,
      description: "A complete, updated guide to applying for a South Korea visa. Includes requirements, document preparation, application steps, timelines, and insider tips.",
      content: [
        "1. KVAC (Korea Visa Application Center) appointment booking process.",
        "2. Simplified requirements for BDO / BPI Gold & Platinum cardholders.",
        "3. Complete bank certificate, ITR (Form 2316), and certificate of employment checklist.",
        "4. Processing timeline: 5 to 7 working days."
      ]
    },
    {
      id: "schengen",
      title: "Schengen Tourist Visa Application Guide 2026",
      tag: "Europe Visa",
      icon: <Globe2 size={24} color="var(--green-primary)" />,
      description: "A complete step-by-step walkthrough for first-time applicants applying for a European tourist visa without stress.",
      content: [
        "1. Determine main country of entry / longest stay (VFS Global or TLScontact).",
        "2. Flight reservation itineraries (do not buy non-refundable tickets prior).",
        "3. Proof of accommodation (Agoda free-cancellation bookings).",
        "4. Mandatory €30,000 Schengen-compliant travel medical insurance."
      ]
    }
  ];

  return (
    <section id="guides" className="section-spacing" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Travel Guides
          </div>
          <h2 className="section-title-wiz">
            Plan smarter, travel with confidence
          </h2>
          <p className="section-desc-wiz">
            Step-by-step guides designed to help you navigate every part of your trip—from airport processes to destination essentials—so you can avoid mistakes and travel stress-free.
          </p>
        </div>

        {/* Guides Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {guides.map((guide) => (
            <div 
              key={guide.id}
              className="wiz-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Top Badge & Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div 
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--green-subtle)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {guide.icon}
                  </div>
                  <span className="pill-badge">{guide.tag}</span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.65rem', lineHeight: '1.35' }}>
                  {guide.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {guide.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedGuide(guide)}
                className="btn-wiz btn-wiz-outline btn-wiz-sm"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Read Full Step-by-Step</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div className="modal-overlay" onClick={() => setSelectedGuide(null)}>
          <div 
            className="modal-content-wiz" 
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div 
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--green-subtle)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {selectedGuide.icon}
                </div>
                <div>
                  <span className="pill-badge" style={{ marginBottom: '0.25rem' }}>{selectedGuide.tag}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                    {selectedGuide.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedGuide(null)}
                style={{
                  background: 'var(--bg-primary)',
                  border: 'none',
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
            </div>

            <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {selectedGuide.description}
            </p>

            <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '1.75rem' }}>
              <div style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--green-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" />
                <span>Essential Checklist & Steps:</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {selectedGuide.content.map((step, idx) => (
                  <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-heading)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: '800', minWidth: '16px' }}>•</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                onClick={() => setSelectedGuide(null)}
                className="btn-wiz btn-wiz-primary"
                style={{ width: '100%' }}
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
