import React from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, CheckCircle2, Calendar, Clock, MapPin } from 'lucide-react'
import { MailboxLink } from './MailboxLink'
import { LocationLink } from './location-link'
import { InteractiveMapPreview } from './InteractiveMapPreview'
import { getSiteSettings, defaultSiteSettings, type SiteSettings } from '../lib/cms'

interface EnquiryTeaserProps {
  siteSettings?: SiteSettings
}

export async function EnquiryTeaser({ siteSettings: propSiteSettings }: EnquiryTeaserProps) {
  const siteSettings = propSiteSettings || (await getSiteSettings())
  const phone = siteSettings?.phone || defaultSiteSettings.phone
  const email = siteSettings?.email || defaultSiteSettings.email
  const officeHours = siteSettings?.officeHours || defaultSiteSettings.officeHours
  const location = siteSettings?.location || defaultSiteSettings.location

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 relative overflow-hidden" aria-label="Admissions Call to Action">
      {/* Decorative SVG background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-14 shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>Admissions 2026–27 Open</span>
              </span>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Begin Your Child’s Journey to Excellence
              </h2>

              <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
                Admissions are currently underway for Pre-Primary (Nursery, LKG, UKG) through Class X. Give your child the foundation of quality modern education, moral discipline, and dedicated mentorship.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-200 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span>State Board Approved Curriculum</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span>Transparent, Government-Norm Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span>Science Labs & Computer Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span>Dedicated Rural Bus Connectivity</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/admissions/enquiry"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors shadow-lg"
                >
                  <span>Fill Admission Enquiry Form</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/admissions/process"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
                >
                  <span>Admission Procedure</span>
                </Link>
              </div>
            </div>

            {/* Visit our campus & Admissions Office Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xs flex flex-col gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Campus Visit & Desk</span>
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Visit Our Campus</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Parents and guardians are warmly welcomed to visit our campus, inspect classrooms and laboratories, and interact with the admissions counselor.
                </p>
              </div>

              <div className="space-y-3">
                {/* Phone */}
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white min-h-[44px]"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Direct Helpline & WhatsApp</div>
                    <div className="font-mono font-bold text-sm sm:text-base">{phone}</div>
                  </div>
                </a>

                {/* Email */}
                <MailboxLink
                  email={email}
                  subject="Admission Enquiry (2026-27) - Dr. Netaji Karale Vidyalaya"
                  showCopyButton={true}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white min-h-[44px]"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] text-slate-400">Official Admissions Email</div>
                    <div className="font-semibold text-xs sm:text-sm truncate">{email}</div>
                  </div>
                </MailboxLink>

                {/* Office hours */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 text-white min-h-[44px]">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Visiting Hours</div>
                    <div className="font-semibold text-xs sm:text-sm">{officeHours}</div>
                  </div>
                </div>
              </div>

              {/* Clickable Location Link */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Campus Address (Click to open map):
                </div>
                <LocationLink
                  location={location}
                  siteSettings={siteSettings}
                  variant="full"
                  linkClassName="text-slate-200 hover:text-amber-400 text-xs sm:text-sm"
                  directionsClassName="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                />
              </div>

              {/* Static placeholder map preview with 'Load map' button */}
              <InteractiveMapPreview
                location={location}
                siteSettings={siteSettings}
                heightClassName="h-44 sm:h-52"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnquiryTeaser
