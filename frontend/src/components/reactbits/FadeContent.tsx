'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface FadeContentProps {
  children: React.ReactNode
  blur?: boolean
  duration?: number
  easing?: string
  delay?: number
  threshold?: number
  initialOpacity?: number
  className?: string
  direction?: 'up' | 'down' | 'none'
  distance?: number
}

/**
 * React Bits - FadeContent Component
 * Restrained, high-performance scroll reveal with zero layout shift.
 * Automatically bypassed when prefers-reduced-motion is active.
 */
export function FadeContent({
  children,
  blur = false,
  duration = 500,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay = 0,
  threshold = 0.15,
  initialOpacity = 0,
  className = '',
  direction = 'up',
  distance = 14,
}: FadeContentProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setInView(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(element)
        }
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, prefersReduced])

  // If user prefers reduced motion, render without transform or opacity transition
  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const getTransform = () => {
    if (inView) return 'translate3d(0, 0, 0)'
    if (direction === 'up') return `translate3d(0, ${distance}px, 0)`
    if (direction === 'down') return `translate3d(0, -${distance}px, 0)`
    return 'none'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transform: getTransform(),
        filter: blur && !inView ? 'blur(4px)' : 'none',
        transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms, filter ${duration}ms ${easing} ${delay}ms`,
        willChange: inView ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
