import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  MapPin, 
  Camera,
  Film
} from 'lucide-react';

export default function ShowreelModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState('Siargao Lagoons');

  if (!isOpen) return null;

  const chapters = [
    { title: "Siargao Lagoons", location: "Philippines", time: "0:00" },
    { title: "Lofoten Fjords", location: "Norway", time: "0:45" },
    { title: "Seceda Spire Sunrise", location: "Dolomites, Italy", time: "1:20" },
    { title: "Kyoto Moss Groves", location: "Japan", time: "1:55" }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '920px',
          background: '#071711',
          border: '1px solid rgba(52, 211, 153, 0.4)',
          overflow: 'hidden',
          padding: 0
        }}
      >
        {/* Video Player Container */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000000', overflow: 'hidden' }}>
          
          <img 
            src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=85" 
            alt="4K Travel Showreel"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
          />

          {/* Vignette Overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)'
            }}
          />

          {/* Top Control Bar */}
          <div 
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.5rem',
              right: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge-green">4K Ultra HD</span>
              <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '700' }}>
                Tineskie Travel — Official 2026 Reel
              </span>
            </div>

            <button 
              onClick={onClose}
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Big Center Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: '3px solid rgba(255,255,255,0.6)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 35px rgba(16, 185, 129, 0.8)',
              zIndex: 10
            }}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
          </button>

          {/* Bottom Video Progress Bar */}
          <div 
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1.5rem',
              right: '1.5rem',
              zIndex: 10
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#ffffff', marginBottom: '0.4rem' }}>
              <span>01:14 / 02:45</span>
              <span>Filmed on Sony A7IV + DJI Mini 4 Pro</span>
            </div>
            <div style={{ height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #10b981, #00f5a0)', borderRadius: '3px' }} />
            </div>
          </div>

        </div>

        {/* Chapters & Locations Footer */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--emerald-300)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            Featured Expedition Chapters:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(ch.title)}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  background: activeChapter === ch.title ? 'rgba(16, 185, 129, 0.25)' : 'rgba(14, 45, 34, 0.5)',
                  border: activeChapter === ch.title ? '1px solid #34d399' : '1px solid rgba(52, 211, 153, 0.15)',
                  color: activeChapter === ch.title ? '#ffffff' : 'var(--text-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: '700' }}>{ch.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ch.location}</div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: '600' }}>{ch.time}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
