import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, School, Monitor, Trophy, BookOpen } from 'lucide-react'
import { FadeContent } from './reactbits/FadeContent'
import type { Facility } from '../lib/cms'

interface FacilitiesStripProps {
  facilities: Facility[]
}

const facilityIcons: Record<string, any> = {
  academic: Monitor,
  science_tech: School,
  sports: Trophy,
  infrastructure: School,
}

export function FacilitiesStrip({ facilities }: FacilitiesStripProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" aria-label="Campus Facilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeContent direction="up" distance={14} className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 rounded-full mb-3">
              Campus Environment
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              State-of-the-Art Infrastructure
            </h2>
            <p className="mt-2 text-slate-600 max-w-xl">
              Equipped with modern laboratories, smart classrooms, athletic fields, and a comprehensive library for complete development.
            </p>
          </div>

          <Link
            href="/facilities"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 text-white text-sm font-semibold hover:bg-blue-800 transition-colors self-start md:self-auto"
          >
            <span>Explore All Facilities</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </FadeContent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilities.slice(0, 3).map((fac) => {
            const Icon = facilityIcons[fac.category] || BookOpen
            return (
              <div
                key={fac.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {fac.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {fac.description}
                  </p>
                  
                  {fac.highlights && fac.highlights.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {fac.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{h.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link
                  href="/facilities"
                  className="inline-flex items-center text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors pt-4 border-t border-slate-100"
                >
                  View campus details
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
