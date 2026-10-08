import React from 'react';

/**
 * Official Agoda Logo with authentic 5-color dots and wordmark
 */
export function AgodaLogo({ width = 96, height = 30, className = "" }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 160 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* 5 Iconic Colored Dots */}
      <circle cx="28" cy="12" r="7" fill="#E12D39" />
      <circle cx="48" cy="12" r="7" fill="#FFB700" />
      <circle cx="68" cy="12" r="7" fill="#43A047" />
      <circle cx="88" cy="12" r="7" fill="#1E88E5" />
      <circle cx="108" cy="12" r="7" fill="#8E24AA" />

      {/* Agoda Wordmark */}
      <text 
        x="68" 
        y="42" 
        textAnchor="middle" 
        fontFamily="system-ui, -apple-system, 'SF Pro Display', 'DM Sans', sans-serif" 
        fontWeight="900" 
        fontSize="24" 
        letterSpacing="-0.04em" 
        fill="#132E22"
      >
        agoda
      </text>
    </svg>
  );
}

/**
 * Official Agoda Icon Badge (5-dots in clean circle badge)
 */
export function AgodaIconBadge({ size = 44 }) {
  return (
    <div 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '12px',
        background: '#FFFFFF',
        border: '1px solid rgba(45, 106, 79, 0.12)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px'
      }}
    >
      <svg width={size * 0.75} height={size * 0.75} viewBox="0 0 40 40" fill="none">
        <circle cx="10" cy="14" r="4.5" fill="#E12D39" />
        <circle cx="20" cy="10" r="4.5" fill="#FFB700" />
        <circle cx="30" cy="14" r="4.5" fill="#43A047" />
        <circle cx="14" cy="24" r="4.5" fill="#1E88E5" />
        <circle cx="26" cy="24" r="4.5" fill="#8E24AA" />
      </svg>
    </div>
  );
}

/**
 * Official Klook Logo with vibrant orange badge & wordmark
 */
export function KlookLogo({ width = 100, height = 30, className = "" }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 150 46" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Klook Vibrant Orange Pin / Splash Symbol */}
      <g transform="translate(4, 3)">
        <rect width="38" height="38" rx="10" fill="#FF5B00" />
        {/* Smile / Wink Asterisk */}
        <path d="M19 10C19 14.5 15 19 10 19C15 19 19 23.5 19 28C19 23.5 23 19 28 19C23 19 19 14.5 19 10Z" fill="#FFFFFF" />
        <circle cx="27" cy="11" r="3" fill="#FFD100" />
      </g>
      
      {/* Klook Wordmark */}
      <text 
        x="50" 
        y="30" 
        fontFamily="system-ui, -apple-system, 'SF Pro Display', 'DM Sans', sans-serif" 
        fontWeight="900" 
        fontSize="24" 
        letterSpacing="-0.03em" 
        fill="#FF5B00"
      >
        klook
      </text>
    </svg>
  );
}

/**
 * Official Klook Icon Badge
 */
export function KlookIconBadge({ size = 44 }) {
  return (
    <div 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '12px',
        background: '#FF5B00',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(255, 91, 0, 0.28)'
      }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="#FFFFFF" />
        <circle cx="19" cy="5" r="2.5" fill="#FFD100" />
      </svg>
    </div>
  );
}
