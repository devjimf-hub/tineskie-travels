import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Camera, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Luggage,
  Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveItineraryPlanner({ onOpenFreeGuide }) {
  const [vibe, setVibe] = useState('tropical');
  const [duration, setDuration] = useState('7');
  const [budget, setBudget] = useState('mid');
  const [traveler, setTraveler] = useState('solo');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Plan generation database
  const plans = {
    tropical: {
      title: "Untouched Emerald Island & Coral Trail",
      location: "Siargao & Dinagat Islands, Philippines",
      image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
      estimatedCost: budget === 'budget' ? "₱2,200 / day" : budget === 'mid' ? "₱4,800 / day" : "₱12,500 / day",
      route: [
        "Day 1-2: Coconut palm road cruise, Maasin River rope swing & Cloud 9 sunset",
        "Day 3-4: Secret Sugba Lagoon paddleboarding, cliff jumps & Pacifico secluded beaches",
        "Day 5-6: Uninhabited sandbars of Guyam & Corregidor freediving",
        "Day 7+: Hidden rock pools at Magpupungko low tide & underground cave swimming"
      ],
      gearTip: "Bring waterproof dry bags (20L), GoPro Hero 13 with floaty grip, and CPL filter for crystal lagoon clarity.",
      vibePill: "Tropical & Marine"
    },
    alpine: {
      title: "Arctic Fjords & Aurora Peak Expedition",
      location: "Lofoten Islands & Senja, Norway",
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
      estimatedCost: budget === 'budget' ? "₱5,500 / day" : budget === 'mid' ? "₱10,800 / day" : "₱25,500 / day",
      route: [
        "Day 1-2: Reinebringen ridge hike & traditional rorbu cabin stay in Hamnøy",
        "Day 3-4: Midnight sun kayak through Reinefjorden & Arctic surf at Unstad",
        "Day 5-6: Uttakleiv heart-stone photography & ocean cliff aurora watch",
        "Day 7+: Senja blade mountain ridge hikes & fjord viewpoint lookouts"
      ],
      gearTip: "Sony A7IV with 16-35mm f/2.8 GM, extra batteries (cold drains fast!), and wind-resistant carbon tripod.",
      vibePill: "Alpine & Arctic"
    },
    culture: {
      title: "Misty Moss Temples & Ancient Cedar Sanctuaries",
      location: "Kyoto & Kumano Kodo, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      estimatedCost: budget === 'budget' ? "₱3,200 / day" : budget === 'mid' ? "₱7,500 / day" : "₱21,000 / day",
      route: [
        "Day 1-2: 6:00 AM silent Arashiyama bamboo paths & Saiho-ji moss chanting",
        "Day 3-4: Uji tea plantation leaf picking & Gion lantern night photography",
        "Day 5-6: Kumano Kodo pilgrimage hike under centuries-old towering cedars",
        "Day 7+: Sacred onsen rejuvenation & traditional eco-ryokan Kaiseki dining"
      ],
      gearTip: "Quiet shutter mode, 35mm prime lens for low-light lantern alleyways, and slip-on trail hiking shoes.",
      vibePill: "Zen & Heritage"
    },
    dolomites: {
      title: "Jagged Spire Peaks & Glacial Emerald Waters",
      location: "South Tyrol & Dolomites, Italy",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      estimatedCost: budget === 'budget' ? "₱4,100 / day" : budget === 'mid' ? "₱9,200 / day" : "₱23,500 / day",
      route: [
        "Day 1-2: Seceda 2500m ridgeline sunrise & mountain cheese tasting",
        "Day 3-4: Wooden rowboat on Lago di Braies & Alpe di Siusi misty sunrise",
        "Day 5-6: Tre Cime di Lavaredo cliff loop & Cadini di Misurina dramatic spires",
        "Day 7+: High alpine rifugio overnight stargazing & Lago di Sorapis hike"
      ],
      gearTip: "70-200mm telephoto lens for mountain scale compression and sturdy trekking poles.",
      vibePill: "Mountain Wilderness"
    }
  };

  const currentPlan = plans[vibe] || plans.tropical;

  const handleGenerate = () => {
    setIsGenerated(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#34d399', '#10b981', '#f4d06f']
    });
  };

  const handleSave = () => {
    setIsSaved(true);
    confetti({
      particleCount: 40,
      spread: 40,
      colors: ['#00f5a0', '#34d399', '#ffffff']
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <section id="planner" className="section-padding" style={{ background: 'linear-gradient(180deg, var(--green-deep-forest) 0%, #0c261d 50%, var(--green-deep-forest) 100%)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Compass size={16} />
            <span>Interactive Travel Generator</span>
          </div>
          <h2 className="section-title">
            Build Your Custom <span className="text-gradient-green font-serif" style={{ fontStyle: 'italic' }}>Voyage Blueprint</span>
          </h2>
          <p className="section-description">
            Select your dream vibe, travel style, and budget to generate a customized travel route blueprint with estimated daily costs and photography spots.
          </p>
        </div>

        {/* Interactive Selection Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}
        >
          {/* Controls Column */}
          <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#34d399" />
              <span>1. Choose Your Expedition Parameters</span>
            </h3>

            {/* Parameter 1: Vibe */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--emerald-300)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Destination Vibe:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {[
                  { id: 'tropical', label: '🌴 Tropical Lagoons' },
                  { id: 'alpine', label: '❄️ Arctic Fjords & Aurora' },
                  { id: 'culture', label: '⛩️ Moss Temples & Cedar' },
                  { id: 'dolomites', label: '🏔️ Dolomite Alpine Spires' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setVibe(item.id); setIsGenerated(false); }}
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: '12px',
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      textAlign: 'left',
                      cursor: 'pointer',
                      border: vibe === item.id ? '1.5px solid #34d399' : '1px solid rgba(52, 211, 153, 0.15)',
                      background: vibe === item.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(7, 23, 17, 0.6)',
                      color: vibe === item.id ? '#ffffff' : 'var(--text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter 2: Duration */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--emerald-300)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Duration:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: '4', label: '3-5 Days' },
                  { id: '7', label: '7-10 Days' },
                  { id: '14', label: '14+ Days' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setDuration(item.id); setIsGenerated(false); }}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: duration === item.id ? '1.5px solid #34d399' : '1px solid rgba(52, 211, 153, 0.15)',
                      background: duration === item.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(7, 23, 17, 0.6)',
                      color: duration === item.id ? '#ffffff' : 'var(--text-secondary)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter 3: Budget */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--emerald-300)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Travel Budget:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'budget', label: '₱ Backpacker' },
                  { id: 'mid', label: '₱₱ Eco-Chic' },
                  { id: 'luxury', label: '₱₱₱ Boutique' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setBudget(item.id); setIsGenerated(false); }}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: budget === item.id ? '1.5px solid #f4d06f' : '1px solid rgba(52, 211, 153, 0.15)',
                      background: budget === item.id ? 'rgba(244, 208, 111, 0.18)' : 'rgba(7, 23, 17, 0.6)',
                      color: budget === item.id ? '#f4d06f' : 'var(--text-secondary)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter 4: Travel Mode */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--emerald-300)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Travel Party:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'solo', label: 'Solo Explorer' },
                  { id: 'couple', label: 'Couple / Duo' },
                  { id: 'crew', label: 'Creator Crew' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setTraveler(item.id); setIsGenerated(false); }}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: traveler === item.id ? '1.5px solid #34d399' : '1px solid rgba(52, 211, 153, 0.15)',
                      background: traveler === item.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(7, 23, 17, 0.6)',
                      color: traveler === item.id ? '#ffffff' : 'var(--text-secondary)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <Sparkles size={18} />
              <span>Generate Route Blueprint</span>
            </button>

          </div>

          {/* Generated Result Blueprint Column */}
          <div className="glass-panel" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="badge-green">{currentPlan.vibePill}</span>
              <span style={{ fontSize: '0.82rem', color: '#f4d06f', fontWeight: '700' }}>
                Est: {currentPlan.estimatedCost}
              </span>
            </div>

            {/* Result Image Banner */}
            <div style={{ position: 'relative', height: '180px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <img 
                src={currentPlan.image} 
                alt={currentPlan.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 30%, rgba(7, 23, 17, 0.9) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', right: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: '600', textTransform: 'uppercase' }}>
                  {currentPlan.location}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>
                  {currentPlan.title}
                </h4>
              </div>
            </div>

            {/* Generated Route Steps */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ fontSize: '0.9rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} /> Recommended Itinerary Route:
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {currentPlan.route.map((step, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      padding: '0.75rem 0.9rem',
                      background: 'rgba(7, 23, 17, 0.5)',
                      borderRadius: '10px',
                      border: '1px solid rgba(52, 211, 153, 0.12)',
                      fontSize: '0.86rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span style={{ color: '#34d399', fontWeight: '700', minWidth: '18px' }}>✦</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear & Photography Advice */}
            <div 
              style={{
                padding: '1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(52, 211, 153, 0.25)',
                borderRadius: '12px',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#a7f3d0', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Camera size={14} color="#34d399" />
                <span>Creator Gear Recommendation:</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {currentPlan.gearTip}
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleSave}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <Download size={16} />
                <span>{isSaved ? 'Blueprint Saved! ✓' : 'Save Itinerary Blueprint'}</span>
              </button>

              <button
                onClick={onOpenFreeGuide}
                className="btn btn-secondary"
                title="Get full secret guide PDF"
              >
                <Sparkles size={16} color="#f4d06f" />
                <span>Get PDF</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
