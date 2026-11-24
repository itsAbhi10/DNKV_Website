'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Image as ImageIcon, Video, Filter, Sparkles, Play } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  category: 'campus' | 'academics' | 'sports' | 'cultural'
  tag: string
  gradient: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'School Campus Frontage & Morning Assembly',
    category: 'campus',
    tag: 'Campus Life',
    gradient: 'from-blue-900 to-indigo-950',
  },
  {
    id: 'g-2',
    title: 'Science Experiment Demonstrations in Chemistry Lab',
    category: 'academics',
    tag: 'Academics',
    gradient: 'from-amber-800 to-slate-900',
  },
  {
    id: 'g-3',
    title: 'Annual Cultural Gathering "Udaan" Traditional Folk Dance',
    category: 'cultural',
    tag: 'Cultural',
    gradient: 'from-purple-900 to-slate-950',
  },
  {
    id: 'g-4',
    title: 'Inter-House Kho-Kho Tournament Championship Match',
    category: 'sports',
    tag: 'Sports',
    gradient: 'from-emerald-900 to-teal-950',
  },
  {
    id: 'g-5',
    title: 'Computer Lab Practical Class with Coding Students',
    category: 'academics',
    tag: 'Technology',
    gradient: 'from-cyan-900 to-blue-950',
  },
  {
    id: 'g-6',
    title: 'Republic Day Parade & Flag Hoisting Ceremony',
    category: 'cultural',
    tag: 'National Days',
    gradient: 'from-orange-800 to-stone-900',
  },
  {
    id: 'g-7',
    title: 'Student Reading Circles at Central Library',
    category: 'campus',
    tag: 'Library',
    gradient: 'from-slate-800 to-slate-950',
  },
  {
    id: 'g-8',
    title: 'District Athletics Track Sprints & Medal Ceremony',
    category: 'sports',
    tag: 'Athletics',
    gradient: 'from-amber-700 to-orange-950',
  },
  {
    id: 'g-9',
    title: 'Taluka Level Drip Irrigation Model Science Exhibition',
    category: 'academics',
    tag: 'Innovation',
    gradient: 'from-blue-800 to-emerald-950',
  },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-14 md:py-20 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Moments</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Photo & Video Gallery
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            A visual chronicle of academic discovery, sports victories, cultural celebrations, and daily life at Dr. Netaji Karale Vidyalaya.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 mr-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'campus', label: 'Campus Life' },
            { id: 'academics', label: 'Academics & Labs' },
            { id: 'sports', label: 'Sports & Athletics' },
            { id: 'cultural', label: 'Cultural & Events' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab.id
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 min-h-[260px] p-6 flex flex-col justify-end bg-gradient-to-br ${item.gradient} text-white hover:-translate-y-1`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md mb-2">
                  {item.tag}
                </span>
                <h3 className="text-lg md:text-xl font-bold leading-tight group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Video Tour Section */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white border border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 mb-3">
                <Video className="w-3.5 h-3.5" />
                <span>Featured Video</span>
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                Experience DNKV in High Definition
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Watch our official campus showcase video featuring morning prayer assembly, hands-on science lab sessions, interactive computer classes, and sports coaching.
              </p>
              <Link
                href="/#video-tour"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors shadow-lg"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Campus Tour</span>
              </Link>
            </div>

            <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl relative border border-slate-800">
              <video
                src="/media/campus-tour.mp4"
                poster="/media/hero-poster.jpg"
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
