import React from 'react';

interface AniqLogoProps {
  className?: string;
  variant?: 'gold' | 'light' | 'dark';
  showTagline?: boolean;
}

export const AniqLogo: React.FC<AniqLogoProps> = ({
  className = 'h-12',
  variant = 'gold',
  showTagline = true,
}) => {
  const primaryColor =
    variant === 'light'
      ? '#FFFFFF'
      : variant === 'dark'
      ? '#1E1E22'
      : '#D4AF37';

  const secondaryColor =
    variant === 'light'
      ? 'rgba(255, 255, 255, 0.8)'
      : variant === 'dark'
      ? '#4A4A52'
      : '#B76E79';

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-16"
      >
        <defs>
          <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E8B2" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="80%" stopColor="#C5A028" />
            <stop offset="100%" stopColor="#E6CA65" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* --- SCISSORS EMBLEM INTEGRATED INTO 'A' --- */}
        <g id="scissors-symbol" stroke="url(#goldSheen)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Finger Loops */}
          <circle cx="38" cy="18" r="9" fill="none" />
          <circle cx="62" cy="18" r="9" fill="none" />
          
          {/* Central Pivot Pin */}
          <circle cx="50" cy="38" r="3" fill="#D4AF37" />

          {/* Scissor Blades crossing into 'A' legs */}
          <path d="M42 26 L50 38 L68 76" />
          <path d="M58 26 L50 38 L32 76" />
          
          {/* 'A' Crossbar */}
          <line x1="39" y1="56" x2="61" y2="56" stroke="url(#goldSheen)" strokeWidth="3" />
        </g>

        {/* --- WORDMARK: 'n i q' --- */}
        {/* Letter 'n' */}
        <path
          d="M86 42 V76 M86 52 C91 42, 108 42, 114 52 V76"
          stroke="url(#goldSheen)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter 'i' */}
        <circle cx="136" cy="36" r="3.5" fill="#D4AF37" />
        <line x1="136" y1="46" x2="136" y2="76" stroke="url(#goldSheen)" strokeWidth="6" strokeLinecap="round" />

        {/* Letter 'q' with luxury flourish */}
        <g id="letter-q">
          {/* Oval of 'q' */}
          <ellipse cx="166" cy="58" rx="14" ry="17" stroke="url(#goldSheen)" strokeWidth="5.5" />
          {/* Stem and sweeping cursive tail */}
          <path
            d="M180 44 V78 C180 94, 212 94, 230 80"
            stroke="url(#goldSheen)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </g>

        {/* Registered Trademark symbol */}
        <circle cx="236" cy="46" r="4.5" stroke="url(#goldSheen)" strokeWidth="1" />
        <text x="236" y="49" fill="#D4AF37" fontSize="6" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">R</text>

        {/* Tagline */}
        {showTagline && (
          <text
            x="140"
            y="94"
            fill={secondaryColor}
            fontSize="10.5"
            fontFamily="'Playfair Display', serif"
            letterSpacing="5.5"
            textAnchor="middle"
            fontWeight="600"
          >
            UNISEX LUXURY SALON
          </text>
        )}
      </svg>
    </div>
  );
};

