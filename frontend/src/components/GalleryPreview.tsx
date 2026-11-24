import React from 'react'
import Link from 'next/link'
import { ArrowRight, Image as ImageIcon } from 'lucide-react'
import { FadeContent } from './reactbits/FadeContent'

const galleryItems = [
  {
    title: 'School Campus & Morning Assembly',
    category: 'Campus Life',
    aspect: 'col-span-1 row-span-1',
    gradient: 'from-blue-800 to-indigo-950',
  },
  {
    title: 'Science & Robotics Laboratory Experiments',
    category: 'Academics',
    aspect: 'col-span-1 sm:col-span-2 row-span-1',
    gradient: 'from-amber-700 to-slate-900',
  },
  {
    title: 'Annual Cultural Gathering "Udaan 2026"',
    category: 'Cultural',
    aspect: 'col-span-1 sm:col-span-2 row-span-1',
    gradient: 'from-purple-900 to-slate-950',
  },
  {
    title: 'Inter-House Sports Meet & Athletics',
    category: 'Sports',
    aspect: 'col-span-1 row-span-1',
    gradient: 'from-emerald-800 to-teal-950',
  },
]

export function GalleryPreview() {
  return (
    <section
      className="py-16 md:py-24 bg-white border-b border-slate-200"
      aria-label="Campus Life Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeContent
          direction="up"
          distance={14}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 rounded-full mb-3">
              Campus Moments
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Life at Dr. Netaji Karale Vidyalaya
            </h2>
            <p className="mt-2 text-slate-600 max-w-xl">
              Glimpses of daily learning, science discoveries, annual sports day, and colorful
              community celebrations.
            </p>
          </div>

          <Link
            href="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 text-white text-sm font-semibold hover:bg-blue-800 transition-colors self-start md:self-auto"
          >
            <span>View Full Photo Gallery</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </FadeContent>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <Link
              key={idx}
              href="/gallery"
              className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 min-h-[220px] p-6 flex flex-col justify-end bg-gradient-to-br ${item.gradient} text-white hover:scale-[1.02] ${item.aspect}`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

              <div className="relative z-10">
                <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md mb-2">
                  {item.category}
                </span>
                <h3 className="text-lg md:text-xl font-bold leading-tight group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
