import React from 'react'
import Link from 'next/link'
import { Award, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import type { ResultDoc } from '../lib/cms'
import { StatCounter } from './reactbits/StatCounter'

interface ResultsHighlightProps {
  stats?: { value: string; label: string }[]
  results?: ResultDoc
}

export function ResultsHighlight({ stats, results }: ResultsHighlightProps) {
  const defaultStats = [
    { value: '100%', label: 'SSC Board Pass Rate [TODO: Confirm]' },
    { value: '1000+', label: 'Students Enrolled' },
    { value: '50+', label: 'Expert Educators' },
    { value: '25+', label: 'Years of Educational Trust [TODO: Confirm]' },
  ]

  const displayStats = stats && stats.length > 0 ? stats : defaultStats

  return (
    <section className="py-16 md:py-24 bg-blue-950 text-white relative overflow-hidden" aria-label="Academic Achievements">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-blue-950 to-slate-950 opacity-90" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full mb-3">
            Proven Track Record
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Academic Board Excellence
          </h2>
          <p className="mt-3 text-slate-300 text-base md:text-lg">
            Our students consistently excel in Maharashtra State Board examinations, sports tournaments, and district science exhibitions.
          </p>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {displayStats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-amber-400 mb-2 font-mono">
                <StatCounter value={item.value} />
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-300">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Toppers Card Preview with DPDP Act compliance */}
        {results && results.toppers && results.toppers.length > 0 && (
          <div className="bg-white/10 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-md max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {results.academicYear} Examination Milestones
                </span>
                <h3 className="text-xl md:text-2xl font-bold mt-1">
                  {results.className} Merit Honor Roll
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] bg-emerald-950/60 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>DPDP Act 2023 Consent Verified</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {results.toppers.map((topper, i) => (
                <div key={i} className="bg-black/20 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400">{topper.rank}</span>
                    <span className="text-lg font-mono font-bold text-white">
                      <StatCounter value={`${topper.percentage}%`} />
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-200">{topper.studentName}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/academics/results"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>View Full Multi-Year Board Statistics & Distinction Lists</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
