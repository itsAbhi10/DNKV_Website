import React from 'react'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'

interface PrincipalWelcomeProps {
  heading?: string
  principalName?: string
  principalDesignation?: string
  message?: string
  readMoreLink?: string
}

export function PrincipalWelcome({
  heading,
  principalName,
  principalDesignation,
  message,
  readMoreLink,
}: PrincipalWelcomeProps) {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200" aria-label="Principal Welcome">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Principal Image / Portrait Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background decorative frame */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-900 to-amber-500 opacity-15 blur-lg"></div>
              
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border-4 border-white aspect-[4/5] flex flex-col justify-end p-8 text-white">
                {/* Fallback portrait background pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-blue-950">
                  <div className="text-center p-6">
                    <div className="w-28 h-28 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 text-3xl font-bold mb-4 shadow-inner">
                      DNKV
                    </div>
                    <span className="text-xs uppercase tracking-widest text-slate-300 font-medium">Leadership & Mentorship</span>
                  </div>
                </div>

                {/* Identity Tag at bottom */}
                <div className="relative z-20">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded uppercase tracking-wider mb-2">
                    School Leadership
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {principalName || 'Shri. [Principal Name - TODO: Confirm]'}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    {principalDesignation || 'Principal, Dr. Netaji Karale Vidyalaya'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Text Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 mb-4">
              <Quote className="w-3.5 h-3.5 text-amber-600" />
              <span>Leadership Perspective</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              {heading || "Welcome from the Principal's Desk"}
            </h2>

            <div className="relative pl-6 border-l-4 border-amber-500 mb-8 italic text-slate-700 text-lg md:text-xl font-serif leading-relaxed">
              &ldquo;Education in rural Maharashtra is not merely the transmission of textbook facts; it is the ignition of ambition, self-belief, and moral fortitude.&rdquo;
            </div>

            <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
              {message ||
                'Welcome to Dr. Netaji Karale Vidyalaya, Chinchgaon. We believe that every child from our rural community possesses immense brilliance waiting to be unlocked. With rigorous academic coaching, practical science laboratory training, computer education, and traditional sports, our teachers dedicate their lives to ensuring our students can stand shoulder-to-shoulder with any youth in the country.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={readMoreLink || '/about/principals-desk'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 text-white font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
              >
                Read Full Message
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>

              <Link
                href="/about/school-story"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-colors"
              >
                Our Founding Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
