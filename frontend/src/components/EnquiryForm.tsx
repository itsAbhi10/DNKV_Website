'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { CheckCircle2, AlertCircle, ShieldCheck, Send } from 'lucide-react'
import { submitEnquiry, type EnquiryActionState } from '../app/actions/enquiry'

const initialState: EnquiryActionState = {
  success: false,
  message: '',
}

export function EnquiryForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiry, initialState)

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-md">
      {state.success ? (
        <div className="py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Enquiry Registered Successfully!
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto mb-8 text-base leading-relaxed">
            {state.message}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-blue-900 text-white font-semibold text-sm hover:bg-blue-800 transition-colors"
            >
              Return to Homepage
            </Link>
            <Link
              href="/admissions/process"
              className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors"
            >
              Review Admission Steps
            </Link>
          </div>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Student & Guardian Details</h2>
            <p className="text-sm text-slate-500 mb-6">
              Fields marked with <span className="text-red-500 font-bold">*</span> are required.
            </p>
          </div>

          {/* Top error message */}
          {!state.success && state.message && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Honeypot field (hidden from real users to catch bot spam) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="honeypot">Leave blank</label>
            <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Student Name */}
            <div>
              <label
                htmlFor="studentName"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Student Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                required
                placeholder="e.g., Aarav Rahul Patil"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm"
              />
              {state.errors?.studentName && (
                <p className="text-xs text-red-600 mt-1">{state.errors.studentName[0]}</p>
              )}
            </div>

            {/* Parent Name */}
            <div>
              <label
                htmlFor="parentName"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Parent / Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                placeholder="e.g., Rahul S. Patil"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm"
              />
              {state.errors?.parentName && (
                <p className="text-xs text-red-600 mt-1">{state.errors.parentName[0]}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Mobile Number (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                maxLength={10}
                placeholder="10-digit mobile, e.g. 9545541454"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm font-mono"
              />
              {state.errors?.phone && (
                <p className="text-xs text-red-600 mt-1">{state.errors.phone[0]}</p>
              )}
            </div>

            {/* Email (Optional) */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="parent@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm"
              />
              {state.errors?.email && (
                <p className="text-xs text-red-600 mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            {/* Class Applying For */}
            <div>
              <label
                htmlFor="applyingForClass"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Class Applying For <span className="text-red-500">*</span>
              </label>
              <select
                id="applyingForClass"
                name="applyingForClass"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm bg-white"
              >
                <option value="" disabled>
                  Select Class...
                </option>
                <option value="Nursery">Nursery</option>
                <option value="LKG">Junior KG (LKG)</option>
                <option value="UKG">Senior KG (UKG)</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10 (SSC)</option>
              </select>
              {state.errors?.applyingForClass && (
                <p className="text-xs text-red-600 mt-1">{state.errors.applyingForClass[0]}</p>
              )}
            </div>

            {/* Village / Town */}
            <div>
              <label
                htmlFor="villageOrTown"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Residential Village / Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="villageOrTown"
                name="villageOrTown"
                required
                placeholder="e.g., Chinchgaon / Akulgaon / Madha"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm"
              />
              {state.errors?.villageOrTown && (
                <p className="text-xs text-red-600 mt-1">{state.errors.villageOrTown[0]}</p>
              )}
            </div>
          </div>

          {/* Previous School */}
          <div>
            <label
              htmlFor="previousSchool"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Previous School Attended (If Applicable)
            </label>
            <input
              type="text"
              id="previousSchool"
              name="previousSchool"
              placeholder="Name of previous school and location"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm"
            />
          </div>

          {/* Any Message / Question */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Any Questions or Comments?
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="e.g. Inquiring regarding school bus route from our village..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm"
            />
          </div>

          {/* DPDP Consent */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>DPDP Act 2023 Compliance:</strong> By submitting this form, you authorize Dr.
              Netaji Karale Vidyalaya to contact you regarding admission formalities. Your
              information is securely kept and never shared.
            </span>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 px-6 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-base transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <span>Submitting Enquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Admission Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

export default EnquiryForm
