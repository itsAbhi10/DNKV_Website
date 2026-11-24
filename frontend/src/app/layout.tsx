import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import { UtilityBar } from '../components/UtilityBar'
import { AnnouncementStrip } from '../components/AnnouncementStrip'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import {
  fetchCmsGlobal,
  defaultSiteSettings,
  defaultNavigation,
  defaultFooter,
  defaultHomepage,
  type SiteSettings,
  type NavigationGlobal,
  type FooterGlobal,
  type HomepageGlobal,
} from '../lib/cms'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-marathi',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b2545',
}

export const metadata: Metadata = {
  title: {
    default: 'Dr. Netaji Karale Vidyalaya | Chinchgaon, Akulgaon',
    template: '%s | Dr. Netaji Karale Vidyalaya',
  },
  description:
    'Official website of Dr. Netaji Karale Vidyalaya (DNKV), Chinchgaon, Akulgaon, Maharashtra. Quality schooling from Nursery to Class X with modern laboratories, sports grounds, and values-centered education.',
  keywords: [
    'Dr. Netaji Karale Vidyalaya',
    'DNKV Chinchgaon',
    'DNKV Akulgaon',
    'Schools in Madha Solapur',
    'Maharashtra State Board School Solapur',
    'Best School Chinchgaon',
    'Dr Netaji Karale School',
  ],
  authors: [{ name: 'Dr. Netaji Karale Vidyalaya' }],
  openGraph: {
    title: 'Dr. Netaji Karale Vidyalaya (DNKV), Chinchgaon',
    description:
      'Empowering Students for the Future. Providing holistic rural education in Solapur, Maharashtra.',
    siteName: 'Dr. Netaji Karale Vidyalaya',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch CMS Globals (with resilient fallback to defaults)
  const [siteSettings, navigation, footer, homepage] = await Promise.all([
    fetchCmsGlobal<SiteSettings>('site-settings').then((res) => res || defaultSiteSettings),
    fetchCmsGlobal<NavigationGlobal>('navigation').then((res) => res || defaultNavigation),
    fetchCmsGlobal<FooterGlobal>('footer').then((res) => res || defaultFooter),
    fetchCmsGlobal<HomepageGlobal>('homepage').then((res) => res || defaultHomepage),
  ])

  // Schema.org EducationalOrganization structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteSettings.name,
    alternateName: siteSettings.shortName,
    url: 'https://www.dnkv.in',
    telephone: siteSettings.phone,
    email: siteSettings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        siteSettings.location?.addressLine1 ||
        siteSettings.location?.village ||
        'Dr. Netaji Karale Vidyalaya',
      addressLocality: `${siteSettings.location?.village || 'Chinchgaon, Akulgaon'}, ${siteSettings.location?.district || 'Solapur'}`,
      addressRegion: siteSettings.location?.state || 'Maharashtra',
      postalCode: siteSettings.location?.pincode || '413208',
      addressCountry: 'IN',
    },
    slogan: siteSettings.tagline,
  }

  return (
    <html lang="en" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-950">
        <UtilityBar phone={siteSettings.phone} />
        <AnnouncementStrip announcement={homepage.announcementStrip} />
        <Header navigation={navigation} siteSettings={siteSettings} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer footer={footer} siteSettings={siteSettings} />
      </body>
    </html>
  )
}
