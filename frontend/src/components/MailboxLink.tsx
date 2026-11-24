'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface MailboxLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  email?: string
  subject?: string
  body?: string
  children: React.ReactNode
  className?: string
  showCopyButton?: boolean
}

/**
 * MailboxLink Component
 * Ensures clicking the email address reliably redirects to a mailbox on all devices:
 * - On desktop: Opens Gmail Web Compose in a new tab (bypassing dead mailto: handlers on Windows/Chrome when Outlook is not installed).
 * - On mobile: Invokes native mailto: to open the device's default mail app (Gmail, Apple Mail).
 * - Includes optional one-click copy with visual feedback.
 */
export function MailboxLink({
  email = 'dnkvchinchgaon@gmail.com',
  subject = 'Admission Enquiry - Dr. Netaji Karale Vidyalaya',
  body = 'Hello DNKV Admissions Team,\n\nI would like to enquire about admission for my child.\n\nStudent Name:\nGrade Applying For:\nParent Contact Number:\n',
  children,
  className = '',
  showCopyButton = false,
  ...props
}: MailboxLinkProps) {
  const [copied, setCopied] = useState(false)

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const webmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Detect mobile touch devices (phones/tablets open native Mail/Gmail app with mailto:)
    const isMobileDevice =
      typeof window !== 'undefined' &&
      (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        window.matchMedia('(pointer: coarse)').matches)

    if (isMobileDevice) {
      // Let standard mailto handler open the native mail app
      window.location.href = mailtoUrl
      return
    }

    // On desktop browsers:
    // Windows/macOS desktop browsers often fail on bare mailto: when no default desktop client is configured.
    // Opening webmail (Gmail compose) ensures the mailbox actually opens reliably in a new tab.
    e.preventDefault()

    // Open webmail compose in new tab
    const newWindow = window.open(webmailUrl, '_blank', 'noopener,noreferrer')

    // Also trigger mailto as a secondary protocol fallback if popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = mailtoUrl
    }
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <a
      href={mailtoUrl}
      onClick={handleClick}
      title={`Open mailbox to email ${email}`}
      className={`group/mail relative cursor-pointer ${className}`}
      {...props}
    >
      {children}
      {showCopyButton && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Email copied' : 'Copy email address'}
          className="ml-auto p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1 shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <Copy className="w-3.5 h-3.5 opacity-60 group-hover/mail:opacity-100" />
          )}
        </button>
      )}
    </a>
  )
}
