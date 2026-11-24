'use client'

import React, { useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface ShinyTextProps {
  children: React.ReactNode
  className?: string
  shimmerColor?: string
  trigger?: 'hover' | 'once'
}

/**
 * React Bits - ShinyText Component
 * Subtle, elegant shimmer effect for CTAs and highlighted text.
 *
 * Rules honoured:
 * - Plays ON HOVER or ONCE on load only (strictly NO infinite CPU-consuming loops)
 * - Automatically disabled when prefers-reduced-motion is active
 * - Zero layout shift: applies as a text-clip overlay
 */
export function ShinyText({
  children,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.85)',
  trigger = 'hover',
}: ShinyTextProps) {
  const prefersReduced = useReducedMotion()
  const [hasRunOnce, setHasRunOnce] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  if (prefersReduced) {
    return <span className={className}>{children}</span>
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsHovered(true)
    }
  }

  const handleAnimationEnd = () => {
    if (trigger === 'once') {
      setHasRunOnce(true)
    }
    setIsHovered(false)
  }

  const shouldAnimate = trigger === 'hover' ? isHovered : !hasRunOnce

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onAnimationEnd={handleAnimationEnd}
      className={`relative inline-block ${className}`}
      style={
        shouldAnimate
          ? {
              backgroundImage: `linear-gradient(110deg, currentColor 0%, currentColor 35%, ${shimmerColor} 50%, currentColor 65%, currentColor 100%)`,
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shinySweep 750ms ease-in-out 1',
            }
          : undefined
      }
    >
      {children}
      <style jsx>{`
        @keyframes shinySweep {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
    </span>
  )
}
