import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

async function runSeed() {
  console.log('🌱 Starting DNKV Comprehensive Seed Script...')
  const payload = await getPayload({ config })

  // 1. Seed Users (Admin & Editor)
  console.log('👤 Seeding Users (Admin & Editor)...')
  const usersToSeed = [
    {
      email: 'admin@dnkv.in',
      password: 'Admin@DNKV2026!',
      role: 'admin' as const,
      name: 'System Administrator (DNKV)',
    },
    {
      email: 'editor@dnkv.in',
      password: 'Editor@DNKV2026!',
      role: 'editor' as const,
      name: 'Staff Content Editor (DNKV)',
    },
  ]

  for (const user of usersToSeed) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: user.email } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: user,
      })
      console.log(`  ✓ Created user: ${user.email} (${user.role})`)
    } else {
      console.log(`  - User already exists: ${user.email}`)
    }
  }

  // 2. Seed Redirects (Migrating legacy misspelled URLs)
  console.log('🔀 Seeding 301 Legacy Redirects...')
  const legacyRedirects = [
    { fromPath: '/principle_desk', toPath: '/about/principals-desk', statusCode: '301' as const },
    { fromPath: '/acadmics', toPath: '/academics', statusCode: '301' as const },
    { fromPath: '/gallary', toPath: '/gallery', statusCode: '301' as const },
    { fromPath: '/contact_us', toPath: '/contact', statusCode: '301' as const },
    { fromPath: '/admission', toPath: '/admissions/process', statusCode: '301' as const },
  ]

  for (const redir of legacyRedirects) {
    const existing = await payload.find({
      collection: 'redirects',
      where: { fromPath: { equals: redir.fromPath } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'redirects',
        data: redir,
      })
      console.log(`  ✓ Created redirect: ${redir.fromPath} -> ${redir.toPath}`)
    }
  }

  // 3. Seed Site Settings Global
  console.log('⚙️  Seeding SiteSettings Global...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
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
      mapEmbedUrl:
        'https://maps.google.com/maps?q=18.1115625,75.4519531+(Dr.+Netaji+Karale+Vidyalaya)&t=&z=15&ie=UTF8&iwloc=&output=embed',
      officeHours: 'Monday – Saturday: 9:00 AM – 4:30 PM (Closed on Sundays & Gazetted Holidays)',
      socialLinks: {
        facebook: 'https://facebook.com/dnkvchinchgaon [TODO: Confirm official page]',
        youtube: 'https://youtube.com/@dnkvchinchgaon [TODO: Confirm official channel]',
        instagram: 'https://instagram.com/dnkvchinchgaon [TODO: Confirm official profile]',
        twitter: 'https://twitter.com/dnkvchinchgaon [TODO: Confirm official handle]',
      },
      parentPortalUrl: '#portal [TODO: Provide Student Portal Link]',
      feePaymentUrl: '#fees [TODO: Provide Bank Payment Gateway Link]',
      institutionalFacts: {
        board:
          'Maharashtra State Board of Secondary and Higher Secondary Education (Pune) [TODO: Confirm CBSE / State Board]',
        classesOffered:
          'Nursery to Class X (Pre-Primary, Primary, Secondary) [TODO: Confirm Classes]',
        mediumOfInstruction:
          'Semi-English & Marathi Medium [TODO: Confirm English / Semi-English / Marathi]',
        approxStudentCount: 1000,
        approxStaffCount: 50,
      },
    },
  })
  console.log('  ✓ Updated SiteSettings')

  // 4. Seed Navigation Global
  console.log('🧭 Seeding Navigation Global...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
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
              label: 'School Story & Heritage',
              url: '/about/school-story',
              description: 'Our founding vision, philosophy, and history',
            },
            {
              label: "Principal's Desk",
              url: '/about/principals-desk',
              description: 'Message and vision from the school principal',
            },
            {
              label: "President's Desk",
              url: '/about/presidents-desk',
              description: 'Address from the management board president',
            },
            {
              label: "Vice Principal's Desk",
              url: '/about/vice-principals-desk',
              description: 'Academic leadership statement',
            },
            {
              label: "Vice President's Desk",
              url: '/about/vice-presidents-desk',
              description: 'Management governance note',
            },
            {
              label: 'Recognition & Affiliation',
              url: '/about/recognition',
              description: 'Official government approvals and affiliation certificates',
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
              description: 'Curriculum structure from Nursery through Class X',
            },
            {
              label: 'Academic Calendar',
              url: '/academics/calendar',
              description: 'Term dates, examination schedule, and holidays',
            },
            {
              label: 'Board Examination Results',
              url: '/academics/results',
              description: 'SSC Class X performance and merit rankings',
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
              description: 'State-of-the-art campus, laboratories, sports grounds',
            },
          ],
        },
        {
          label: 'Student Life',
          url: '/student-life/activities',
          subItems: [
            {
              label: 'Co-Curricular Activities',
              url: '/student-life/activities',
              description: 'Debates, music, drama, science club, arts',
            },
            {
              label: 'Student Clubs & Societies',
              url: '/student-life/clubs',
              description: 'Eco-club, Scout & Guide, Reading circles',
            },
            {
              label: 'Annual Sports & Festivals',
              url: '/student-life/events',
              description: 'Annual sports meet, gathering, national celebrations',
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
              description: 'Step-by-step admission roadmap for 2026-27',
            },
            {
              label: 'Fee Structure',
              url: '/admissions/fees',
              description: 'Transparent, government-approved annual fee slabs',
            },
            {
              label: 'Required Documents',
              url: '/admissions/documents',
              description: 'Checklist of certificates and transfer credentials',
            },
            {
              label: 'Online Enquiry Form',
              url: '/admissions/enquiry',
              description: 'Direct registration inquiry for parents',
            },
          ],
        },
        {
          label: 'News & Notices',
          url: '/news-and-notices',
          subItems: [
            {
              label: 'Official Circulars & Notices',
              url: '/news-and-notices',
              description: 'Dated circulars, timetables, and exam dates',
            },
          ],
        },
        {
          label: 'Gallery',
          url: '/gallery',
          subItems: [
            {
              label: 'Photo & Video Gallery',
              url: '/gallery',
              description: 'Campus highlights, celebrations, and events',
            },
          ],
        },
        {
          label: 'Contact',
          url: '/contact',
          subItems: [],
        },
      ],
      admissionCta: {
        label: 'Admissions 2026-27',
        url: '/admissions/enquiry',
      },
    },
  })
  console.log('  ✓ Updated Navigation')

  // 5. Seed Footer Global
  console.log('🦶 Seeding Footer Global...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      aboutText:
        'Dr. Netaji Karale Vidyalaya, Chinchgaon (Akulgaon), is dedicated to providing high-quality, value-centered schooling in rural Maharashtra. We nurture disciplined, curious, and future-ready young leaders.',
      quickLinks: [
        { label: 'School Story', url: '/about/school-story' },
        { label: "Principal's Desk", url: '/about/principals-desk' },
        { label: 'Academic Curriculum', url: '/academics/curriculum' },
        { label: 'School Infrastructure', url: '/facilities' },
        { label: 'Admissions 2026-27', url: '/admissions/process' },
        { label: 'Photo Gallery', url: '/gallery' },
      ],
      academicLinks: [
        { label: 'Academic Calendar', url: '/academics/calendar' },
        { label: 'SSC Board Results', url: '/academics/results' },
        { label: 'Student Life & Clubs', url: '/student-life/clubs' },
        { label: 'Co-Curriculars', url: '/student-life/activities' },
        { label: 'Official Notices', url: '/news-and-notices' },
      ],
      portalLinks: [
        { label: 'Admission Enquiry', url: '/admissions/enquiry' },
        { label: 'Staff Login (Admin)', url: '/admin' },
        { label: 'Campus Visit & Contact', url: '/contact' },
      ],
      legalLinks: [
        { label: 'Privacy Policy (DPDP Act)', url: '/privacy-policy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Sitemap', url: '/sitemap.xml' },
        { label: 'Contact Office', url: '/contact' },
      ],
      copyrightText: '© 2026 Dr. Netaji Karale Vidyalaya (DNKV), Chinchgaon. All rights reserved.',
      complianceText:
        'India Digital Personal Data Protection (DPDP) Act 2023 compliant. Student photographs and records published solely with verified parental consent.',
    },
  })
  console.log('  ✓ Updated Footer')

  // 6. Seed Homepage Global
  console.log('🏠 Seeding Homepage Global...')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      announcementStrip: {
        enabled: true,
        text: 'Admissions Open for Academic Year 2026–27 (Nursery through Class X) — Secure your child’s seat today!',
        linkUrl: '/admissions/enquiry',
        linkLabel: 'Apply Online',
        startDate: new Date('2026-01-01').toISOString(),
        endDate: new Date('2026-12-31').toISOString(),
      },
      hero: {
        headline: 'Empowering Students for the Future',
        subheadline:
          'Dr. Netaji Karale Vidyalaya, Chinchgaon — Quality Education, Strong Values, and Holistic Development in Rural Maharashtra.',
        primaryButton: {
          label: 'Admissions 2026–27',
          url: '/admissions/process',
        },
        secondaryButton: {
          label: 'Explore Our Campus',
          url: '/facilities',
        },
      },
      stageCards: {
        enabled: true,
        sectionTitle: 'Our Academic Stages',
        sectionSubtitle:
          'Nurturing growth and curiosity across foundational, primary, and secondary years',
        stages: [
          {
            title: 'Pre-Primary Foundation',
            grades: 'Nursery – UKG',
            description:
              'Play-way methodology focusing on motor skills, emotional growth, phonics, and joyful foundational learning.',
            linkUrl: '/academics/curriculum',
          },
          {
            title: 'Primary Schooling',
            grades: 'Classes 1 – 5',
            description:
              'Core literacy, mathematics, environmental studies, bilingual confidence, and creative expression.',
            linkUrl: '/academics/curriculum',
          },
          {
            title: 'Middle School',
            grades: 'Classes 6 – 8',
            description:
              'Scientific reasoning, social sciences, computer fundamentals, sports training, and vocational clubs.',
            linkUrl: '/academics/curriculum',
          },
          {
            title: 'Secondary SSC Preparation',
            grades: 'Classes 9 & 10',
            description:
              'Rigorous academic preparation for Maharashtra State Board SSC examinations with individual mentoring.',
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
          'Welcome to Dr. Netaji Karale Vidyalaya, Chinchgaon. Our mission is to democratize world-class education for every child in our region. We blend modern pedagogy with deep moral foundations, inspiring students to dream boldly, excel academically, and contribute positively to society.',
        readMoreLink: '/about/principals-desk',
      },
      whyDnkv: {
        enabled: true,
        heading: 'Why Choose DNKV Chinchgaon?',
        subheading:
          'A nurturing ecosystem crafted to bring out the potential in every rural learner',
        pillars: [
          {
            icon: 'award',
            title: 'Consistent Academic Excellence',
            description:
              'Proven track record of high pass percentages and merit rankings in board examinations with dedicated faculty guidance.',
          },
          {
            icon: 'flask-conical',
            title: 'Modern Science & Computer Labs',
            description:
              'Practical hands-on laboratory experiments and digital computer education starting from primary classes.',
          },
          {
            icon: 'trophy',
            title: 'Sports & Character Building',
            description:
              'Expansive playgrounds, physical education, athletic coaching, and inter-school sports tournaments.',
          },
          {
            icon: 'heart-handshake',
            title: 'Value-Based Holistic Care',
            description:
              'Ethical leadership, social awareness, discipline, and community development rooted in Indian cultural values.',
          },
        ],
      },
      resultsBlock: {
        enabled: true,
        heading: 'Our Academic Milestones',
        subheading: 'Demonstrated dedication from students, teachers, and parents working together',
        stats: [
          { value: '100%', label: 'SSC Exam Pass Rate [TODO: Confirm]' },
          { value: '1000+', label: 'Happy Students Enrolled' },
          { value: '50+', label: 'Experienced & Devoted Teachers' },
          { value: '25+', label: 'Years of Educational Service [TODO: Confirm]' },
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
    },
  })
  console.log('  ✓ Updated Homepage')

  // 7. Seed Notices
  console.log('📢 Seeding Sample Notices...')
  const sampleNotices = [
    {
      title: 'Admissions Open for Academic Year 2026-27 (Nursery to Class 10)',
      date: new Date().toISOString(),
      category: 'admissions' as const,
      isPinned: true,
      expiryDate: new Date('2026-08-31').toISOString(),
      _status: 'published' as const,
    },
    {
      title: 'Schedule for SSC Board Preliminary Examinations 2026',
      date: new Date(Date.now() - 3 * 86400000).toISOString(),
      category: 'examinations' as const,
      isPinned: false,
      expiryDate: new Date('2026-04-15').toISOString(),
      _status: 'published' as const,
    },
    {
      title: 'Annual Sports Meet & Inter-House Athletics Tournament Announced',
      date: new Date(Date.now() - 7 * 86400000).toISOString(),
      category: 'events' as const,
      isPinned: false,
      expiryDate: new Date('2026-03-31').toISOString(),
      _status: 'published' as const,
    },
  ]

  for (const notice of sampleNotices) {
    const existing = await payload.find({
      collection: 'notices',
      where: { title: { equals: notice.title } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'notices',
        data: notice,
      })
      console.log(`  ✓ Created Notice: ${notice.title}`)
    }
  }

  // 8. Seed News
  console.log('📰 Seeding Sample News Articles...')
  const sampleNews = [
    {
      title: 'DNKV Students Win Top Honors at Taluka Science & Innovation Exhibition',
      date: new Date().toISOString(),
      category: 'academics' as const,
      summary:
        'Student projects on drip irrigation automation and solar grain drying secured 1st place in the rural science category.',
      _status: 'published' as const,
    },
    {
      title: "Annual Cultural Gathering 'Udaan 2026' Celebrates Rural Heritage and Talent",
      date: new Date(Date.now() - 5 * 86400000).toISOString(),
      category: 'cultural' as const,
      summary:
        'Over 600 students performed traditional Marathi folk dances, patriotic plays, and musical presentations before a community audience of 2000.',
      _status: 'published' as const,
    },
    {
      title: 'Green Campus Initiative: 500 Saplings Planted by Eco-Club Volunteers',
      date: new Date(Date.now() - 12 * 86400000).toISOString(),
      category: 'community' as const,
      summary:
        'Students, teachers, and village elders collaborated in planting indigenous trees around the school playground perimeter.',
      _status: 'published' as const,
    },
  ]

  for (const newsItem of sampleNews) {
    const existing = await payload.find({
      collection: 'news',
      where: { title: { equals: newsItem.title } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'news',
        data: newsItem as any,
      })
      console.log(`  ✓ Created News: ${newsItem.title}`)
    }
  }

  // 9. Seed Facilities
  console.log('🏢 Seeding Campus Facilities...')
  const sampleFacilities = [
    {
      title: 'Smart Classrooms & Audio-Visual Learning Hall',
      category: 'academic' as const,
      description:
        'Equipped with digital interactive displays, audio-visual educational modules, and multimedia content bringing complex concepts to life.',
      highlights: [
        { text: 'Digital smart boards' },
        { text: 'Devanagari and English educational software' },
        { text: 'High-speed internet connectivity' },
      ],
      order: 1,
    },
    {
      title: 'Comprehensive Science & Computer Laboratories',
      category: 'science_tech' as const,
      description:
        'Hands-on laboratories for Physics, Chemistry, and Biology, plus a 40-workstation computer lab with coding and computer literacy programs.',
      highlights: [
        { text: 'Individual workstations for students' },
        { text: 'Standard safety gear and apparatus' },
        { text: 'Broadband internet access' },
      ],
      order: 2,
    },
    {
      title: 'Library & Quiet Reading Room',
      category: 'library' as const,
      description:
        'Over 5,000 reference books, encyclopedias, Marathi literature classics, daily newspapers, and educational magazines for students and teachers.',
      highlights: [
        { text: 'Marathi & English book collection' },
        { text: 'Dedicated study and quiet reading stations' },
        { text: 'Weekly library period for all classes' },
      ],
      order: 3,
    },
    {
      title: 'Spacious Sports Ground & Athletic Track',
      category: 'sports' as const,
      description:
        'Expansive natural outdoor playground with marked grounds for Kho-Kho, Kabaddi, Volleyball, Cricket, and Track events.',
      highlights: [
        { text: 'Inter-school competition standard grounds' },
        { text: 'Equipment for cricket, volleyball, athletic hurdles' },
        { text: 'Full-time physical education coaching' },
      ],
      order: 4,
    },
    {
      title: 'Clean RO Drinking Water & Modern Sanitation',
      category: 'safety' as const,
      description:
        'Central Reverse Osmosis (RO) purified drinking water stations and clean, separate hygienic washroom blocks for girls, boys, and faculty.',
      highlights: [
        { text: 'Tested multi-stage RO filtration' },
        { text: 'Separate sanitized facilities for girls & boys' },
        { text: '24/7 water supply & sanitation monitoring' },
      ],
      order: 5,
    },
  ]

  for (const fac of sampleFacilities) {
    const existing = await payload.find({
      collection: 'facilities',
      where: { title: { equals: fac.title } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'facilities',
        data: fac as any,
      })
      console.log(`  ✓ Created Facility: ${fac.title}`)
    }
  }

  // 10. Seed Staff Profiles
  console.log('👨‍🏫 Seeding Staff & Leadership...')
  const sampleStaff = [
    {
      name: 'Shri. [Principal Name - TODO: Confirm]',
      designation: 'Principal',
      department: 'leadership' as const,
      qualification: 'M.A., M.Ed., M.Phil. [TODO: Confirm]',
      experienceYears: 22,
      bio: 'Leading DNKV with a passion for academic rigor, student mentorship, and community advancement.',
      order: 1,
    },
    {
      name: 'Smt. [Vice Principal Name - TODO: Confirm]',
      designation: 'Vice Principal & Head of Academics',
      department: 'leadership' as const,
      qualification: 'M.Sc., B.Ed. [TODO: Confirm]',
      experienceYears: 18,
      bio: 'Guiding teachers and curriculum execution to ensure every student receives personal attention.',
      order: 2,
    },
    {
      name: 'Shri. [Senior Science Teacher - TODO: Confirm]',
      designation: 'Senior Teacher - Science & Mathematics',
      department: 'secondary' as const,
      qualification: 'M.Sc. (Physics), B.Ed. [TODO: Confirm]',
      experienceYears: 14,
      bio: 'Inspiring young rural scientists through practical experiment-led teaching.',
      order: 3,
    },
    {
      name: 'Shri. [Sports Director - TODO: Confirm]',
      designation: 'Physical Education Teacher (DPEd)',
      department: 'sports' as const,
      qualification: 'B.P.Ed. [TODO: Confirm]',
      experienceYears: 10,
      bio: 'Training district champions in athletics, kho-kho, and kabaddi with discipline and sportsmanship.',
      order: 4,
    },
  ]

  for (const st of sampleStaff) {
    const existing = await payload.find({
      collection: 'staff',
      where: { name: { equals: st.name } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'staff',
        data: st as any,
      })
      console.log(`  ✓ Created Staff: ${st.name}`)
    }
  }

  // 11. Seed Results
  console.log('🏆 Seeding Results...')
  const existingResults = await payload.find({
    collection: 'results',
    where: { academicYear: { equals: '2024-2025' } },
  })
  if (existingResults.totalDocs === 0) {
    await payload.create({
      collection: 'results',
      data: {
        academicYear: '2024-2025',
        className: 'Class X',
        passPercentage: 99.2,
        totalStudents: 120,
        distinctionCount: 48,
        toppers: [
          {
            studentName: 'Student Merit Achiever 1 [TODO: Confirm Name]',
            percentage: 96.4,
            rank: 'School 1st Rank',
            parentalConsentGiven: true, // DPDP compliant
          },
          {
            studentName: 'Student Merit Achiever 2 [TODO: Confirm Name]',
            percentage: 95.2,
            rank: 'School 2nd Rank',
            parentalConsentGiven: true, // DPDP compliant
          },
        ],
      },
    })
    console.log('  ✓ Created 2024-2025 Class X Results')
  }

  // 12. Seed Core Static Block Pages
  console.log('📄 Seeding Block-based Inner Pages...')
  const pagesToSeed = [
    {
      title: 'School Story & Founding Vision',
      slug: 'about/school-story',
      subtitle: 'The history, mission, and legacy of Dr. Netaji Karale Vidyalaya',
      _status: 'published' as const,
      meta: {
        title: 'School Story | Dr. Netaji Karale Vidyalaya, Chinchgaon',
        description:
          'Discover the heritage, values, and journey of DNKV Chinchgaon empowering rural youth since inception.',
      },
    },
    {
      title: "Principal's Desk",
      slug: 'about/principals-desk',
      subtitle: 'Leadership perspective on holistic rural education and student development',
      _status: 'published' as const,
      meta: {
        title: "Principal's Desk | Dr. Netaji Karale Vidyalaya",
        description:
          'Read the official address and academic vision from the Principal of Dr. Netaji Karale Vidyalaya, Chinchgaon.',
      },
    },
    {
      title: "President's Desk",
      slug: 'about/presidents-desk',
      subtitle: 'A message from the Governing Council and Leadership Board',
      _status: 'published' as const,
      meta: {
        title: "President's Desk | Dr. Netaji Karale Vidyalaya",
        description: 'Vision and guidance from the President of the School Sanstha / Trust.',
      },
    },
    {
      title: "Vice Principal's Desk",
      slug: 'about/vice-principals-desk',
      subtitle: 'Academic administration, student discipline, and co-curricular pursuits',
      _status: 'published' as const,
      meta: {
        title: "Vice Principal's Desk | Dr. Netaji Karale Vidyalaya",
        description:
          'Statement from the Vice Principal on academic excellence and mentoring at DNKV.',
      },
    },
    {
      title: "Vice President's Desk",
      slug: 'about/vice-presidents-desk',
      subtitle: 'Institutional governance, community trust, and infrastructural growth',
      _status: 'published' as const,
      meta: {
        title: "Vice President's Desk | Dr. Netaji Karale Vidyalaya",
        description:
          'Address from the Vice President on institutional support and expansion at DNKV.',
      },
    },
    {
      title: 'Recognition & Affiliation',
      slug: 'about/recognition',
      subtitle: 'Official government approvals, school code, and board affiliation details',
      _status: 'published' as const,
      meta: {
        title: 'Recognition & Affiliation | Dr. Netaji Karale Vidyalaya',
        description:
          'Government of Maharashtra approval details, U-DISE code, and board affiliation records for DNKV.',
      },
    },
    {
      title: 'Academics & Curriculum',
      slug: 'academics',
      subtitle: 'Comprehensive educational roadmap from Nursery to Class X',
      _status: 'published' as const,
      meta: {
        title: 'Academics | Dr. Netaji Karale Vidyalaya, Chinchgaon',
        description: 'Explore the academic approach, syllabus, and co-curricular programs at DNKV.',
      },
    },
    {
      title: 'Curriculum & Pedagogy',
      slug: 'academics/curriculum',
      subtitle: 'Structured learning frameworks aligned with state board standards',
      _status: 'published' as const,
      meta: {
        title: 'Curriculum | Dr. Netaji Karale Vidyalaya',
        description:
          'Detailed stage-wise curriculum from pre-primary through secondary education at DNKV.',
      },
    },
    {
      title: 'Academic Calendar 2026',
      slug: 'academics/calendar',
      subtitle: 'Term dates, examination windows, vacations, and annual events',
      _status: 'published' as const,
      meta: {
        title: 'Academic Calendar | Dr. Netaji Karale Vidyalaya',
        description: 'Important term schedules, unit test dates, and vacation periods for 2026.',
      },
    },
    {
      title: 'Board Examination Results',
      slug: 'academics/results',
      subtitle: 'Celebrating the achievements and merit milestones of our SSC students',
      _status: 'published' as const,
      meta: {
        title: 'Board Results | Dr. Netaji Karale Vidyalaya',
        description:
          'SSC Class X academic performance, topper recognition, and pass statistics for DNKV.',
      },
    },
    {
      title: 'Campus & Infrastructure Facilities',
      slug: 'facilities',
      subtitle: 'Safe, well-equipped, and inspiring spaces built for experiential learning',
      _status: 'published' as const,
      meta: {
        title: 'Facilities & Campus | Dr. Netaji Karale Vidyalaya',
        description:
          'Discover DNKV campus facilities: science labs, smart classrooms, sports ground, and library.',
      },
    },
    {
      title: 'Co-Curricular Activities',
      slug: 'student-life/activities',
      subtitle: 'Fostering creativity, communication, teamwork, and artistic expression',
      _status: 'published' as const,
      meta: {
        title: 'Co-Curricular Activities | Dr. Netaji Karale Vidyalaya',
        description: 'Debates, music, drama, science exhibitions, and art competitions at DNKV.',
      },
    },
    {
      title: 'Student Clubs & Societies',
      slug: 'student-life/clubs',
      subtitle: 'Hands-on clubs that nurture leadership, ecology, and social service',
      _status: 'published' as const,
      meta: {
        title: 'Student Clubs | Dr. Netaji Karale Vidyalaya',
        description: 'Eco-club, Scout & Guide, Reading circle, and Cultural society at DNKV.',
      },
    },
    {
      title: 'Annual Events & Sports Festivals',
      slug: 'student-life/events',
      subtitle: 'Tradition, athletic zeal, and joyful community gatherings at DNKV',
      _status: 'published' as const,
      meta: {
        title: 'Events & Sports | Dr. Netaji Karale Vidyalaya',
        description:
          'Annual Sports Day, Gathering, Republic Day, and Independence Day celebrations at DNKV.',
      },
    },
    {
      title: 'Admission Procedure 2026-27',
      slug: 'admissions/process',
      subtitle: 'Step-by-step guidance for enrolling your child at Dr. Netaji Karale Vidyalaya',
      _status: 'published' as const,
      meta: {
        title: 'Admissions 2026-27 | Dr. Netaji Karale Vidyalaya',
        description:
          'Learn how to apply for admission to Nursery through Class X at DNKV Chinchgaon.',
      },
    },
    {
      title: 'Fee Structure & Scholarships',
      slug: 'admissions/fees',
      subtitle: 'Affordable, transparent fee structure adhering to government norms',
      _status: 'published' as const,
      meta: {
        title: 'Fee Structure | Dr. Netaji Karale Vidyalaya',
        description:
          'Annual fee slabs, payment schedules, and government scholarship support at DNKV.',
      },
    },
    {
      title: 'Required Admission Documents',
      slug: 'admissions/documents',
      subtitle: 'Checklist of certificates and credentials required during admission',
      _status: 'published' as const,
      meta: {
        title: 'Admission Documents | Dr. Netaji Karale Vidyalaya',
        description:
          'Birth certificate, school leaving certificate (LC), Aadhaar, and photo checklist for DNKV admissions.',
      },
    },
    {
      title: 'Admissions & General Enquiry',
      slug: 'admissions/enquiry',
      subtitle: 'Get in touch with our admissions counselor or request a campus visit',
      _status: 'published' as const,
      meta: {
        title: 'Admission Enquiry | Dr. Netaji Karale Vidyalaya',
        description:
          'Submit an online enquiry for student admission or schedule an in-person school tour.',
      },
    },
    {
      title: 'School News & Official Notices',
      slug: 'news-and-notices',
      subtitle: 'Latest circulars, announcements, and campus stories',
      _status: 'published' as const,
      meta: {
        title: 'News & Notices | Dr. Netaji Karale Vidyalaya',
        description:
          'Stay updated with dated circulars, academic notices, and news articles from DNKV.',
      },
    },
    {
      title: 'Photo & Video Gallery',
      slug: 'gallery',
      subtitle: 'Visual glimpses of vibrant campus life, celebrations, and sports',
      _status: 'published' as const,
      meta: {
        title: 'Gallery | Dr. Netaji Karale Vidyalaya',
        description:
          'Photos and videos of school events, campus architecture, science fairs, and celebrations.',
      },
    },
    {
      title: 'Contact Us & Campus Location',
      slug: 'contact',
      subtitle: 'Visit our campus in Chinchgaon or reach our administrative office',
      _status: 'published' as const,
      meta: {
        title: 'Contact Us | Dr. Netaji Karale Vidyalaya, Chinchgaon',
        description:
          'Phone +91-9545541454, email dnkvchinchgaon@gmail.com, address and Google Maps directions.',
      },
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      subtitle: 'Compliance with India Digital Personal Data Protection (DPDP) Act 2023',
      _status: 'published' as const,
      meta: {
        title: 'Privacy Policy | Dr. Netaji Karale Vidyalaya',
        description:
          'Data protection principles, child data consent policies, and privacy rights at DNKV.',
      },
    },
    {
      title: 'Terms of Use',
      slug: 'terms',
      subtitle: 'Guidelines governing the use of the official DNKV school website',
      _status: 'published' as const,
      meta: {
        title: 'Terms of Use | Dr. Netaji Karale Vidyalaya',
        description: 'Website terms of service, intellectual property notices, and disclaimer.',
      },
    },
  ]

  for (const page of pagesToSeed) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'pages',
        data: page as any,
      })
      console.log(`  ✓ Created Page: /${page.slug}`)
    }
  }

  console.log('🎉 DNKV Seed Script completed successfully!')
  process.exit(0)
}

runSeed().catch((err) => {
  console.error('❌ Error during seed script:', err)
  process.exit(1)
})
