'use client'

import React from 'react'
import { useReducedMotion } from './useReducedMotion'

interface ReducedMotionGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Universal wrapper that disables motion wrappers when user prefers reduced motion.
 */
export function ReducedMotionGuard({ children, fallback }: ReducedMotionGuardProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <>{fallback !== undefined ? fallback : children}</>
  }

  return <>{children}</>
}
