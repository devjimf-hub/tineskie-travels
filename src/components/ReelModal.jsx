import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  Eye, 
  Sparkles, 
  MessageCircle, 
  Bookmark, 
  Music,
  CheckCircle2,
  Play,
  Pause
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReelModal({ reel, onClose }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel ? reel.likes : '100K');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  if (!reel) return null;

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#ef4444', '#f43f5e', '#34d399']
      });
    } else {
      setIsLiked(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '780px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          overflow: 'hidden',
          padding: 0
        }}
      >
        {/* Left: Video Player Simulation */}
        <div 
          style={{
            position: 'relative',
            background: '#000000',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <img 
            src={reel.thumbnail} 
            alt={reel.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.85)'
            }}
          />

          {/* Video Controls Overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.25rem'
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge-green">{reel.category}</span>
              <span style={{ fontSize: '0.8rem', color: '#ffffff', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                {reel.duration}
              </span>
            </div>

            {/* Play/Pause Button Overlay in Center */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.85)',
                border: '2px solid rgba(255,255,255,0.4)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)'
              }}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
            </button>

            {/* Bottom Floating Music & Views */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontSize: '0.82rem' }}>
              <Music size={14} color="#34d399" />
              <span>Original Cinematic Sound — Tineskie Audio</span>
            </div>
          </div>
        </div>

        {/* Right: Creator Details, Caption & Interactivity */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Creator Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
                    border: '2px solid #34d399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '0.9rem'
                  }}
                >
                  TT
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>tineskietravel</span>
                    <CheckCircle2 size={15} color="#34d399" fill="#071711" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Travel Filmmaker</div>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Reel Title */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.75rem', lineHeight: '1.3' }}>
              {reel.title}
            </h3>

            {/* Caption */}
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
              {reel.caption}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {reel.tags.map((tag, i) => (
                <span key={i} style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: '600' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Reel Engagement Metrics */}
            <div 
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                padding: '0.85rem',
                background: 'rgba(14, 45, 34, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(52, 211, 153, 0.15)',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                <Eye size={16} color="#34d399" />
                <span>{reel.views} Views</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                <Heart size={16} color="#ef4444" />
                <span>{likesCount} Likes</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(52, 211, 153, 0.15)' }}>
            <button
              onClick={handleLike}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1rem',
                borderRadius: '9999px',
                background: isLiked ? 'rgba(239, 68, 68, 0.2)' : 'rgba(14, 45, 34, 0.7)',
                border: isLiked ? '1px solid #ef4444' : '1px solid rgba(52, 211, 153, 0.25)',
                color: isLiked ? '#f87171' : 'var(--text-primary)',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : 'currentColor'} />
              <span>{isLiked ? 'Liked!' : 'Like Reel'}</span>
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.65rem',
                borderRadius: '50%',
                background: isSaved ? 'rgba(16, 185, 129, 0.3)' : 'rgba(14, 45, 34, 0.7)',
                border: isSaved ? '1px solid #34d399' : '1px solid rgba(52, 211, 153, 0.25)',
                color: isSaved ? '#34d399' : 'var(--text-primary)',
                cursor: 'pointer'
              }}
              title="Save to bucket list"
            >
              <Bookmark size={18} fill={isSaved ? '#34d399' : 'none'} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
