'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Megaphone, ArrowRight, X } from 'lucide-react'

interface AnnouncementStripProps {
  announcement?: {
    enabled?: boolean
    text?: string
    linkUrl?: string
    linkLabel?: string
    startDate?: string
    endDate?: string
  }
}

export function AnnouncementStrip({ announcement }: AnnouncementStripProps) {
  const [dismissed, setDismissed] = useState(false)

  // Verify date range
  if (!announcement || !announcement.enabled || !announcement.text || dismissed) {
    return null
  }

  const now = new Date()
  if (announcement.startDate && new Date(announcement.startDate) > now) {
    return null
  }
  if (announcement.endDate && new Date(announcement.endDate) < now) {
    return null
  }

  return (
    <aside
      aria-label="Important School Notice"
      className="relative z-30 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-medium text-xs sm:text-sm py-2 px-4 shadow-xs border-b border-amber-600/30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="inline-flex items-center justify-center p-1 bg-slate-950 text-amber-400 rounded-full shrink-0 shadow-xs">
            <Megaphone className="w-3.5 h-3.5" />
          </span>
          <p className="truncate font-semibold text-slate-950 text-xs sm:text-sm">
            {announcement.text}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {announcement.linkUrl && (
            <Link
              href={announcement.linkUrl}
              className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-white px-3.5 py-1 rounded-full text-xs font-bold transition-all shadow-sm hover:scale-105 focus:ring-2 focus:ring-slate-900"
            >
              <span>{announcement.linkLabel || 'Apply Online'}</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </Link>
          )}

          <button
            onClick={() => setDismissed(true)}
            type="button"
            aria-label="Dismiss announcement"
            className="text-slate-900 hover:text-slate-950 p-1 rounded-full hover:bg-amber-400/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
