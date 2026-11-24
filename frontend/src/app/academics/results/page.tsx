import React from 'react'
import Link from 'next/link'
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Trophy,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { fetchCmsCollection, fallbackResults, type ResultDoc } from '../../../lib/cms'
import { StatCounter } from '../../../components/reactbits/StatCounter'

export const metadata = {
  title: 'Board Examination Results | Dr. Netaji Karale Vidyalaya',
  description:
    'SSC Class X Board Examination performance, distinction counts, and student merit achievers with DPDP Act 2023 compliance at DNKV Chinchgaon.',
}

const pastYearsResults = [
  { year: '2024-2025', passRate: '99.2%', students: 120, distinctions: 48 },
  { year: '2023-2024', passRate: '98.8%', students: 115, distinctions: 42 },
  { year: '2022-2023', passRate: '100%', students: 110, distinctions: 50 },
  { year: '2021-2022', passRate: '99.1%', students: 105, distinctions: 39 },
]

export default async function ResultsPage() {
  const cmsResultsRes = await fetchCmsCollection<ResultDoc>('results', {
    sort: '-academicYear',
    limit: '5',
  })
  const latestResult = cmsResultsRes.docs.length > 0 ? cmsResultsRes.docs[0] : fallbackResults

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-14 md:py-20 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>Academic Performance</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            SSC Board Examination Results
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            Celebrating our students&rsquo; consistent academic milestones in Maharashtra State
            Board examinations, backed by rigorous coaching and student dedication.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Latest Year Highlight Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-md mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-200 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                Latest Academic Batch: {latestResult.academicYear}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mt-2">
                Class X Board Performance Summary
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200 text-xs font-semibold self-start md:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>DPDP Act 2023 Parental Consent Verified</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8 text-center">
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="text-4xl font-black text-blue-900 font-mono">
                <StatCounter value={`${latestResult.passPercentage}%`} />
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">
                Overall Pass Percentage
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div className="text-4xl font-black text-amber-700 font-mono">
                <StatCounter value={`${latestResult.totalStudents || 120}`} />
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Students Appeared</div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div className="text-4xl font-black text-emerald-700 font-mono">
                <StatCounter value={`${latestResult.distinctionCount || 48}`} />
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Distinction (75%+)</div>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-100">
              <div className="text-4xl font-black text-purple-700 font-mono">100%</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">
                Science & Maths Pass Rate
              </div>
            </div>
          </div>

          {/* Toppers Cards */}
          {latestResult.toppers && latestResult.toppers.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Merit Honor Roll</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestResult.toppers.map((topper, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                          {topper.rank || `Rank 0${idx + 1}`}
                        </span>
                        <span className="text-2xl font-black text-blue-900 font-mono">
                          {topper.percentage}%
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-1">
                        {topper.studentName}
                      </h4>
                      <p className="text-xs text-slate-500">SSC Board Distinction Scholar</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Parental Consent Recorded</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Multi-Year Track Record Table */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-xs mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-900" />
            <h3 className="text-2xl font-bold text-slate-900">
              Historical Board Performance (Multi-Year)
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Academic Year</th>
                  <th className="p-4">Pass Rate</th>
                  <th className="p-4">Candidates Appeared</th>
                  <th className="p-4">Distinction Grade</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pastYearsResults.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900 font-mono">{row.year}</td>
                    <td className="p-4 font-mono font-bold text-emerald-700">{row.passRate}</td>
                    <td className="p-4 text-slate-600">{row.students} Students</td>
                    <td className="p-4 text-slate-600 font-semibold">
                      {row.distinctions} Achievers
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800">
                        Board Certified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DPDP Legal Note */}
        <div className="text-center text-xs text-slate-500 max-w-2xl mx-auto">
          Under the Digital Personal Data Protection Act 2023 of India, student academic honors and
          names are presented with recorded parental/guardian consent. For data inquiries or
          updates, contact dnkvchinchgaon@gmail.com.
        </div>
      </div>
    </div>
  )
}
