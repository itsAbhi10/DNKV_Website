'use client'

import React from 'react'
import { CountUp } from './CountUp'

interface StatCounterProps {
  value: string
  className?: string
}

export function StatCounter({ value, className = '' }: StatCounterProps) {
  // Parse numeric part and prefix/suffix
  // Matches e.g. "100%", "1000+", "99.2%", "₹500", "50"
  const match = value.match(/^([^0-9.]*)(\d+(?:\.\d+)?)(.*)$/)

  if (!match) {
    return <span className={className}>{value}</span>
  }

  const prefix = match[1] || ''
  const numericVal = parseFloat(match[2])
  const suffix = match[3] || ''
  const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0

  return (
    <CountUp
      to={numericVal}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      rawDisplay={value}
      className={className}
    />
  )
}
