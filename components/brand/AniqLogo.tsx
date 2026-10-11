'use client';

import React, { useId } from 'react';

interface AniqLogoProps {
  className?: string;
  variant?: 'gold' | 'light' | 'dark';
  showTagline?: boolean;
}

export const AniqLogo: React.FC<AniqLogoProps> = ({
  className = 'h-11',
  variant = 'gold',
  showTagline = true,
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const gradId = `goldSheen-${uniqueId}`;

  const secondaryColor =
    variant === 'light'
      ? 'rgba(255, 255, 255, 0.9)'
      : variant === 'dark'
      ? '#4A4A52'
      : '#E6CA65';

  return (
    <div className={`inline-flex items-center select-none flex-shrink-0 ${className}`}>
      <svg
        viewBox={showTagline ? '18 4 228 96' : '18 4 228 78'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto drop-shadow-sm"
      >
        <defs>
          {/* userSpaceOnUse ensures vertical & horizontal strokes/rects always render their gold gradient */}
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1="20"
            y1="8"
            x2="235"
            y2="88"
          >
            <stop offset="0%" stopColor="#FFF0B8" />
            <stop offset="35%" stopColor="#E6C65A" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F5DF8B" />
          </linearGradient>
        </defs>

        {/* --- SCISSORS EMBLEM INTEGRATED INTO 'A' --- */}
        <g
          id="scissors-symbol"
          stroke={`url(#${gradId})`}
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left Finger Loop + Pinky Tang Hook */}
          <path d="M29 8 C33 9, 35 11, 36 13" strokeWidth="3" />
          <circle cx="38" cy="20" r="8" fill="none" />
          {/* Right Finger Loop */}
          <circle cx="62" cy="20" r="8" fill="none" />

          {/* Central Pivot Pin */}
          <circle cx="50" cy="37" r="2.8" fill="#F5DF8B" stroke="none" />

          {/* Scissor Blades crossing into 'A' legs */}
          <path d="M42 26 L50 37 L68 74" strokeWidth="4.5" />
          <path d="M58 26 L50 37 L32 74" strokeWidth="4.5" />

          {/* Serif Feet on 'A' */}
          <path d="M27 74 H37" strokeWidth="3.2" />
          <path d="M63 74 H73" strokeWidth="3.2" />
        </g>

        {/* 'A' Crossbar (Filled rect so it never suffers from zero-height bounding box) */}
        <rect
          x="37"
          y="53.5"
          width="33"
          height="3.8"
          rx="1.9"
          fill={`url(#${gradId})`}
        />

        {/* --- WORDMARK: 'N i Q' --- */}
        {/* Letter 'n' / 'N' */}
        <path
          d="M84 43 V74 M84 51 C89 41, 107 41, 112 51 V74"
          stroke={`url(#${gradId})`}
          strokeWidth="5.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter 'i' — Prominent Tittle Dot + Solid Gold Stem + Top/Bottom Serifs */}
        <circle cx="132" cy="32.5" r="4.2" fill={`url(#${gradId})`} />
        <rect
          x="129.1"
          y="42.5"
          width="5.8"
          height="32.5"
          rx="2.9"
          fill={`url(#${gradId})`}
        />
        <rect
          x="125.5"
          y="42.5"
          width="13"
          height="3"
          rx="1.5"
          fill={`url(#${gradId})`}
        />
        <rect
          x="125.5"
          y="72"
          width="13"
          height="3"
          rx="1.5"
          fill={`url(#${gradId})`}
        />

        {/* Letter 'q' / 'Q' with luxury flourish */}
        <g id="letter-q">
          <ellipse
            cx="164"
            cy="57.5"
            rx="14"
            ry="16.5"
            stroke={`url(#${gradId})`}
            strokeWidth="5.5"
          />
          <path
            d="M178 43 V75 C178 89, 207 89, 224 76"
            stroke={`url(#${gradId})`}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </g>

        {/* Registered Trademark symbol */}
        <circle cx="232" cy="42" r="5" stroke={`url(#${gradId})`} strokeWidth="1.3" />
        <text
          x="232"
          y="44.5"
          fill="#F5DF8B"
          fontSize="6.5"
          fontFamily="sans-serif"
          textAnchor="middle"
          fontWeight="bold"
        >
          R
        </text>

        {/* Tagline */}
        {showTagline && (
          <text
            x="130"
            y="95"
            fill={secondaryColor}
            fontSize="9.5"
            fontFamily="'Playfair Display', Georgia, serif"
            letterSpacing="4.2"
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
