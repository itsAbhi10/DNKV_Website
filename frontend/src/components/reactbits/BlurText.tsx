'use client'

import React, { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface BlurTextProps {
  text: string
  className?: string
  wordDelay?: number
  duration?: number
}

/**
 * React Bits - BlurText Component
 * Word-level blur reveal designed specifically for hero headlines and LCP elements.
 * 
 * Rules honoured:
 * - Word-level splitting ONLY (preserves Devanagari ligatures and multi-script characters)
 * - LCP safety: Default state is fully visible in SSR HTML; no opacity:0 hidden text
 * - Total duration completes under 600ms
 * - Prefers-reduced-motion bypassed
 * - Screen-reader accessible
 */
export function BlurText({
  text,
  className = '',
  wordDelay = 65,
  duration = 320,
}: BlurTextProps) {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Word-level split only - preserves Devanagari words and complex scripts
  const words = text.split(' ')

  // If reduced motion is requested or before hydration, render plain visible text for LCP
  if (prefersReduced || !mounted) {
    return (
      <span className={className} aria-label={text}>
        {text}
      </span>
    )
  }

  return (
    <span className={`inline-block ${className}`} aria-label={text} role="text">
      {words.map((word, index) => {
        const delay = Math.min(index * wordDelay, 280) // cap stagger so total is strictly < 600ms
        return (
          <span
            key={`${word}-${index}`}
            className="inline-block will-change-transform"
            style={{
              animation: `blurWordIn ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
            }}
          >
            {word}
            {index < words.length - 1 && '\u00A0'}
          </span>
        )
      })}
      <style jsx>{`
        @keyframes blurWordIn {
          0% {
            opacity: 0.35;
            filter: blur(6px);
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }
      `}</style>
    </span>
  )
}
