import React from 'react'
import Link from 'next/link'
import { ChevronRight, GraduationCap, BookOpen, Sparkles, Award } from 'lucide-react'
import { FadeContent } from './reactbits/FadeContent'
import { SpotlightCard } from './reactbits/SpotlightCard'

interface StageCardsProps {
  title?: string
  subtitle?: string
  stages?: {
    title: string
    grades: string
    description: string
    linkUrl?: string
  }[]
}

const defaultStages = [
  {
    title: 'Pre-Primary Foundation',
    grades: 'Nursery – UKG',
    description:
      'Play-way foundational learning fostering curiosity, early phonics, motor skills, and joyful social habits.',
    linkUrl: '/academics/curriculum',
    icon: Sparkles,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    title: 'Primary Schooling',
    grades: 'Classes 1 – 5',
    description:
      'Solid conceptual grounding in mathematics, science, bilingual fluency (Marathi & English), and moral values.',
    linkUrl: '/academics/curriculum',
    icon: BookOpen,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    title: 'Middle School',
    grades: 'Classes 6 – 8',
    description:
      'Experiential science experiments, computational thinking in computer lab, sports training, and analytical reasoning.',
    linkUrl: '/academics/curriculum',
    icon: GraduationCap,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    title: 'Secondary SSC Prep',
    grades: 'Classes 9 & 10',
    description:
      'Rigorous Maharashtra State Board preparation, chapter-wise test series, practical lab sessions, and focused career mentoring.',
    linkUrl: '/academics/curriculum',
    icon: Award,
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
]

export function StageCards({ title, subtitle, stages }: StageCardsProps) {
  const displayStages = stages && stages.length > 0 ? stages : defaultStages

  return (
    <section
      className="py-16 md:py-24 bg-slate-50 border-b border-slate-200"
      aria-label="Academic Stages"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeContent direction="up" distance={14} className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 rounded-full mb-3">
            Academic Pathways
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title || 'Our Academic Stages'}
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            {subtitle ||
              'Nurturing curiosity, foundational skills, and board exam success at every grade level.'}
          </p>
        </FadeContent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStages.map((stage, idx) => {
            const Icon = defaultStages[idx % defaultStages.length]?.icon || BookOpen
            const badgeColor =
              defaultStages[idx % defaultStages.length]?.badgeColor || 'bg-amber-100 text-amber-800'
            return (
              <SpotlightCard
                key={stage.title + idx}
                spotlightColor="rgba(245, 158, 11, 0.12)"
                spotlightSize={280}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold shadow-xs group-hover:bg-blue-900 group-hover:text-amber-400 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${badgeColor}`}
                    >
                      {stage.grades}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{stage.description}</p>
                </div>

                <Link
                  href={stage.linkUrl || '/academics/curriculum'}
                  className="inline-flex items-center text-sm font-semibold text-blue-900 hover:text-amber-600 transition-colors group/link mt-auto pt-3 border-t border-slate-100"
                >
                  Learn curriculum
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </SpotlightCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
