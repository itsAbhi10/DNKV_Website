'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: number
}

/**
 * React Bits - SpotlightCard Component
 * Subtle, cursor-following illumination card for desktop interactions.
 * Automatically disabled on mobile touchscreens and when prefers-reduced-motion is active.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(245, 158, 11, 0.10)',
  spotlightSize = 320,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // Detect touchscreen to avoid hover processing on mobile
    if (typeof window !== 'undefined') {
      setIsTouchDevice(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches,
      )
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || prefersReduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    if (!isTouchDevice && !prefersReduced) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Spotlight illumination layer - only on non-touch desktop */}
      {!isTouchDevice && !prefersReduced && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-20 h-full flex flex-col justify-between">{children}</div>
    </div>
  )
}
