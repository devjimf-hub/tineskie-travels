import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Globe2, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Award,
  BarChart3,
  Mail
} from 'lucide-react';
import { brandCollabsData, mediaKitStats } from '../data/travelData';
import confetti from 'canvas-confetti';

export default function MediaKitSection() {
  const [formData, setFormData] = useState({
    brandName: '',
    contactEmail: '',
    campaignType: 'Tourism Board Campaign',
    budgetRange: '₱150,000 - ₱300,000',
    timeline: 'Within 1-3 Months',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.brandName || !formData.contactEmail) {
      alert('Please enter your brand name and email address.');
      return;
    }

    setIsSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#f4d06f']
    });
  };

  return (
    <section id="mediakit" className="section-padding" style={{ background: 'linear-gradient(180deg, var(--green-deep-forest) 0%, #082117 50%, var(--green-deep-forest) 100%)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Briefcase size={16} />
            <span>Brand Partnerships & Media Kit</span>
          </div>
          <h2 className="section-title">
            Collaborate with <span className="text-gradient-green font-serif" style={{ fontStyle: 'italic' }}>Tineskie Travel</span>
          </h2>
          <p className="section-description">
            Connecting premium eco-resorts, tourism authorities, and adventure brands with an engaged, high-spending audience of modern explorers.
          </p>
        </div>

        {/* Brand Logos Carousel Bar */}
        <div 
          style={{
            marginBottom: '4rem',
            padding: '1.75rem 1rem',
            background: 'rgba(14, 45, 34, 0.5)',
            borderRadius: '20px',
            border: '1px solid rgba(52, 211, 153, 0.2)',
            overflow: 'hidden'
          }}
        >
          <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--emerald-300)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '1.25rem' }}>
            Trusted by World-Class Tourism Boards & Outdoor Giants
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1.25rem',
              alignItems: 'center'
            }}
          >
            {brandCollabsData.map((brand, i) => (
              <div 
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '0.85rem',
                  background: 'rgba(7, 23, 17, 0.6)',
                  borderRadius: '12px',
                  border: '1px solid rgba(52, 211, 153, 0.12)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '900', letterSpacing: '0.08em', color: '#ffffff', fontSize: '0.95rem' }}>
                  {brand.logoText}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#a7f3d0', marginTop: '0.2rem' }}>
                  {brand.campaign}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Kit Key Metrics (4 Grid) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem'
          }}
        >
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <Users size={28} color="#34d399" style={{ margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff' }}>485,000+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Audience Reach</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <TrendingUp size={28} color="#f4d06f" style={{ margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#f4d06f' }}>12.4%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average Engagement Rate (3x Industry avg)</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <Globe2 size={28} color="#a7f3d0" style={{ margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#a7f3d0' }}>8.5M+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Monthly Content Impressions</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <BarChart3 size={28} color="#34d399" style={{ margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#34d399' }}>78%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ages 18-34 Core Demographics</div>
          </div>
        </div>

        {/* 2-Column: Demographics Breakdown & Collab Inquiry Form */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Audience Demographics & Services */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} color="#34d399" />
              <span>Audience Demographics & Geo Distribution</span>
            </h3>

            {/* Age Distribution Bars */}
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--emerald-300)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Age Breakdown:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {mediaKitStats.demographics.age.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>
                      <span>{item.range} Years Old</span>
                      <span style={{ fontWeight: '700', color: '#34d399' }}>{item.pct}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(7, 23, 17, 0.7)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.pct}%`, background: 'linear-gradient(90deg, #059669, #34d399)', borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries */}
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--emerald-300)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Top Audience Locations:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {mediaKitStats.demographics.countries.map((c, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      padding: '0.45rem 0.85rem',
                      background: 'rgba(7, 23, 17, 0.7)',
                      borderRadius: '8px',
                      border: '1px solid rgba(52, 211, 153, 0.15)',
                      fontSize: '0.82rem',
                      display: 'flex',
                      gap: '0.4rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span>{c.country}:</span>
                    <strong style={{ color: '#a7f3d0' }}>{c.pct}%</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Services */}
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--warm-gold)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Campaign Deliverables Offered:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {mediaKitStats.services.map((srv, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#ffffff' }}>{srv.title}:</strong> {srv.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Collaboration Booking Form */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.5rem' }}>
              Initiate a Campaign Inquiry
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Direct message to Tineskie’s management team. Response within 24-48 business hours.
            </p>

            {isSubmitted ? (
              <div 
                style={{
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #34d399',
                  borderRadius: '16px'
                }}
              >
                <CheckCircle2 size={48} color="#34d399" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.5rem' }}>
                  Inquiry Dispatched!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Thank you for reaching out, <strong>{formData.brandName}</strong>. We have received your campaign parameters and our media deck has been sent to <strong>{formData.contactEmail}</strong>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-outline-green btn-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#a7f3d0', marginBottom: '0.35rem' }}>
                    Brand / Tourism Board Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g., Swiss Tourism / Eco-Resort Bali"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(7, 23, 17, 0.7)',
                      border: '1px solid rgba(52, 211, 153, 0.25)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#a7f3d0', marginBottom: '0.35rem' }}>
                    Direct Contact Email *
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="collabs@brand.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(7, 23, 17, 0.7)',
                      border: '1px solid rgba(52, 211, 153, 0.25)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#a7f3d0', marginBottom: '0.35rem' }}>
                      Campaign Scope
                    </label>
                    <select
                      value={formData.campaignType}
                      onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#071711',
                        border: '1px solid rgba(52, 211, 153, 0.25)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    >
                      <option value="Tourism Board Campaign">Tourism Board Campaign</option>
                      <option value="Sponsored Reel & Vlog">Sponsored Reel & Vlog</option>
                      <option value="Product Ambassadorship">Product Ambassadorship</option>
                      <option value="Commercial Photo Licensing">Commercial Photo Licensing</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#a7f3d0', marginBottom: '0.35rem' }}>
                      Budget Tier
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#071711',
                        border: '1px solid rgba(52, 211, 153, 0.25)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    >
                      <option value="₱50,000 - ₱150,000">₱50,000 - ₱150,000</option>
                      <option value="₱150,000 - ₱300,000">₱150,000 - ₱300,000</option>
                      <option value="₱300,000 - ₱750,000">₱300,000 - ₱750,000</option>
                      <option value="₱750,000+">₱750,000+ (Global / Multi-City)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#a7f3d0', marginBottom: '0.35rem' }}>
                    Brief Project Details & Objectives
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Tell us about your brand goals, preferred filming location, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(7, 23, 17, 0.7)',
                      border: '1px solid rgba(52, 211, 153, 0.25)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <Send size={18} />
                  <span>Submit Partnership Proposal</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
