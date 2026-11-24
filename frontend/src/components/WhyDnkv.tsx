import React from 'react'
import { Award, FlaskConical, Trophy, HeartHandshake, ShieldCheck } from 'lucide-react'
import { FadeContent } from './reactbits/FadeContent'
import { SpotlightCard } from './reactbits/SpotlightCard'

interface WhyDnkvProps {
  heading?: string
  subheading?: string
  pillars?: {
    icon: string
    title: string
    description: string
  }[]
}

const iconMap: Record<string, any> = {
  award: Award,
  'flask-conical': FlaskConical,
  trophy: Trophy,
  'heart-handshake': HeartHandshake,
  shield: ShieldCheck,
}

const defaultPillars = [
  {
    icon: 'award',
    title: 'Academic Board Excellence',
    description: 'Consistent high pass rates and distinction grades in Maharashtra SSC State Board examinations, backed by experienced educators.',
  },
  {
    icon: 'flask-conical',
    title: 'Modern Science & IT Labs',
    description: 'Well-equipped Physics, Chemistry, Biology and 40-workstation computer lab providing hands-on practical learning from grade 5 upwards.',
  },
  {
    icon: 'trophy',
    title: 'Sports & Athletic Mastery',
    description: 'Clay grounds and coaching for Kho-Kho, Kabaddi, Volleyball, and track athletics fostering discipline, sportsmanship, and physical fitness.',
  },
  {
    icon: 'heart-handshake',
    title: 'Values & Rural Leadership',
    description: 'Strong character building rooted in Indian culture, respect for elders, community service, and civic responsibility.',
  },
]

export function WhyDnkv({ heading, subheading, pillars }: WhyDnkvProps) {
  const displayPillars = pillars && pillars.length > 0 ? pillars : defaultPillars

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200" aria-label="Why Choose DNKV">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeContent direction="up" distance={14} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 rounded-full mb-3">
            Core Strengths
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {heading || 'Why Choose DNKV Chinchgaon?'}
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            {subheading || 'A comprehensive rural institution built on academic rigor, character, and practical skill.'}
          </p>
        </FadeContent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayPillars.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Award
            return (
              <SpotlightCard
                key={pillar.title + idx}
                spotlightColor="rgba(30, 58, 138, 0.12)"
                spotlightSize={280}
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-400">
                  <span>Pillar 0{idx + 1}</span>
                </div>
              </SpotlightCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
