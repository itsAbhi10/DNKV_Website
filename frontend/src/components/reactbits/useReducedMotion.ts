'use client'

import { useState, useEffect } from 'react'

/**
 * Shared hook to detect user preference for reduced motion (WCAG 2.2 AA).
 * Returns true if the user prefers reduced motion, false otherwise.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false)

  useEffect(() => {
    // Check if window and matchMedia are supported
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReduced
}
