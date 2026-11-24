import React from 'react'

interface SchoolEmblemProps {
  className?: string
  size?: number
}

export function SchoolEmblem({ className = 'w-12 h-12', size = 52 }: SchoolEmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-md select-none shrink-0 transition-transform duration-300 hover:scale-105`}
      aria-label="Dr. Netaji Karale Vidyalaya Emblem"
      role="img"
    >
      <defs>
        {/* Outer Ring Gold Gradient */}
        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Deep Royal Navy Background */}
        <radialGradient id="navyBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="60%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#070D1B" />
        </radialGradient>

        {/* Shield Gold Stroke */}
        <linearGradient id="shieldGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Sun Glow */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>

        {/* Flame Gradient */}
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>
      </defs>

      {/* Outer Golden Beaded Frame */}
      <circle cx="60" cy="60" r="57" fill="url(#goldRim)" />
      <circle cx="60" cy="60" r="53" fill="#0B132B" stroke="#FDE68A" strokeWidth="1" />

      {/* Main Inner Shield Circle */}
      <circle cx="60" cy="60" r="50" fill="url(#navyBg)" />

      {/* Decorative Radiating Sunburst Rays */}
      <g opacity="0.35" stroke="#FDE047" strokeWidth="1">
        <line x1="60" y1="20" x2="60" y2="14" />
        <line x1="78" y1="25" x2="82" y2="20" />
        <line x1="92" y1="39" x2="98" y2="35" />
        <line x1="97" y1="57" x2="103" y2="57" />
        <line x1="23" y1="57" x2="17" y2="57" />
        <line x1="28" y1="39" x2="22" y2="35" />
        <line x1="42" y1="25" x2="38" y2="20" />
      </g>

      {/* Central Heraldic Shield Contour */}
      <path
        d="M60 22 C78 22 88 28 88 46 C88 68 60 84 60 84 C60 84 32 68 32 46 C32 28 42 22 60 22 Z"
        fill="#0D1E3A"
        stroke="url(#shieldGold)"
        strokeWidth="2.5"
      />

      {/* Flame / Diya of Knowledge at top of shield */}
      <ellipse cx="60" cy="38" rx="8" ry="4" fill="#B45309" />
      <path
        d="M60 26 C63 31 66 34 66 37 C66 40 63 42 60 42 C57 42 54 40 54 37 C54 34 57 31 60 26 Z"
        fill="url(#flameGrad)"
      />
      <circle cx="60" cy="36" r="2.5" fill="#FEF9C3" />

      {/* Open Book of Knowledge in lower shield */}
      <g transform="translate(0, 4)">
        {/* Book Left Page */}
        <path
          d="M60 62 C53 58 44 58 39 60 L39 71 C44 69 53 69 60 73 Z"
          fill="#F8FAFC"
          stroke="#0F172A"
          strokeWidth="0.8"
        />
        {/* Book Right Page */}
        <path
          d="M60 62 C67 58 76 58 81 60 L81 71 C76 69 67 69 60 73 Z"
          fill="#F8FAFC"
          stroke="#0F172A"
          strokeWidth="0.8"
        />
        {/* Book Spine */}
        <path d="M60 62 L60 73" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        {/* Page lines */}
        <line x1="43" y1="63" x2="55" y2="61" stroke="#94A3B8" strokeWidth="0.7" />
        <line x1="43" y1="66" x2="55" y2="64" stroke="#94A3B8" strokeWidth="0.7" />
        <line x1="65" y1="61" x2="77" y2="63" stroke="#94A3B8" strokeWidth="0.7" />
        <line x1="65" y1="64" x2="77" y2="66" stroke="#94A3B8" strokeWidth="0.7" />
      </g>

      {/* Golden Laurel Wreaths (Left & Right) */}
      <g fill="#F59E0B" opacity="0.9">
        {/* Left Laurel Leaves */}
        <path d="M26 48 C29 45 32 48 31 51 C30 54 27 52 26 48 Z" />
        <path d="M24 58 C27 55 31 57 30 61 C29 64 25 62 24 58 Z" />
        <path d="M26 69 C29 66 33 68 32 72 C31 75 27 73 26 69 Z" />
        <path d="M31 79 C34 76 38 78 37 82 C36 85 32 83 31 79 Z" />

        {/* Right Laurel Leaves */}
        <path d="M94 48 C91 45 88 48 89 51 C90 54 93 52 94 48 Z" />
        <path d="M96 58 C93 55 89 57 90 61 C91 64 95 62 96 58 Z" />
        <path d="M94 69 C91 66 87 68 88 72 C89 75 93 73 94 69 Z" />
        <path d="M89 79 C86 76 82 78 83 82 C84 85 88 83 89 79 Z" />
      </g>

      {/* Gold Ribbon at bottom */}
      <path
        d="M34 94 L60 88 L86 94 L81 100 L60 96 L39 100 Z"
        fill="url(#shieldGold)"
        stroke="#78350F"
        strokeWidth="0.8"
      />
      <text
        x="60"
        y="95"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="bold"
        fill="#0F172A"
        fontFamily="sans-serif"
        letterSpacing="0.8"
      >
        ESTD 1998
      </text>

      {/* Small Merit Stars */}
      <polygon points="60,103 61.5,107 65.5,107 62.5,109.5 63.5,113.5 60,111 56.5,113.5 57.5,109.5 54.5,107 58.5,107" fill="#FDE68A" />
      <polygon points="46,101 47,104 50,104 48,106 48.5,109 46,107 43.5,109 44,106 42,104 45,104" fill="#FDE68A" />
      <polygon points="74,101 75,104 78,104 76,106 76.5,109 74,107 71.5,109 72,106 70,104 73,104" fill="#FDE68A" />
    </svg>
  )
}
