import React from 'react'
import Link from 'next/link'
import {
  Bell,
  Calendar,
  FileText,
  Download,
  Pin,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react'
import {
  fetchCmsCollection,
  fallbackNotices,
  fallbackNews,
  type Notice,
  type NewsItem,
} from '../../lib/cms'

export const metadata = {
  title: 'News & Official Notices | Dr. Netaji Karale Vidyalaya',
  description:
    'Official school notices, circulars, exam timetables, event schedules, and news updates from DNKV Chinchgaon.',
}

export default async function NewsAndNoticesPage() {
  const [noticesRes, newsRes] = await Promise.all([
    fetchCmsCollection<Notice>('notices', { sort: '-date', limit: '20' }),
    fetchCmsCollection<NewsItem>('news', { sort: '-date', limit: '20' }),
  ])

  const notices = noticesRes.docs.length > 0 ? noticesRes.docs : fallbackNotices
  const news = newsRes.docs.length > 0 ? newsRes.docs : fallbackNews

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-14 md:py-20 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Communications</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Notices & News Updates
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            Stay informed with verified circulars, academic schedules, examination dates, student
            achievements, and community news.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Notices (6 cols) */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-amber-500">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <h2 className="text-2xl font-bold text-slate-900">Official Notices & Circulars</h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                {notices.length} Published
              </span>
            </div>

            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(notice.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">{notice.title}</h3>

                  {notice.expiryDate && (
                    <div className="text-xs text-amber-700 flex items-center gap-1 mb-4">
                      <Clock className="w-3 h-3" />
                      <span>
                        Valid until: {new Date(notice.expiryDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Issued by: DNKV Head Office</span>
                    <a
                      href={notice.documentFile?.url || '#'}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Circular</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: School News & Press (6 cols) */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-blue-900">
              <h2 className="text-2xl font-bold text-slate-900">Campus News & Press</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                {news.length} Stories
              </span>
            </div>

            <div className="space-y-6">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">DNKV Communications</span>
                    <span className="font-bold text-blue-900 flex items-center gap-1">
                      Published Report
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
