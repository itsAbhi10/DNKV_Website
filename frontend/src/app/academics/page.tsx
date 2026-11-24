import React from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

export const metadata = {
  title: 'Academics & Curriculum | Dr. Netaji Karale Vidyalaya',
  description:
    'Comprehensive curriculum, pedagogical approaches, academic calendar, and SSC board examination performance at DNKV Chinchgaon.',
}

export default function AcademicsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-14 md:py-20 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Excellence</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Academics at Dr. Netaji Karale Vidyalaya
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            A balanced learning environment fostering scientific inquiry, mathematical rigor,
            bilingual fluency, and holistic board examination success.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Core Sub-sections 3-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Curriculum & Pedagogy</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Progressive learning paths aligned with Maharashtra State Board standards from
                Pre-Primary foundation through Secondary SSC preparation.
              </p>
              <div className="space-y-2 mb-8 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Activity-based pre-primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Bilingual Marathi & English fluency</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Practical science lab experiments</span>
                </div>
              </div>
            </div>
            <Link
              href="/academics/curriculum"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-amber-600 transition-colors pt-4 border-t border-slate-100"
            >
              <span>Explore Full Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Academic Calendar</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Structured term schedules, unit test schedules, preliminary examination windows,
                annual festivals, and vacation periods.
              </p>
              <div className="space-y-2 mb-8 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Term 1 & Term 2 schedules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Unit tests & prelim timetables</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Annual sports and cultural dates</span>
                </div>
              </div>
            </div>
            <Link
              href="/academics/calendar"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-amber-600 transition-colors pt-4 border-t border-slate-100"
            >
              <span>View Academic Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Board Results & Merit</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Consistent 99%+ SSC board pass percentages, distinction achievers honor roll, and
                subject merit awards.
              </p>
              <div className="space-y-2 mb-8 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>99.2% Class X pass rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>48 distinctions in recent batch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>DPDP Act compliant consent records</span>
                </div>
              </div>
            </div>
            <Link
              href="/academics/results"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-amber-600 transition-colors pt-4 border-t border-slate-100"
            >
              <span>View Examination Results</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
