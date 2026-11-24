import React from 'react'
import { Phone, Mail, Clock, Navigation, School } from 'lucide-react'
import { MailboxLink } from '../../components/MailboxLink'
import { LocationLink } from '../../components/location-link'
import { InteractiveMapPreview } from '../../components/InteractiveMapPreview'
import { ContactForm } from '../../components/ContactForm'
import { getSiteSettings, defaultSiteSettings, buildFullAddress } from '../../lib/cms'

export const metadata = {
  title: 'Contact Us | Dr. Netaji Karale Vidyalaya, Chinchgaon',
  description:
    'Get in touch with Dr. Netaji Karale Vidyalaya. Phone helpline, official email, campus visiting hours, and interactive Google Maps location.',
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings()
  const phone = siteSettings?.phone || defaultSiteSettings.phone
  const email = siteSettings?.email || defaultSiteSettings.email
  const officeHours = siteSettings?.officeHours || defaultSiteSettings.officeHours
  const location = siteSettings?.location || defaultSiteSettings.location
  const fullAddress = buildFullAddress(location, siteSettings?.address)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-14 md:py-20 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <School className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Contact Dr. Netaji Karale Vidyalaya
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            We welcome visits, queries, and dialogues from parents, alumni, and community members.
            Reach out via phone, email, or visit our campus.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">School Campus Office</h2>

              <div className="space-y-6">
                {/* Dynamic Clickable Location Link */}
                <LocationLink location={location} siteSettings={siteSettings} variant="card" />

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Helpline & WhatsApp
                    </h3>
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="block text-base font-bold text-slate-900 hover:text-blue-900 font-mono mt-1 min-h-[44px] flex items-center"
                    >
                      {phone}
                    </a>
                    <span className="text-xs text-slate-500">Available during school hours</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Official Email
                    </h3>
                    <MailboxLink
                      email={email}
                      subject="General / School Inquiry - Dr. Netaji Karale Vidyalaya"
                      showCopyButton={true}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-900 mt-1 min-h-[44px]"
                    >
                      <span>{email}</span>
                    </MailboxLink>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Office Hours
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{officeHours}</p>
                    <span className="text-xs text-slate-500">
                      Closed on Sundays and State Gazetted Holidays
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions Aid */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Navigation className="w-4 h-4" />
                <span>Transit & Directions</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The school campus is situated on the Akulgaon-Chinchgaon Road in Madha Taluka.
                Accessible by state transport (MSRTC) buses and local connecting transport from
                Kurduvadi and Madha.
              </p>
            </div>
          </div>

          {/* Quick Message / Feedback Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Interactive Google Map Preview with Lazy Loading */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Campus Location Map</h3>
              <p className="text-xs text-slate-500">{fullAddress}</p>
            </div>
          </div>

          <InteractiveMapPreview
            location={location}
            siteSettings={siteSettings}
            heightClassName="h-96"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
