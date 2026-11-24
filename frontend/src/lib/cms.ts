const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export interface LocationSettings {
  addressLine1?: string
  addressLine2?: string
  village?: string
  district?: string
  state?: string
  pincode?: string
  plusCode?: string
  latitude?: number
  longitude?: number
  googleMapsUrl?: string
  directionsLabel?: string
}

export interface SiteSettings {
  name: string
  shortName: string
  tagline: string
  phone: string
  alternatePhone?: string
  email: string
  address: string
  location?: LocationSettings
  mapEmbedUrl?: string
  officeHours: string
  socialLinks?: {
    facebook?: string
    youtube?: string
    instagram?: string
    twitter?: string
  }
  parentPortalUrl?: string
  feePaymentUrl?: string
  institutionalFacts?: {
    board?: string
    classesOffered?: string
    mediumOfInstruction?: string
    approxStudentCount?: number
    approxStaffCount?: number
  }
}

export interface NavigationItem {
  label: string
  url: string
  description?: string
  subItems?: { label: string; url: string; description?: string }[]
}

export interface NavigationGlobal {
  utilityBarLinks: { label: string; url: string; icon?: string; openInNewTab?: boolean }[]
  menuItems: NavigationItem[]
  admissionCta: { label: string; url: string }
}

export interface FooterGlobal {
  aboutText: string
  quickLinks: { label: string; url: string }[]
  academicLinks: { label: string; url: string }[]
  portalLinks: { label: string; url: string }[]
  legalLinks: { label: string; url: string }[]
  copyrightText: string
  complianceText: string
}

export interface HomepageGlobal {
  announcementStrip: {
    enabled: boolean
    text: string
    linkUrl?: string
    linkLabel?: string
    startDate?: string
    endDate?: string
  }
  hero: {
    headline: string
    subheadline: string
    videoDesktop?: any
    videoMobile?: any
    posterImage?: any
    primaryButton?: { label: string; url: string }
    secondaryButton?: { label: string; url: string }
  }
  stageCards: {
    enabled: boolean
    sectionTitle: string
    sectionSubtitle: string
    stages: {
      title: string
      grades: string
      description: string
      image?: any
      linkUrl?: string
    }[]
  }
  principalWelcome: {
    enabled: boolean
    heading: string
    principalName: string
    principalDesignation: string
    message: string
    photo?: any
    readMoreLink?: string
  }
  whyDnkv: {
    enabled: boolean
    heading: string
    subheading: string
    pillars: {
      icon: string
      title: string
      description: string
    }[]
  }
  resultsBlock: {
    enabled: boolean
    heading: string
    subheading: string
    stats: {
      value: string
      label: string
    }[]
  }
  sectionVisibility: {
    showAnnouncementStrip: boolean
    showHero: boolean
    showStageCards: boolean
    showPrincipalWelcome: boolean
    showWhyDnkv: boolean
    showNoticesAndNews: boolean
    showFacilitiesStrip: boolean
    showResults: boolean
    showGalleryPreview: boolean
    showEnquiryForm: boolean
  }
}

export interface Notice {
  id: string
  title: string
  date: string
  category: 'admissions' | 'examinations' | 'events' | 'general'
  isPinned?: boolean
  expiryDate?: string
  documentFile?: any
}

export interface NewsItem {
  id: string
  title: string
  date: string
  category: 'academics' | 'sports' | 'cultural' | 'community'
  summary: string
  body?: any
  coverImage?: any
}

export interface Facility {
  id: string
  title: string
  category: 'academic' | 'sports' | 'science_tech' | 'creative' | 'infrastructure'
  description: string
  highlights?: { text: string }[]
  image?: any
  order?: number
}

export interface StaffMember {
  id: string
  name: string
  designation: string
  department: 'leadership' | 'primary' | 'secondary' | 'sports' | 'admin'
  qualification: string
  experienceYears?: number
  bio?: string
  photo?: any
  order?: number
}

export interface ResultDoc {
  id: string
  academicYear: string
  className: string
  passPercentage: number
  totalStudents?: number
  distinctionCount?: number
  toppers?: {
    studentName: string
    percentage: number
    rank?: string
    parentalConsentGiven: boolean
    photo?: any
  }[]
}

export interface GalleryAlbum {
  id: string
  title: string
  date?: string
  category?: string
  description?: string
  coverImage?: any
  photos?: {
    image: any
    caption?: string
  }[]
}

export interface PageDoc {
  id: string
  title: string
  slug: string
  subtitle?: string
  bannerImage?: any
  layout?: any[]
  meta?: {
    title?: string
    description?: string
  }
}

// Fetchers
export async function fetchCmsGlobal<T>(slug: string, locale: string = 'en'): Promise<T | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/globals/${slug}?locale=${locale}&depth=2`, {
      next: { tags: [slug], revalidate: 60 },
    })
    if (!res.ok) {
      console.warn(`[CMS] Failed to fetch global "${slug}": ${res.statusText}`)
      return null
    }
    return (await res.json()) as T
  } catch (error) {
    console.warn(
      `[CMS] Global fetch error for "${slug}":`,
      error instanceof Error ? error.message : error,
    )
    return null
  }
}

export async function getSiteSettings(locale: string = 'en'): Promise<SiteSettings> {
  const settings = await fetchCmsGlobal<SiteSettings>('site-settings', locale)
  return settings || defaultSiteSettings
}

export function buildFullAddress(loc?: LocationSettings, fallbackAddress?: string): string {
  if (!loc) return fallbackAddress || defaultSiteSettings.address
  const parts = [
    loc.addressLine1,
    loc.addressLine2,
    loc.village,
    loc.district ? `Dist. ${loc.district}` : undefined,
    loc.state,
    loc.pincode,
  ].filter(Boolean)
  if (parts.length > 0) {
    return parts.join(', ')
  }
  return fallbackAddress || defaultSiteSettings.address
}

export function buildMapUrl(loc?: LocationSettings, fallbackAddress?: string): string {
  if (loc?.googleMapsUrl && loc.googleMapsUrl.trim().length > 0) {
    return loc.googleMapsUrl.trim()
  }
  if (
    typeof loc?.latitude === 'number' &&
    typeof loc?.longitude === 'number' &&
    !isNaN(loc.latitude) &&
    !isNaN(loc.longitude)
  ) {
    return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`
  }
  const address = buildFullAddress(loc, fallbackAddress)
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

export function buildDirectionsUrl(loc?: LocationSettings, fallbackAddress?: string): string {
  if (
    typeof loc?.latitude === 'number' &&
    typeof loc?.longitude === 'number' &&
    !isNaN(loc.latitude) &&
    !isNaN(loc.longitude)
  ) {
    return `https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`
  }
  const address = buildFullAddress(loc, fallbackAddress)
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
}

export function buildEmbedMapUrl(loc?: LocationSettings, fallbackAddress?: string): string {
  if (
    typeof loc?.latitude === 'number' &&
    typeof loc?.longitude === 'number' &&
    !isNaN(loc.latitude) &&
    !isNaN(loc.longitude)
  ) {
    return `https://maps.google.com/maps?q=${loc.latitude},${loc.longitude}+(Dr.+Netaji+Karale+Vidyalaya)&t=&z=15&ie=UTF8&iwloc=&output=embed`
  }
  const address = buildFullAddress(loc, fallbackAddress)
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
}

export async function fetchCmsCollection<T>(
  slug: string,
  query: Record<string, any> = {},
  locale: string = 'en',
): Promise<{ docs: T[]; totalDocs: number }> {
  try {
    const params = new URLSearchParams({
      locale,
      depth: '2',
      ...query,
    })
    const res = await fetch(`${BACKEND_URL}/api/${slug}?${params.toString()}`, {
      next: { tags: [slug], revalidate: 60 },
    })
    if (!res.ok) {
      return { docs: [], totalDocs: 0 }
    }
    return await res.json()
  } catch {
    return { docs: [], totalDocs: 0 }
  }
}

export async function fetchPageBySlug(
  slug: string,
  locale: string = 'en',
): Promise<PageDoc | null> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&locale=${locale}&depth=2`,
      {
        next: { tags: [`pages_${slug}`], revalidate: 60 },
      },
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.docs?.[0] || null
  } catch {
    return null
  }
}

// Default Fallbacks
export const defaultSiteSettings: SiteSettings = {
  name: 'Dr. Netaji Karale Vidyalaya',
  shortName: 'DNKV',
  tagline: 'Empowering Students for the Future.',
  phone: '+91-9545541454',
  alternatePhone: '+91-9545541454',
  email: 'dnkvchinchgaon@gmail.com',
  address: 'Chinchgaon, Akulgaon, Taluka Madha, District Solapur, Maharashtra 413208',
  location: {
    addressLine1: 'Dr. Netaji Karale Vidyalaya',
    addressLine2: 'Near Gram Panchayat',
    village: 'Chinchgaon, Akulgaon',
    district: 'Solapur',
    state: 'Maharashtra',
    pincode: '413208',
    plusCode: '4F62+JQG',
    latitude: 18.1115625,
    longitude: 75.4519531,
    googleMapsUrl: 'https://maps.app.goo.gl/Z3q8GQmmLvNtbSeL6',
    directionsLabel: 'Get directions',
  },
  officeHours: 'Monday – Saturday: 9:00 AM – 4:30 PM',
  parentPortalUrl: '#portal',
  feePaymentUrl: '#fees',
  institutionalFacts: {
    board: 'Maharashtra State Board of Secondary Education (Pune) [TODO: Confirm]',
    classesOffered: 'Nursery to Class X [TODO: Confirm]',
    mediumOfInstruction: 'Semi-English & Marathi Medium [TODO: Confirm]',
    approxStudentCount: 1000,
    approxStaffCount: 50,
  },
}

export const defaultNavigation: NavigationGlobal = {
  utilityBarLinks: [
    { label: 'Admissions 2026', url: '/admissions/process', icon: 'graduation' },
    { label: 'Contact Us', url: '/contact', icon: 'phone' },
    { label: 'Staff Admin', url: '/admin', icon: 'user' },
  ],
  menuItems: [
    {
      label: 'About',
      url: '/about/school-story',
      subItems: [
        {
          label: 'School Story',
          url: '/about/school-story',
          description: 'Founding vision, history, and legacy',
        },
        {
          label: "Principal's Desk",
          url: '/about/principals-desk',
          description: 'Message and perspective from our Principal',
        },
        {
          label: "President's Desk",
          url: '/about/presidents-desk',
          description: 'Governing board vision and guidance',
        },
        {
          label: "Vice Principal's Desk",
          url: '/about/vice-principals-desk',
          description: 'Academic leadership and mentoring',
        },
        {
          label: "Vice President's Desk",
          url: '/about/vice-presidents-desk',
          description: 'Institutional governance and support',
        },
        {
          label: 'Recognition & Affiliation',
          url: '/about/recognition',
          description: 'Government approvals and school code',
        },
      ],
    },
    {
      label: 'Academics',
      url: '/academics',
      subItems: [
        {
          label: 'Curriculum & Approach',
          url: '/academics/curriculum',
          description: 'Nursery to Class X syllabus & pedagogy',
        },
        {
          label: 'Academic Calendar',
          url: '/academics/calendar',
          description: 'Term dates, exams, and holidays',
        },
        {
          label: 'Board Examination Results',
          url: '/academics/results',
          description: 'SSC Class X pass rate and toppers',
        },
      ],
    },
    {
      label: 'Facilities',
      url: '/facilities',
      subItems: [
        {
          label: 'Campus Overview',
          url: '/facilities',
          description: 'Labs, classrooms, grounds, and library',
        },
      ],
    },
    {
      label: 'Student Life',
      url: '/student-life/activities',
      subItems: [
        {
          label: 'Co-Curriculars',
          url: '/student-life/activities',
          description: 'Debates, music, drama, science club',
        },
        {
          label: 'Clubs & Societies',
          url: '/student-life/clubs',
          description: 'Eco-club, Scout & Guide, reading',
        },
        {
          label: 'Annual Events',
          url: '/student-life/events',
          description: 'Sports day, gathering, celebrations',
        },
      ],
    },
    {
      label: 'Admissions',
      url: '/admissions/process',
      subItems: [
        {
          label: 'Admission Procedure',
          url: '/admissions/process',
          description: 'Step-by-step 2026-27 admission guide',
        },
        {
          label: 'Fee Structure',
          url: '/admissions/fees',
          description: 'Approved fee slabs and schedule',
        },
        {
          label: 'Required Documents',
          url: '/admissions/documents',
          description: 'Certificates and transfer paperwork',
        },
        {
          label: 'Online Enquiry Form',
          url: '/admissions/enquiry',
          description: 'Apply or inquire online today',
        },
      ],
    },
    { label: 'News & Notices', url: '/news-and-notices' },
    { label: 'Gallery', url: '/gallery' },
    { label: 'Contact', url: '/contact' },
  ],
  admissionCta: {
    label: 'Admissions 2026-27',
    url: '/admissions/enquiry',
  },
}

export const defaultFooter: FooterGlobal = {
  aboutText:
    'Dr. Netaji Karale Vidyalaya, Chinchgaon, is committed to holistic, value-based rural education empowering young minds with modern curriculum, disciplined character, and community spirit.',
  quickLinks: [
    { label: 'School Story', url: '/about/school-story' },
    { label: "Principal's Desk", url: '/about/principals-desk' },
    { label: 'Curriculum', url: '/academics/curriculum' },
    { label: 'Facilities', url: '/facilities' },
    { label: 'Admissions 2026-27', url: '/admissions/process' },
    { label: 'Photo Gallery', url: '/gallery' },
  ],
  academicLinks: [
    { label: 'Academic Calendar', url: '/academics/calendar' },
    { label: 'SSC Board Results', url: '/academics/results' },
    { label: 'Student Life', url: '/student-life/activities' },
    { label: 'Official Notices', url: '/news-and-notices' },
  ],
  portalLinks: [
    { label: 'Admission Enquiry', url: '/admissions/enquiry' },
    { label: 'Staff Admin Login', url: '/admin' },
    { label: 'Campus Visit & Contact', url: '/contact' },
  ],
  legalLinks: [
    { label: 'Privacy Policy (DPDP Act)', url: '/privacy-policy' },
    { label: 'Terms of Use', url: '/terms' },
    { label: 'Sitemap', url: '/sitemap.xml' },
  ],
  copyrightText: '© 2026 Dr. Netaji Karale Vidyalaya (DNKV), Chinchgaon. All rights reserved.',
  complianceText:
    'India DPDP Act 2023 compliant. Minor student names and photographs published strictly with recorded parental consent.',
}

export const defaultHomepage: HomepageGlobal = {
  announcementStrip: {
    enabled: true,
    text: 'Admissions open for Academic Year 2026–27 (Nursery through Class X) — Enroll your child today.',
    linkUrl: '/admissions/enquiry',
    linkLabel: 'Apply Online',
  },
  hero: {
    headline: 'Empowering Students for the Future',
    subheadline:
      'Dr. Netaji Karale Vidyalaya, Chinchgaon — Quality Education, Strong Values, and Holistic Development in Rural Maharashtra.',
    primaryButton: { label: 'Admissions 2026–27', url: '/admissions/process' },
    secondaryButton: { label: 'Explore Campus', url: '/facilities' },
  },
  stageCards: {
    enabled: true,
    sectionTitle: 'Our Academic Stages',
    sectionSubtitle: 'Nurturing curiosity, foundational skills, and board exam success',
    stages: [
      {
        title: 'Pre-Primary Foundation',
        grades: 'Nursery – UKG',
        description:
          'Play-way learning developing curiosity, phonics, motor skills, and joyful habits.',
        linkUrl: '/academics/curriculum',
      },
      {
        title: 'Primary Schooling',
        grades: 'Classes 1 – 5',
        description:
          'Strong mathematical thinking, bilingual language fluency, and creative development.',
        linkUrl: '/academics/curriculum',
      },
      {
        title: 'Middle School',
        grades: 'Classes 6 – 8',
        description:
          'Scientific reasoning, hands-on lab experiments, computer education, and sports.',
        linkUrl: '/academics/curriculum',
      },
      {
        title: 'Secondary SSC Preparation',
        grades: 'Classes 9 & 10',
        description:
          'Rigorous board syllabus coaching, periodic test series, and dedicated teacher mentoring.',
        linkUrl: '/academics/curriculum',
      },
    ],
  },
  principalWelcome: {
    enabled: true,
    heading: "Welcome from the Principal's Desk",
    principalName: 'Shri. [Principal Name - TODO: Confirm]',
    principalDesignation: 'Principal, Dr. Netaji Karale Vidyalaya',
    message:
      'Welcome to Dr. Netaji Karale Vidyalaya. We believe every rural student possesses immense talent waiting to be nurtured with quality mentorship, modern scientific thinking, and enduring moral values. Our dedicated faculty work tirelessly to build both character and academic competence.',
    readMoreLink: '/about/principals-desk',
  },
  whyDnkv: {
    enabled: true,
    heading: 'Why Choose DNKV Chinchgaon?',
    subheading: 'An inspiring rural campus built for comprehensive excellence',
    pillars: [
      {
        icon: 'award',
        title: 'Academic Board Excellence',
        description:
          'Consistent top rankings and high pass percentages in Maharashtra State Board examinations.',
      },
      {
        icon: 'flask-conical',
        title: 'Science & Computer Labs',
        description:
          'Well-equipped laboratories providing practical experiments and digital literacy from early grades.',
      },
      {
        icon: 'trophy',
        title: 'Sports & Athletic Grounds',
        description:
          'Large grounds for Kho-Kho, Kabaddi, Volleyball, and athletics with professional coaching.',
      },
      {
        icon: 'heart-handshake',
        title: 'Values & Character Building',
        description:
          'Holistic character development rooted in respect, discipline, and community leadership.',
      },
    ],
  },
  resultsBlock: {
    enabled: true,
    heading: 'Proven Track Record of Excellence',
    subheading: 'Our students excel in board examinations, sports, and science exhibitions',
    stats: [
      { value: '100%', label: 'SSC Exam Pass Rate [TODO: Confirm]' },
      { value: '1000+', label: 'Students Enrolled' },
      { value: '50+', label: 'Qualified Educators' },
      { value: '25+', label: 'Years of Educational Trust [TODO: Confirm]' },
    ],
  },
  sectionVisibility: {
    showAnnouncementStrip: true,
    showHero: true,
    showStageCards: true,
    showPrincipalWelcome: true,
    showWhyDnkv: true,
    showNoticesAndNews: true,
    showFacilitiesStrip: true,
    showResults: true,
    showGalleryPreview: true,
    showEnquiryForm: true,
  },
}

// Fallback collections
export const fallbackNotices: Notice[] = [
  {
    id: 'n-1',
    title: 'Admissions Open for Academic Year 2026-27 (Nursery to Class 10)',
    date: '2026-03-01',
    category: 'admissions',
    isPinned: true,
    expiryDate: '2026-08-31',
  },
  {
    id: 'n-2',
    title: 'Schedule for SSC Board Preliminary Examinations 2026',
    date: '2026-02-20',
    category: 'examinations',
    isPinned: false,
    expiryDate: '2026-04-15',
  },
  {
    id: 'n-3',
    title: 'Annual Sports Meet & Inter-House Athletics Tournament Announced',
    date: '2026-02-10',
    category: 'events',
    isPinned: false,
    expiryDate: '2026-03-31',
  },
]

export const fallbackNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'DNKV Students Win Top Honors at Taluka Science & Innovation Exhibition',
    date: '2026-02-25',
    category: 'academics',
    summary:
      'Student projects on drip irrigation automation and solar grain drying secured 1st place in the rural science category.',
  },
  {
    id: 'news-2',
    title: "Annual Cultural Gathering 'Udaan 2026' Celebrates Rural Heritage and Talent",
    date: '2026-02-18',
    category: 'cultural',
    summary:
      'Over 600 students performed traditional Marathi folk dances, patriotic plays, and musical presentations before a community audience of 2000.',
  },
  {
    id: 'news-3',
    title: 'Green Campus Initiative: 500 Saplings Planted by Eco-Club Volunteers',
    date: '2026-02-05',
    category: 'community',
    summary:
      'Students, teachers, and village elders collaborated in planting indigenous trees around the school playground perimeter.',
  },
]

export const fallbackFacilities: Facility[] = [
  {
    id: 'fac-1',
    title: 'Smart Classrooms & Digital Learning',
    category: 'academic',
    description:
      'Interactive displays, audio-visual educational modules, and multimedia content bringing complex concepts to life in Marathi and English.',
    highlights: [
      { text: 'Interactive digital displays' },
      { text: 'Bilingual digital modules' },
      { text: 'Well-ventilated learning spaces' },
    ],
  },
  {
    id: 'fac-2',
    title: 'Science & Computer Laboratories',
    category: 'science_tech',
    description:
      'Dedicated Physics, Chemistry, Biology labs with safety equipment, alongside a 40-workstation modern computer laboratory with internet access.',
    highlights: [
      { text: 'Dedicated Physics, Chemistry & Biology kits' },
      { text: '40 modern PC workstations' },
      { text: 'High-speed internet' },
    ],
  },
  {
    id: 'fac-3',
    title: 'Athletic Ground & Multi-Sports Arena',
    category: 'sports',
    description:
      'Expansive sports grounds supporting Kho-Kho, Kabaddi, Volleyball, Badminton, and athletic track events coached by qualified physical directors.',
    highlights: [
      { text: 'Kho-Kho & Kabaddi clay courts' },
      { text: 'Volleyball court' },
      { text: 'Annual district tournament venue' },
    ],
  },
  {
    id: 'fac-4',
    title: 'Central Library & Reading Hall',
    category: 'academic',
    description:
      'Vast collection of over 5,000 Marathi, Hindi, and English textbooks, reference guides, encyclopedias, competitive exam materials, and daily newspapers.',
    highlights: [
      { text: '5000+ curated volumes' },
      { text: 'Devanagari literature collection' },
      { text: 'Competitive exam prep corner' },
    ],
  },
  {
    id: 'fac-5',
    title: 'Safe Campus, RO Drinking Water & Transport',
    category: 'infrastructure',
    description:
      'Secure walled campus with CCTV surveillance, commercial reverse osmosis (RO) purified drinking water plants, clean sanitation blocks, and rural bus connectivity.',
    highlights: [
      { text: 'Multi-stage RO drinking water' },
      { text: '24x7 CCTV coverage' },
      { text: 'Dedicated student transportation' },
    ],
  },
]

export const fallbackResults: ResultDoc = {
  id: 'res-1',
  academicYear: '2024-2025',
  className: 'Class X (SSC)',
  passPercentage: 99.2,
  totalStudents: 120,
  distinctionCount: 48,
  toppers: [
    {
      studentName: 'Student Merit Achiever 1 [TODO: Confirm Name]',
      percentage: 96.4,
      rank: 'School 1st Rank',
      parentalConsentGiven: true,
    },
    {
      studentName: 'Student Merit Achiever 2 [TODO: Confirm Name]',
      percentage: 95.2,
      rank: 'School 2nd Rank',
      parentalConsentGiven: true,
    },
    {
      studentName: 'Student Merit Achiever 3 [TODO: Confirm Name]',
      percentage: 94.6,
      rank: 'School 3rd Rank',
      parentalConsentGiven: true,
    },
  ],
}
