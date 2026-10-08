import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Calculator, 
  Calendar, 
  MapPin, 
  Tag,
  CheckCircle2,
  Gift,
  Check,
  Plane
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FlagIcon } from './FlagIcons';

export default function CuteBudgetPlanner({ onOpenFreeGuide }) {
  const [days, setDays] = useState(7);
  const [style, setStyle] = useState('budget'); // 'budget', 'mid', 'luxury'
  const [region, setRegion] = useState('ph'); // 'ph', 'japan', 'bali', 'europe'
  const [isSaved, setIsSaved] = useState(false);

  // Daily cost calculations per region & style in Philippine Peso (PHP)
  const costMap = {
    ph: { budget: 2200, mid: 4200, luxury: 9800, name: "Philippines (Siargao, Baguio & Batanes)", code: "PH", savingWithCodes: "3,500" },
    japan: { budget: 3800, mid: 6900, luxury: 17500, name: "Japan (Kyoto & Tokyo)", code: "JP", savingWithCodes: "6,200" },
    bali: { budget: 1950, mid: 3900, luxury: 10500, name: "Indonesia (Bali & Nusa)", code: "ID", savingWithCodes: "3,200" },
    europe: { budget: 4900, mid: 9200, luxury: 21500, name: "Europe (Alps & Nordics)", code: "EU", savingWithCodes: "7,800" },
  };

  const selectedData = costMap[region] || costMap.ph;
  const dailyCost = selectedData[style];
  const totalCost = dailyCost * days;
  const estSavings = selectedData.savingWithCodes;

  const handleSavePlan = () => {
    setIsSaved(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#2D6A4F', '#52B788', '#D8F3DC', '#E9C46A']
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <section id="planner" className="section-spacing" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wiz">
          <div className="section-label">
            Interactive Calculator
          </div>
          <h2 className="section-title-wiz">
            Trip cost & budget planner
          </h2>
          <p className="section-desc-wiz">
            Estimate your realistic daily and total trip expenses in Philippine Peso (₱), plus see how much you can save with our verified partner promo codes.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          {/* Controls Column */}
          <div className="wiz-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Plane size={18} color="var(--green-primary)" />
              <span>Customize Your Trip Parameters</span>
            </h3>

            {/* Parameter 1: Destination */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Where are you traveling?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {[
                  { id: 'ph', country: 'Philippines', label: 'Philippines' },
                  { id: 'japan', country: 'Japan', label: 'Japan' },
                  { id: 'bali', country: 'Indonesia', label: 'Bali & Nusa' },
                  { id: 'europe', country: 'Europe', label: 'Europe / Alps' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRegion(item.id)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      textAlign: 'left',
                      cursor: 'pointer',
                      border: region === item.id ? '1.5px solid var(--green-primary)' : '1px solid var(--border-light)',
                      background: region === item.id ? 'var(--green-subtle)' : '#FFFFFF',
                      color: region === item.id ? 'var(--green-primary)' : 'var(--text-heading)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FlagIcon country={item.country} size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter 2: Travel Style */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Travel Comfort Style:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'budget', label: '₱ Backpack', desc: 'Hostels & Local Eats' },
                  { id: 'mid', label: '₱₱ Eco-Chic', desc: 'Boutique Hotel & Cafes' },
                  { id: 'luxury', label: '₱₱₱ Luxury', desc: 'Private Villa & Tours' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStyle(item.id)}
                    style={{
                      padding: '0.65rem 0.4rem',
                      borderRadius: '12px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: style === item.id ? '1.5px solid var(--green-primary)' : '1px solid var(--border-light)',
                      background: style === item.id ? 'var(--green-subtle)' : '#FFFFFF',
                      color: style === item.id ? 'var(--green-primary)' : 'var(--text-body)'
                    }}
                  >
                    <div style={{ fontWeight: '800' }}>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter 3: Days Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Trip Length:
                </label>
                <span className="pill-badge" style={{ fontSize: '0.85rem' }}>
                  {days} Days
                </span>
              </div>
              <input 
                type="range"
                min={3}
                max={21}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--green-primary)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>3 Days</span>
                <span>7 Days</span>
                <span>14 Days</span>
                <span>21 Days</span>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div 
            className="wiz-card" 
            style={{ 
              padding: '2.25rem', 
              background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green-primary) 100%)',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-modal)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="pill-badge" style={{ background: '#FFFFFF', color: 'var(--green-dark)' }}>
                <span style={{ fontWeight: '900', color: 'var(--green-primary)', fontSize: '0.9rem' }}>₱</span>
                <span>Estimated Budget</span>
              </span>
              <span style={{ fontSize: '0.82rem', color: '#D8F3DC', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FlagIcon country={selectedData.name} size={14} />
                <span>{selectedData.name}</span>
              </span>
            </div>

            {/* Big Numbers */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#D8F3DC', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Estimated Trip Cost ({days} Days)
              </div>
              <div style={{ fontSize: '2.75rem', fontWeight: '900', color: '#FFFFFF', fontFamily: 'var(--font-heading)', lineHeight: '1.1' }}>
                ₱{totalCost.toLocaleString()} <span style={{ fontSize: '1.15rem', fontWeight: '600', color: '#D8F3DC' }}>PHP</span>
              </div>
              <div style={{ fontSize: '0.88rem', color: '#D8F3DC', marginTop: '0.25rem' }}>
                approx. <strong>₱{dailyCost.toLocaleString()} / day</strong> (stays, cafes, local transit)
              </div>
            </div>

            {/* Savings with Promo Codes Pill */}
            <div 
              style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '800', fontSize: '0.95rem', color: '#FCD116', marginBottom: '0.25rem' }}>
                <Tag size={16} />
                <span>Save ~₱{estSavings} with verified codes!</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#EAF7ED', lineHeight: '1.4' }}>
                Using our codes <strong>TINESKIEKLOOK</strong> (Klook) & <strong>TINESKIE</strong> (Agoda Hotels).
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={handleSavePlan}
                className="btn-wiz"
                style={{ flex: 1, background: '#FFFFFF', color: 'var(--green-dark)', fontWeight: '800' }}
              >
                {isSaved ? <Check size={14} color="#10B981" /> : <CheckCircle2 size={14} />}
                <span>{isSaved ? 'Estimate Saved!' : 'Save Trip Estimate'}</span>
              </button>

              <button
                onClick={onOpenFreeGuide}
                className="btn-wiz btn-wiz-outline"
                style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <span>Get Free PDF</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
