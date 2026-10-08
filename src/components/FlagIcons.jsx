import React from 'react';

export function FlagIcon({ country, size = 20, className = '', style = {} }) {
  const norm = (country || '').toLowerCase().trim();

  const baseStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
    flexShrink: 0,
    ...style
  };

  const width = typeof size === 'number' ? Math.round(size * 1.33) : size;
  const height = size;

  if (norm.includes('philippine') || norm === 'ph') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="200" fill="#0038A8" />
        <rect y="200" width="600" height="200" fill="#CE1126" />
        <polygon points="0,0 260,200 0,400" fill="#FFFFFF" />
        <circle cx="85" cy="200" r="30" fill="#FCD116" />
        <polygon points="40,90 44,105 30,98 46,98 32,105" fill="#FCD116" />
        <polygon points="40,310 44,295 30,302 46,302 32,295" fill="#FCD116" />
        <polygon points="190,200 178,193 178,207" fill="#FCD116" />
      </svg>
    );
  }

  if (norm.includes('japan') || norm === 'jp') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="400" fill="#FFFFFF" />
        <circle cx="300" cy="200" r="120" fill="#BC002D" />
      </svg>
    );
  }

  if (norm.includes('korea') || norm === 'kr') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="400" fill="#FFFFFF" />
        <circle cx="300" cy="200" r="90" fill="#CD2E3A" />
        <path d="M 210,200 A 45,45 0 0,1 300,200 A 45,45 0 0,0 390,200 A 90,90 0 0,1 210,200" fill="#0047A0" />
        <g stroke="#132E22" strokeWidth="8">
          <line x1="160" y1="100" x2="190" y2="130" />
          <line x1="170" y1="90" x2="200" y2="120" />
          <line x1="410" y1="280" x2="440" y2="310" />
          <line x1="400" y1="270" x2="430" y2="300" />
        </g>
      </svg>
    );
  }

  if (norm.includes('taiwan') || norm === 'tw') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="400" fill="#FE0000" />
        <rect width="300" height="200" fill="#000095" />
        <circle cx="150" cy="100" r="45" fill="#FFFFFF" />
        <circle cx="150" cy="100" r="32" fill="#000095" />
        <circle cx="150" cy="100" r="24" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('vietnam') || norm === 'vn') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="400" fill="#DA251D" />
        <polygon points="300,100 330,195 425,195 350,250 380,345 300,290 220,345 250,250 175,195 270,195" fill="#FFFF00" />
      </svg>
    );
  }

  if (norm.includes('malaysia') || norm === 'my') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="400" fill="#CC0000" />
        {[...Array(7)].map((_, i) => (
          <rect key={i} y={i * 57.1} width="600" height="28.5" fill="#FFFFFF" />
        ))}
        <rect width="300" height="228" fill="#000066" />
        <circle cx="150" cy="114" r="60" fill="#FFCC00" />
        <circle cx="170" cy="114" r="50" fill="#000066" />
        <polygon points="210,114 220,95 235,110 240,88 250,114 265,100 255,120 275,125 255,135 265,150 245,140 235,160 225,140 205,145 215,130" fill="#FFCC00" />
      </svg>
    );
  }

  if (norm.includes('hong kong') || norm === 'hk') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="400" fill="#ED1C24" />
        <circle cx="300" cy="200" r="65" fill="#FFFFFF" opacity="0.9" />
        <circle cx="300" cy="200" r="35" fill="#ED1C24" />
      </svg>
    );
  }

  if (norm.includes('macao') || norm.includes('macau') || norm === 'mo') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="400" fill="#00785E" />
        <circle cx="300" cy="200" r="55" fill="#FFCC00" />
        <circle cx="300" cy="200" r="45" fill="#00785E" />
        <polygon points="300,165 310,185 330,190 315,205 320,225 300,215 280,225 285,205 270,190 290,185" fill="#FFCC00" />
      </svg>
    );
  }

  if (norm.includes('mongolia') || norm === 'mn') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="200" height="400" fill="#E4002B" />
        <rect x="200" width="200" height="400" fill="#0066B2" />
        <rect x="400" width="200" height="400" fill="#E4002B" />
        <circle cx="100" cy="140" r="28" fill="#FFD100" />
        <circle cx="100" cy="180" r="20" fill="#FFD100" />
      </svg>
    );
  }

  if (norm.includes('indonesia') || norm.includes('bali') || norm === 'id') {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="200" fill="#FF0000" />
        <rect y="200" width="600" height="200" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('europe') || norm.includes('schengen') || norm.includes('eu')) {
    return (
      <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
        <rect width="600" height="400" fill="#003399" />
        <circle cx="300" cy="200" r="100" fill="none" stroke="#FFCC00" strokeWidth="6" strokeDasharray="10 42" />
      </svg>
    );
  }

  // Fallback
  return (
    <svg width={width} height={height} viewBox="0 0 600 400" className={className} style={baseStyle}>
      <rect width="600" height="400" fill="#2D6A4F" />
      <circle cx="300" cy="200" r="70" fill="#D8F3DC" />
    </svg>
  );
}

export default FlagIcon;
