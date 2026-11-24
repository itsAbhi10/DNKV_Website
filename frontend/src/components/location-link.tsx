import React from 'react'
import { MapPin, Navigation } from 'lucide-react'
import {
  getSiteSettings,
  buildFullAddress,
  buildMapUrl,
  buildDirectionsUrl,
  defaultSiteSettings,
  type LocationSettings,
  type SiteSettings,
} from '../lib/cms'

export interface LocationLinkProps {
  location?: LocationSettings
  siteSettings?: SiteSettings
  variant?: 'full' | 'inline' | 'footer' | 'card'
  showDirections?: boolean
  className?: string
  linkClassName?: string
  directionsClassName?: string
  iconClassName?: string
}

interface LocationDataViewProps {
  location?: LocationSettings
  siteSettings?: SiteSettings
  variant?: 'full' | 'inline' | 'footer' | 'card'
  showDirections?: boolean
  className?: string
  linkClassName?: string
  directionsClassName?: string
  iconClassName?: string
}

/**
 * Pure presentational view for the location and directions links
 */
export function LocationLinkView({
  location,
  siteSettings,
  variant = 'full',
  showDirections = true,
  className = '',
  linkClassName = '',
  directionsClassName = '',
  iconClassName = '',
}: LocationDataViewProps) {
  const loc = location || siteSettings?.location || defaultSiteSettings.location
  const fallbackAddress = siteSettings?.address || defaultSiteSettings.address
  const fullAddress = buildFullAddress(loc, fallbackAddress)
  const mapUrl = buildMapUrl(loc, fullAddress)
  const directionsUrl = buildDirectionsUrl(loc, fullAddress)
  const directionsLabel = loc?.directionsLabel || 'Get directions'

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open DNKV location in Google Maps (opens in a new tab)"
          className={`group flex items-start gap-2.5 min-h-[44px] py-1 text-slate-300 hover:text-amber-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg transition-colors ${linkClassName}`}
        >
          <MapPin
            className={`w-4 h-4 text-amber-400 shrink-0 mt-1 transition-transform group-hover:scale-110 ${iconClassName}`}
            aria-hidden="true"
          />
          <span className="text-xs sm:text-sm leading-relaxed underline-offset-4 group-hover:underline">
            {fullAddress}
          </span>
        </a>

        {showDirections && (
          <div className="pl-6.5">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to DNKV in Google Maps (opens in a new tab)"
              className={`inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 min-h-[44px] py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 rounded transition-colors ${directionsClassName}`}
            >
              <Navigation className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{directionsLabel} &rarr;</span>
            </a>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open DNKV location in Google Maps (opens in a new tab)"
        className={`inline-flex items-center gap-1.5 min-h-[44px] px-1 text-slate-700 hover:text-blue-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-900 rounded underline-offset-4 hover:underline transition-colors ${linkClassName} ${className}`}
      >
        <MapPin className={`w-4 h-4 text-amber-600 shrink-0 ${iconClassName}`} aria-hidden="true" />
        <span>{fullAddress}</span>
      </a>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Campus Location
            </h4>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open DNKV location in Google Maps (opens in a new tab)"
              className={`block text-sm font-semibold text-slate-900 hover:text-blue-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-900 rounded mt-1 leading-snug min-h-[44px] py-1 transition-colors ${linkClassName}`}
            >
              {fullAddress}
            </a>

            {loc?.plusCode && (
              <div className="mt-1 text-xs text-slate-500 font-mono">
                Plus Code: <span className="font-semibold text-slate-700">{loc.plusCode}</span>
              </div>
            )}

            {showDirections && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-4">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions to DNKV in Google Maps (opens in a new tab)"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-colors min-h-[44px]"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{directionsLabel}</span>
                </a>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open DNKV location in Google Maps (opens in a new tab)"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 min-h-[44px] py-1 transition-colors"
                >
                  <span>Open in Maps &rarr;</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Default 'full' variant
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${className}`}>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open DNKV location in Google Maps (opens in a new tab)"
        className={`group inline-flex items-center gap-2 min-h-[44px] py-2 px-1 text-inherit hover:text-amber-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg transition-colors ${linkClassName}`}
      >
        <MapPin
          className={`w-4 h-4 text-amber-500 shrink-0 transition-transform group-hover:scale-110 ${iconClassName}`}
          aria-hidden="true"
        />
        <span className="font-medium underline-offset-4 group-hover:underline leading-relaxed">
          {fullAddress}
        </span>
      </a>

      {showDirections && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions to DNKV in Google Maps (opens in a new tab)"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-xs min-h-[44px] border border-amber-500/30 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors ${directionsClassName}`}
        >
          <Navigation className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{directionsLabel}</span>
        </a>
      )}
    </div>
  )
}

/**
 * Reusable Server Component <LocationLink />
 * Reads the Location group from SiteSettings through lib/cms.ts (cached with the site-settings tag)
 */
export async function LocationLink(props: LocationLinkProps) {
  let { location, siteSettings } = props

  if (!location && !siteSettings) {
    const fetched = await getSiteSettings()
    siteSettings = fetched
    location = fetched.location
  } else if (!location && siteSettings) {
    location = siteSettings.location
  }

  return <LocationLinkView {...props} location={location} siteSettings={siteSettings} />
}

export default LocationLink
