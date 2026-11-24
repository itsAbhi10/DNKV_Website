import React from 'react'
import Link from 'next/link'
import { GraduationCap, Phone, Mail, Clock } from 'lucide-react'
import { MailboxLink } from '../../../components/MailboxLink'
import { LocationLink } from '../../../components/location-link'
import { InteractiveMapPreview } from '../../../components/InteractiveMapPreview'
import { EnquiryForm } from '../../../components/EnquiryForm'
import { getSiteSettings, defaultSiteSettings } from '../../../lib/cms'

export const metadata = {
  title: 'Online Admission Enquiry 2026–27 | Dr. Netaji Karale Vidyalaya',
  description:
    'Register your interest for Pre-Primary through Class X at Dr. Netaji Karale Vidyalaya, Chinchgaon. Campus tours, admissions helpline, and transparent process.',
}

export default async function AdmissionEnquiryPage() {
  const siteSettings = await getSiteSettings()
  const phone = siteSettings?.phone || defaultSiteSettings.phone
  const email = siteSettings?.email || defaultSiteSettings.email
  const officeHours = siteSettings?.officeHours || defaultSiteSettings.officeHours
  const location = siteSettings?.location || defaultSiteSettings.location

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-14 md:py-20 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Admissions 2026–27</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Online Admission Enquiry Form
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            Register your interest for Pre-Primary through Class X. Our admissions office will get
            in touch to schedule a personal interaction and campus tour.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>

          {/* Sidebar: Visit Our Campus & Helpline (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Visit Our Campus & Admissions Desk
              </h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Parents are warmly encouraged to visit the campus during office hours or connect
                with our counselor directly.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-900 min-h-[44px]"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Phone & WhatsApp</div>
                    <div className="font-mono font-bold text-slate-900 text-sm">{phone}</div>
                  </div>
                </a>

                {/* Email */}
                <MailboxLink
                  email={email}
                  subject="Admission Enquiry - Dr. Netaji Karale Vidyalaya"
                  showCopyButton={true}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors min-h-[44px]"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] text-slate-500 font-medium">
                      Email (Click to open mailbox)
                    </div>
                    <div className="font-semibold text-slate-900 text-xs truncate">{email}</div>
                  </div>
                </MailboxLink>

                {/* Office hours */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 min-h-[44px]">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Office Working Hours
                    </div>
                    <div className="font-semibold text-slate-900 text-xs">{officeHours}</div>
                  </div>
                </div>

                {/* Campus Location Link */}
                <LocationLink location={location} siteSettings={siteSettings} variant="card" />

                {/* Static Placeholder Map Preview with 'Load map' button */}
                <InteractiveMapPreview
                  location={location}
                  siteSettings={siteSettings}
                  heightClassName="h-44 sm:h-48"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8">
              <h4 className="font-bold text-base mb-3 text-amber-400">Helpful Resources</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/admissions/process"
                    className="text-slate-300 hover:text-white flex items-center justify-between py-1.5 border-b border-slate-800"
                  >
                    <span>Admission Step-by-Step Procedure</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admissions/fees"
                    className="text-slate-300 hover:text-white flex items-center justify-between py-1.5 border-b border-slate-800"
                  >
                    <span>Fee Structure & Payment Schedule</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admissions/documents"
                    className="text-slate-300 hover:text-white flex items-center justify-between py-1.5"
                  >
                    <span>Required Verification Documents</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
