import React from 'react'
import Link from 'next/link'
import {
  School,
  Monitor,
  Trophy,
  BookOpen,
  Droplets,
  Bus,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Video,
} from 'lucide-react'
import { fetchCmsCollection, fallbackFacilities, type Facility } from '../../lib/cms'

export const metadata = {
  title: 'Campus Facilities & Infrastructure | Dr. Netaji Karale Vidyalaya',
  description:
    'Explore the modern laboratories, smart classrooms, sports ground, library, and campus amenities at DNKV Chinchgaon.',
}

const detailedFacilities = [
  {
    id: 'f-1',
    title: 'Smart Classrooms & Audio-Visual Learning Hall',
    category: 'Academic',
    icon: Monitor,
    summary:
      'Digital interactive display boards, bilingual educational software, and modern audio systems transforming conceptual learning into an engaging visual journey.',
    points: [
      'Interactive touch displays with high-definition educational multimedia',
      'Curriculum-mapped modules in Marathi, Hindi, and English',
      'Ergonomic seating with natural daylight and cross-ventilation',
      'Continuous battery and solar inverter power backup',
    ],
  },
  {
    id: 'f-2',
    title: 'Science & Computer Laboratories',
    category: 'Science & IT',
    icon: School,
    summary:
      'Separate laboratory stations for Physics, Chemistry, and Biology practicals, plus a 40-workstation air-conditioned computer center.',
    points: [
      'Physics optical benches, mechanics apparatus, and electrical boards',
      'Chemistry reagent stations with fume safety and glassware',
      'Biology compound microscopes, specimen slides, and human anatomy models',
      '40 modern PC workstations with coding tools, office suites, and internet',
    ],
  },
  {
    id: 'f-3',
    title: 'Expansive Multi-Sports Athletic Ground',
    category: 'Sports',
    icon: Trophy,
    summary:
      'Dedicated clay and grass courts for traditional and athletic sports, coaching rural students to district and state championships.',
    points: [
      'Regulation-standard Kho-Kho and Kabaddi competition grounds',
      'Volleyball court and badminton practice areas',
      'Track and field facilities for 100m/200m sprint, long jump, and shot put',
      'Qualified physical education instructors and annual sports carnival',
    ],
  },
  {
    id: 'f-4',
    title: 'Central Library & Reading Sanctuary',
    category: 'Academic',
    icon: BookOpen,
    summary:
      'A quiet, resource-rich library housing over 5,000 titles including textbooks, reference encyclopedias, competitive exam materials, and daily Marathi/English newspapers.',
    points: [
      'Over 5,000 cataloged books, periodicals, and educational magazines',
      'Dedicated Marathi literature section honoring state cultural icons',
      'Scholarship and Navodaya / NTSE examination preparation guides',
      'Quiet reading tables accommodating 60 students simultaneously',
    ],
  },
  {
    id: 'f-5',
    title: 'Pure Drinking Water (RO) & Solar Campus',
    category: 'Amenities',
    icon: Droplets,
    summary:
      'Multi-stage commercial Reverse Osmosis (RO) filtration plant providing safe, chilled drinking water across all school floors.',
    points: [
      'Multi-stage UV + RO commercial purification plant with daily testing',
      'Touchless drinking water water coolers and taps',
      'Rooftop solar photovoltaic panels supporting clean green energy',
      'Sanitized, separate modern washroom blocks for girls, boys, and staff',
    ],
  },
  {
    id: 'f-6',
    title: 'Safe Campus Security & Student Transportation',
    category: 'Safety & Transit',
    icon: Bus,
    summary:
      'A fully secured, compound-walled campus with CCTV surveillance, security guards, and coordinated rural transport connecting surrounding villages.',
    points: [
      'Boundary wall perimeter with single monitored entry gate',
      'High-definition CCTV cameras across corridors, gates, and grounds',
      'Reliable school bus and coordinated van connectivity for distant hamlets',
      'First aid medical infirmary with emergency medical liaison',
    ],
  },
]

export default async function FacilitiesPage() {
  const cmsFacilitiesRes = await fetchCmsCollection<Facility>('facilities', { sort: 'order' })
  const facilitiesList =
    cmsFacilitiesRes.docs.length > 0 ? cmsFacilitiesRes.docs : fallbackFacilities

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-14 md:py-20 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <School className="w-3.5 h-3.5" />
            <span>Infrastructure & Amenities</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Campus Facilities
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            A comprehensive, modern educational campus in Chinchgaon designed for experiential
            learning, scientific discovery, physical fitness, and student well-being.
          </p>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedFacilities.map((fac) => {
            const Icon = fac.icon
            return (
              <div
                key={fac.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {fac.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-3">{fac.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{fac.summary}</p>

                  <div className="space-y-2.5 mb-8">
                    {fac.points.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-900">
                  <span>Standard Compliant</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Video Tour Callout */}
        <div className="mt-16 bg-gradient-to-br from-blue-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 mb-3">
              <Video className="w-3.5 h-3.5" />
              <span>Virtual Tour</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Want to see our campus in motion?
            </h3>
            <p className="text-slate-300 text-sm md:text-base">
              Watch our full HD campus video tour covering the morning assembly, science
              laboratories, computer classes, and sports ground.
            </p>
          </div>
          <Link
            href="/#video-tour"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex-shrink-0 flex items-center gap-2"
          >
            <span>Watch Campus Video</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
