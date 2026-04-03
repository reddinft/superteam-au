'use client'

import { motion } from 'framer-motion'

// Southern Cross (Crux) star positions in 300×300 viewBox
// Based on actual Crux constellation layout
const STARS = [
  // α Crucis (Acrux) — bottom-left, largest
  { cx: 95, cy: 230, r: 17, delay: 0 },
  // β Crucis (Mimosa) — right, second largest
  { cx: 235, cy: 155, r: 14, delay: 0.4 },
  // γ Crucis (Gacrux) — top, third
  { cx: 120, cy: 60, r: 11, delay: 0.8 },
  // δ Crucis — upper-left
  { cx: 60, cy: 130, r: 9, delay: 1.2 },
  // ε Crucis (Ginan) — inner small
  { cx: 145, cy: 165, r: 7, delay: 1.6 },
]

function StarShape({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  return (
    <motion.g
      animate={{
        scale: [0.95, 1.05, 0.95],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2.5 + delay * 0.3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Outer glow */}
      <circle
        cx={cx}
        cy={cy}
        r={r * 2.5}
        fill="rgba(244, 166, 11, 0.16)"
      />
      {/* Mid glow */}
      <circle
        cx={cx}
        cy={cy}
        r={r * 1.6}
        fill="rgba(244, 166, 11, 0.30)"
      />
      {/* Core star — 4-pointed */}
      <FourPointStar cx={cx} cy={cy} r={r} />
    </motion.g>
  )
}

function FourPointStar({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  // 4-pointed star path
  const outer = r
  const inner = r * 0.35
  const points = [
    [cx, cy - outer],
    [cx + inner, cy - inner],
    [cx + outer, cy],
    [cx + inner, cy + inner],
    [cx, cy + outer],
    [cx - inner, cy + inner],
    [cx - outer, cy],
    [cx - inner, cy - inner],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(' ')

  return (
    <polygon
      points={points}
      fill="var(--color-brand-yellow)"
      style={{ filter: 'drop-shadow(0 0 6px rgba(244, 166, 11, 0.8))' }}
    />
  )
}

export default function SouthernCrossSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Southern Cross constellation"
      role="img"
      style={{ filter: 'drop-shadow(0 0 40px rgba(85,34,224,0.3))' }}
    >
      <defs>
        <filter id="star-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="spaceGlow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#1a0a4e" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#0d0820" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0A0A12" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Atmospheric backdrop */}
      <circle cx="150" cy="165" r="145" fill="url(#spaceGlow)" />
      {/* Constellation lines */}
      <g opacity="0.35" stroke="var(--color-brand-yellow)" strokeWidth="1">
        <line x1="95" y1="230" x2="120" y2="60" />
        <line x1="60" y1="130" x2="235" y2="155" />
      </g>
      {STARS.map((star, i) => (
        <StarShape key={i} {...star} />
      ))}
    </svg>
  )
}
