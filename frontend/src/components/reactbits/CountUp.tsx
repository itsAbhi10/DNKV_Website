'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  decimals?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
  separator?: string
  rawDisplay?: string // Original text for SSR and screen readers, e.g. "100%" or "1000+"
}

/**
 * React Bits - CountUp Component
 * Smooth numeric count-up on scroll with zero external dependencies.
 * - Respects prefers-reduced-motion: renders final value instantly.
 * - Accessible: final value is in SSR HTML and aria-label for screen readers.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1800,
  decimals = 0,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  separator = ',',
  rawDisplay,
}: CountUpProps) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState<number>(from)
  const [started, setStarted] = useState<boolean>(false)

  // Format number with optional decimals and separators
  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals)
    const [intPart, decPart] = fixed.split('.')
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt
  }

  const finalString = rawDisplay || `${prefix}${formatNumber(to)}${suffix}`

  useEffect(() => {
    if (prefersReduced) {
      setValue(to)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [to, started, prefersReduced])

  useEffect(() => {
    if (!started || prefersReduced) return

    let startTimestamp: number | null = null
    let animationFrameId: number

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)

        // Ease Out Quart: 1 - (1 - t)^4
        const ease = 1 - Math.pow(1 - progress, 4)
        const current = from + (to - from) * ease

        setValue(current)

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step)
        } else {
          setValue(to)
        }
      }

      animationFrameId = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [started, from, to, duration, delay, prefersReduced])

  // If user prefers reduced motion, render final value statically
  if (prefersReduced) {
    return (
      <span className={className} aria-label={finalString}>
        {finalString}
      </span>
    )
  }

  return (
    <span ref={ref} className={className} aria-label={finalString}>
      {/* Screen reader always reads finalString */}
      <span className="sr-only">{finalString}</span>
      {/* Visual presentation updates smoothly on scroll */}
      <span aria-hidden="true">
        {started ? `${prefix}${formatNumber(value)}${suffix}` : finalString}
      </span>
    </span>
  )
}
