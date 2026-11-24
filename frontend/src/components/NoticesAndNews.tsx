import React from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight, FileText, Pin, ExternalLink } from 'lucide-react'
import type { Notice, NewsItem } from '../lib/cms'

interface NoticesAndNewsProps {
  notices: Notice[]
  news: NewsItem[]
}

export function NoticesAndNews({ notices, news }: NoticesAndNewsProps) {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200" aria-label="Notices and News">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Column 1: Official Notices & Circulars (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-amber-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="text-2xl font-bold text-slate-900">Official Notices</h3>
                </div>
                <Link
                  href="/news-and-notices"
                  className="text-xs font-semibold text-blue-900 hover:text-amber-600 flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {notices.slice(0, 4).map((notice) => (
                  <div
                    key={notice.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-lg bg-blue-100 text-blue-900 flex-shrink-0 mt-0.5">
                      {notice.isPinned ? <Pin className="w-4 h-4 text-amber-600" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {notice.category}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(notice.date).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-blue-900">
                        <Link href="/news-and-notices">{notice.title}</Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/news-and-notices"
                className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <span>Browse Notice Archive & Circulars</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Campus News & Achievements (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-blue-900">
              <h3 className="text-2xl font-bold text-slate-900">Latest Campus News</h3>
              <Link
                href="/news-and-notices"
                className="text-xs font-semibold text-blue-900 hover:text-amber-600 flex items-center gap-1"
              >
                All Stories
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {news.slice(0, 2).map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  {/* Decorative / Cover Image placeholder */}
                  <div className="h-44 bg-gradient-to-tr from-slate-900 to-blue-900 flex items-center justify-center p-6 text-white relative">
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                      {item.category}
                    </span>
                    <span className="text-center font-bold text-lg text-slate-200 drop-shadow">
                      {item.title.substring(0, 40)}...
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.date).toLocaleDateString('en-IN', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 hover:text-blue-900">
                        <Link href="/news-and-notices">{item.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <Link
                      href="/news-and-notices"
                      className="inline-flex items-center text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors pt-3 border-t border-slate-100"
                    >
                      Read full story
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
