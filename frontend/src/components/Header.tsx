'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { SchoolEmblem } from './SchoolEmblem'
import { ShinyText } from './reactbits/ShinyText'
import type { NavigationGlobal, SiteSettings } from '../lib/cms'

interface HeaderProps {
  navigation?: NavigationGlobal
  siteSettings?: SiteSettings
}

export function Header({ navigation, siteSettings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const menuItems = navigation?.menuItems || []
  const cta = navigation?.admissionCta || {
    label: 'Admissions 2026-27',
    url: '/admissions/enquiry',
  }
  const schoolName = siteSettings?.name || 'Dr. Netaji Karale Vidyalaya'
  const tagline = siteSettings?.tagline || 'Empowering Students for the Future.'

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns on outside click or Esc
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b transition-all duration-200 ${
        isScrolled ? 'border-slate-300/80 shadow-sm py-1.5' : 'border-slate-200/80 shadow-xs py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[56px] sm:min-h-[62px]">
          {/* Logo Lockup: Clean Emblem + Single Title Line + Empowering Tagline */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1 -ml-1 transition-transform"
            aria-label={`${schoolName} - Home`}
          >
            {/* Sleek Royal Crest */}
            <SchoolEmblem
              size={44}
              className="group-hover:scale-105 transition-transform shrink-0"
            />

            <div className="flex flex-col justify-center">
              {/* Only the school title line */}
              <span className="font-serif font-bold text-slate-900 text-base sm:text-lg lg:text-xl tracking-tight leading-snug group-hover:text-blue-950 transition-colors">
                Dr. Netaji Karale Vidyalaya
              </span>
              {/* Followed directly by the empowering motto */}
              <span className="text-[11px] sm:text-xs text-amber-600 font-medium tracking-normal leading-tight">
                {tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Tree - Sleek, Compact, High-End */}
          <nav
            ref={navRef}
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-1"
          >
            {menuItems.map((item) => {
              const hasSub = item.subItems && item.subItems.length > 0
              const isOpen = openDropdown === item.label

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => hasSub && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {hasSub ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-semibold rounded-lg transition-colors ${
                        isOpen
                          ? 'text-blue-950 bg-slate-100'
                          : 'text-slate-700 hover:text-blue-950 hover:bg-slate-100/80'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${
                          isOpen ? 'rotate-180 text-amber-600' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.url}
                      className="px-2.5 py-1.5 text-[13px] font-semibold text-slate-700 hover:text-blue-950 hover:bg-slate-100/80 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Card */}
                  {hasSub && isOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.subItems!.map((sub) => (
                        <Link
                          key={sub.url}
                          href={sub.url}
                          className="flex flex-col px-4 py-2 hover:bg-slate-50 transition-colors group/item"
                        >
                          <span className="text-xs font-bold text-slate-900 group-hover/item:text-blue-900 transition-colors">
                            {sub.label}
                          </span>
                          {sub.description && (
                            <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {sub.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Action CTA Button - Compact Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href={cta.url}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-xs hover:shadow-md hover:scale-105 transition-all"
            >
              <ShinyText trigger="hover" shimmerColor="rgba(251, 191, 36, 0.95)">
                <span>{cta.label}</span>
              </ShinyText>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href={cta.url}
              className="sm:hidden text-xs font-bold px-3 py-1 rounded-full bg-blue-950 text-white"
            >
              Apply
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-5 space-y-1.5 shadow-xl max-h-[75vh] overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.label} className="border-b border-slate-100 pb-1.5">
              <Link
                href={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-bold text-slate-900 hover:text-blue-900"
              >
                {item.label}
              </Link>
              {item.subItems && item.subItems.length > 0 && (
                <div className="pl-3 space-y-1 mt-0.5">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.url}
                      href={sub.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-xs text-slate-600 hover:text-amber-700"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-2">
            <Link
              href={cta.url}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-950 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{cta.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
