'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useReducedMotion } from '../reactbits/useReducedMotion'

interface ScrollStackProps {
  children: React.ReactNode[]
  className?: string
  cardClassName?: string
}

interface StackCardItemProps {
  children: React.ReactNode
  index: number
  total: number
  progress: MotionValue<number>
}

function StackCardItem({
  children,
  index,
  total,
  progress,
}: StackCardItemProps) {
  const step = 1 / total
  const start = index * step
  const end = (index + 1) * step

  // Scale down earlier cards subtly as subsequent cards stack over them
  const scale = useTransform(progress, [start, end, 1], [1, 1 - (total - index - 1) * 0.035, 0.9])
  
  // Upward translation as card enters
  const y = useTransform(
    progress,
    [Math.max(0, start - step * 0.5), start],
    [index === 0 ? 0 : 50, 0],
  )

  // Gentle opacity reveal
  const opacity = useTransform(
    progress,
    [Math.max(0, start - step * 0.4), start],
    [index === 0 ? 1 : 0.65, 1],
  )

  const topOffset = 100 + index * 20 // 100px header clearance + 20px staggered tab cascade

  return (
    <div
      style={{
        position: 'sticky',
        top: `${topOffset}px`,
        zIndex: 10 + index,
      }}
      className="w-full mb-8"
    >
      <motion.div
        style={{
          scale,
          y,
          opacity,
          transformOrigin: 'top center',
        }}
        className="w-full transition-shadow will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * DesktopScrollDeck - Dedicated client component for desktop pinned stacking.
 * Only instantiated after hydration on desktop viewports, ensuring ref is always hydrated.
 */
function DesktopScrollDeck({
  children,
  total,
  className,
}: {
  children: React.ReactNode[]
  total: number
  className: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: `${total * 65}vh`,
      }}
      className={`relative w-full max-w-4xl mx-auto pb-24 ${className}`}
    >
      <div className="relative w-full">
        {React.Children.map(children, (child, idx) => (
          <StackCardItem
            key={idx}
            index={idx}
            total={total}
            progress={scrollYProgress}
          >
            {child}
          </StackCardItem>
        ))}
      </div>
    </div>
  )
}

/**
 * ScrollStack Component (React Bits inspired)
 * - Desktop (>=1024px, non-touch): Cards stack smoothly into a pinned deck as user scrolls.
 * - Mobile (<1024px, touchscreens) & prefers-reduced-motion: Clean responsive grid with zero jank.
 * - SSR-safe: Pre-rendered in server HTML without hydration mismatch or useScroll ref errors.
 */
export function ScrollStack({
  children,
  className = '',
  cardClassName = '',
}: ScrollStackProps) {
  const prefersReduced = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkDesktop = () => {
      const isTouch =
        typeof window !== 'undefined' &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0)
      setIsDesktop(window.innerWidth >= 1024 && !isTouch)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop, { passive: true })
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const total = React.Children.count(children)

  // Server render & mobile/reduced motion fallback: Render clean responsive grid
  if (!mounted || prefersReduced || !isDesktop) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className={cardClassName}>
            {child}
          </div>
        ))}
      </div>
    )
  }

  // Hydrated desktop: render pinned scroll stacking deck
  return (
    <DesktopScrollDeck total={total} className={className}>
      {children}
    </DesktopScrollDeck>
  )
}
