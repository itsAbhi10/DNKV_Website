'use client'

import React from 'react'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import {
  buildFullAddress,
  buildMapUrl,
  buildDirectionsUrl,
  buildEmbedMapUrl,
  defaultSiteSettings,
  type LocationSettings,
  type SiteSettings,
} from '../lib/cms'

export interface InteractiveMapPreviewProps {
  location?: LocationSettings
  siteSettings?: SiteSettings
  className?: string
  heightClassName?: string
  cardTitle?: string
  showBar?: boolean
}

export function InteractiveMapPreview({
  location,
  siteSettings,
  className = '',
  heightClassName = 'h-56 sm:h-64',
  cardTitle = 'Dr. Netaji Karale Vidyalaya Campus',
  showBar = true,
}: InteractiveMapPreviewProps) {
  const loc = location || siteSettings?.location || defaultSiteSettings.location
  const fallbackAddress = siteSettings?.address || defaultSiteSettings.address
  const fullAddress = buildFullAddress(loc, fallbackAddress)
  const mapUrl = buildMapUrl(loc, fullAddress)
  const directionsUrl = buildDirectionsUrl(loc, fullAddress)
  const embedUrl = buildEmbedMapUrl(loc, fullAddress)
  const plusCode = loc?.plusCode || '4F62+JQG'

  return (
    <div
      className={`rounded-2xl border border-white/10 overflow-hidden bg-slate-900 shadow-md ${className}`}
    >
      {/* Header bar with direct links */}
      {showBar && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-950/80 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-semibold truncate max-w-[200px] sm:max-w-xs">{cardTitle}</span>
            {plusCode && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[11px] border border-amber-500/20">
                {plusCode}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open DNKV location in Google Maps (opens in a new tab)"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors py-1 px-1.5 rounded focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400"
            >
              <span>Full Map</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to DNKV in Google Maps (opens in a new tab)"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white transition-colors py-1 px-1.5 rounded focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400"
            >
              <Navigation className="w-3 h-3 text-amber-400" aria-hidden="true" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      )}

      {/* Direct Interactive Google Map View */}
      <div className={`relative w-full ${heightClassName} bg-slate-950`}>
        <iframe
          title="Dr. Netaji Karale Vidyalaya Campus Map"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default InteractiveMapPreview
