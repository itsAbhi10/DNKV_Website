'use client'

import React from 'react'
import Link from 'next/link'
import { GraduationCap, LogIn, CreditCard, Phone, Globe } from 'lucide-react'

interface UtilityBarProps {
  phone?: string
  currentLocale?: string
}

export function UtilityBar({ phone = '+91-9545541454', currentLocale = 'en' }: UtilityBarProps) {
  const isMarathi = currentLocale === 'mr'

  const toggleLanguage = () => {
    const nextLocale = isMarathi ? 'en' : 'mr'
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`
    window.location.reload()
  }

  return (
    <>
      {/* WCAG 2.2 AA Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-950 focus:font-bold focus:shadow-lg focus:rounded focus:ring-2 focus:ring-blue-900"
      >
        Skip to main content / मुख्य मजकुरावर जा
      </a>

      <div className="bg-[#07172c] text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Quick Support & Direct Phone */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 font-medium transition-colors"
              aria-label={`Call DNKV office at ${phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              {isMarathi ? 'चिंचगाव, अकुळगाव (सोलापूर)' : 'Chinchgaon, Akulgaon, Maharashtra'}
            </span>
          </div>

          {/* Quick Action Links & Language Switcher */}
          <div className="flex items-center gap-4">
            <Link
              href="/admissions/process"
              className="hidden md:flex items-center gap-1 hover:text-amber-400 transition-colors font-medium"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMarathi ? 'प्रवेश २०२६-२७' : 'Admissions 2026'}</span>
            </Link>

            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors text-[11px]"
            >
              <span>{isMarathi ? 'कर्मचारी कक्ष' : 'Staff Admin'}</span>
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 px-2.5 py-1 rounded text-xs font-semibold transition-all border border-slate-700 focus:ring-2 focus:ring-amber-400"
              aria-label={isMarathi ? 'Switch to English' : 'मराठी मध्ये वाचा'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'English' : 'मराठी'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
