import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowLeft, Calendar, CheckCircle2, FileText, Phone, Mail, Award, BookOpen, Clock } from 'lucide-react'
import { fetchPageBySlug, type PageDoc } from '../../lib/cms'
import { BlockRenderer } from '../../components/BlockRenderer'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  return [
    { slug: ['about', 'school-story'] },
    { slug: ['about', 'principals-desk'] },
    { slug: ['about', 'presidents-desk'] },
    { slug: ['about', 'vice-principals-desk'] },
    { slug: ['about', 'vice-presidents-desk'] },
    { slug: ['about', 'recognition'] },
    { slug: ['academics', 'curriculum'] },
    { slug: ['academics', 'calendar'] },
    { slug: ['student-life', 'activities'] },
    { slug: ['student-life', 'clubs'] },
    { slug: ['student-life', 'events'] },
    { slug: ['admissions', 'process'] },
    { slug: ['admissions', 'fees'] },
    { slug: ['admissions', 'documents'] },
    { slug: ['privacy-policy'] },
    { slug: ['terms'] },
  ]
}

// Fallback content dictionaries for core pages to ensure 100% working demo
const pageFallbacks: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  'about/school-story': {
    title: 'School Story & Heritage',
    subtitle: 'A vision to bring world-class foundation education to rural Solapur',
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-base md:text-lg">
        <p>
          Dr. Netaji Karale Vidyalaya (DNKV), situated in the scenic rural landscape of Chinchgaon (Akulgaon), Taluka Madha, District Solapur, was founded with a singular noble mission: to ensure that children from agrarian communities have access to academic excellence, scientific temper, and holistic character building without having to migrate to distant cities.
        </p>
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
          <h3 className="font-bold text-xl mb-2">Our Guiding Motto</h3>
          <p className="italic text-base">
            &ldquo;Empowering Students for the Future.&rdquo; We combine traditional moral values and discipline with modern digital literacy, scientific inquiry, and athletic grit.
          </p>
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Foundational Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-blue-900 uppercase">Phase 1</span>
            <h4 className="font-bold text-slate-900 mt-1 mb-2">Rural Literacy Seed</h4>
            <p className="text-sm text-slate-600">Started with primary classes serving children across Chinchgaon and surrounding rural hamlets.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-blue-900 uppercase">Phase 2</span>
            <h4 className="font-bold text-slate-900 mt-1 mb-2">Secondary Expansion</h4>
            <p className="text-sm text-slate-600">Upgraded to Class X with state-of-the-art Science labs and Maharashtra State Board recognition.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-blue-900 uppercase">Phase 3</span>
            <h4 className="font-bold text-slate-900 mt-1 mb-2">Digital & Sports Era</h4>
            <p className="text-sm text-slate-600">Introduced smart classrooms, 40-seat computer labs, and full-scale athletic track & field facilities.</p>
          </div>
        </div>
      </div>
    ),
  },
  'about/principals-desk': {
    title: "Principal's Desk",
    subtitle: 'Nurturing rural potential into national leadership',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-base md:text-lg">
        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 italic text-lg font-serif">
          &ldquo;Dear Parents, Students, and Well-Wishers, welcome to Dr. Netaji Karale Vidyalaya. True education does not simply prepare students for examinations; it prepares them for life. In our rural campus, we witness brilliance every single day.&rdquo;
        </div>
        <p>
          At DNKV, we prioritize a tri-fold approach to schooling: <strong>Academic Rigor</strong>, <strong>Scientific Exploration</strong>, and <strong>Moral Character</strong>. Our dedicated teachers provide individual attention to every learner, bridging the gap between foundational literacy and competitive excellence.
        </p>
        <p>
          We invite every family in our region to partner with us in this transformative educational journey.
        </p>
        <div className="pt-6 border-t border-slate-200">
          <p className="font-bold text-slate-900">Principal</p>
          <p className="text-sm text-slate-500">Dr. Netaji Karale Vidyalaya, Chinchgaon</p>
        </div>
      </div>
    ),
  },
  'about/presidents-desk': {
    title: "President's Desk",
    subtitle: 'Institutional governance dedicated to rural upliftment',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-base md:text-lg">
        <p>
          On behalf of the Governing Board, I extend our warmest greetings. Dr. Netaji Karale Vidyalaya was envisioned as an educational sanctuary where rural children receive the same technological infrastructure, qualified instruction, and sports avenues as premier urban institutions.
        </p>
        <p>
          Our continuous investments in solar energy, modern science labs, high-speed broadband, and student transport underscore our commitment to enduring rural educational empowerment.
        </p>
      </div>
    ),
  },
  'about/vice-principals-desk': {
    title: "Vice Principal's Desk",
    subtitle: 'Academic administration, continuous evaluation, and student discipline',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-base md:text-lg">
        <p>
          Our academic calendar is structured to provide continuous, supportive evaluation. Through weekly test series, doubt-clearing sessions, and regular parent-teacher dialogues, we ensure students prepare thoroughly for SSC board examinations without stress.
        </p>
      </div>
    ),
  },
  'about/vice-presidents-desk': {
    title: "Vice President's Desk",
    subtitle: 'Strengthening campus facilities and community relationships',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-base md:text-lg">
        <p>
          Community trust is the bedrock of DNKV. We maintain transparent operations, affordable approved fee structures, and open communication with parents and local village leadership.
        </p>
      </div>
    ),
  },
  'about/recognition': {
    title: 'Recognition & Affiliation',
    subtitle: 'Official Maharashtra State Board approvals and school records',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-lg mb-2">Board Affiliation</h4>
            <p className="text-sm text-slate-600 mb-4">Recognized by the Maharashtra State Board of Secondary and Higher Secondary Education (Pune Divisional Board).</p>
            <span className="text-xs font-mono bg-blue-100 text-blue-900 px-3 py-1 rounded font-bold">Affiliation: SSC State Board [TODO: Confirm]</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-lg mb-2">School Code & U-DISE</h4>
            <p className="text-sm text-slate-600 mb-4">Official government registration details for scholarship and examination center allocation.</p>
            <span className="text-xs font-mono bg-amber-100 text-amber-900 px-3 py-1 rounded font-bold">U-DISE: [TODO: Confirm Code]</span>
          </div>
        </div>
      </div>
    ),
  },
  'academics/curriculum': {
    title: 'Curriculum & Academic Approach',
    subtitle: 'Progressive, stage-wise learning from Nursery through Class X',
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded uppercase">Stage 1</span>
            <h4 className="text-xl font-bold text-slate-900 mt-3 mb-2">Pre-Primary (Nursery, LKG, UKG)</h4>
            <p className="text-sm text-slate-600 mb-4">Activity-based learning, phonics, number songs, fine motor play, and joyful bilingual communication in Marathi and English.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded uppercase">Stage 2</span>
            <h4 className="text-xl font-bold text-slate-900 mt-3 mb-2">Primary School (Classes 1 – 5)</h4>
            <p className="text-sm text-slate-600 mb-4">Mathematics fluency, Environmental Studies, foundational science, computer literacy, and reading comprehension in Marathi, Hindi, and English.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded uppercase">Stage 3</span>
            <h4 className="text-xl font-bold text-slate-900 mt-3 mb-2">Middle School (Classes 6 – 8)</h4>
            <p className="text-sm text-slate-600 mb-4">Practical science experiments in dedicated laboratories, Social Sciences, ICT computing, geometry, and athletic coaching.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded uppercase">Stage 4</span>
            <h4 className="text-xl font-bold text-slate-900 mt-3 mb-2">Secondary SSC (Classes 9 & 10)</h4>
            <p className="text-sm text-slate-600 mb-4">Rigorous syllabus coverage, preliminary examination series, model answer writing workshops, and science practical assessments.</p>
          </div>
        </div>
      </div>
    ),
  },
  'academics/calendar': {
    title: 'Academic Calendar 2026',
    subtitle: 'Term schedules, examinations, and major school events',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase">First Term</span>
              <h4 className="font-bold text-slate-900">June – October 2026</h4>
              <p className="text-xs text-slate-500">School reopening, Unit Test 1, Semester 1 Examinations, Diwali Vacation.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800">Term 1</span>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 uppercase">Second Term</span>
              <h4 className="font-bold text-slate-900">November 2026 – April 2027</h4>
              <p className="text-xs text-slate-500">Unit Test 2, Annual Sports Meet, Cultural Gathering, Preliminary SSC Exams, Final Annual Board Exams.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800">Term 2</span>
          </div>
        </div>
      </div>
    ),
  },
  'student-life/activities': {
    title: 'Co-Curricular Activities',
    subtitle: 'Nurturing creativity, eloquence, and teamwork',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>
          At DNKV, we believe that education extends far beyond textbooks. Our vibrant co-curricular program engages students in debate, drama, musical arts, science exhibitions, and elocution competitions in Marathi and English.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">Science & Innovation Club</h4>
            <p className="text-xs text-slate-600">Students build working models on drip irrigation, solar devices, and eco-friendly farming.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">Cultural & Performing Arts</h4>
            <p className="text-xs text-slate-600">Traditional Lezim, Marathi folk dances, theatre, and patriotic singing presentations.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">Sports & Physical Fitness</h4>
            <p className="text-xs text-slate-600">Daily drill, Kho-Kho, Kabaddi, Volleyball, and athletics training under qualified mentors.</p>
          </div>
        </div>
      </div>
    ),
  },
  'student-life/clubs': {
    title: 'Student Clubs & Societies',
    subtitle: 'Hands-on clubs fostering leadership and environmental responsibility',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>
          Our student-led clubs offer hands-on opportunities for teamwork, social service, and eco-preservation:
        </p>
        <ul className="space-y-3">
          <li className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900">Green Eco-Club:</strong> Active campus tree plantation, composting organic waste, and water conservation awareness.
            </div>
          </li>
          <li className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900">Literature & Debating Circle:</strong> Book reading sessions in Devanagari and English, poetry recitals, and taluka debates.
            </div>
          </li>
          <li className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900">Scout & Guide Troop:</strong> Discipline, first aid training, camping skills, and community service during festivals.
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  'student-life/events': {
    title: 'Annual Events & Sports Festivals',
    subtitle: 'Celebrating tradition, teamwork, and athletic glory',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Annual Gathering &lsquo;Udaan&rsquo;</h4>
            <p className="text-sm text-slate-600">A mega two-day cultural festival featuring student dances, music, drama, and award presentations attended by parents and village leaders.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Annual Sports Carnival</h4>
            <p className="text-sm text-slate-600">Inter-house athletics competitions, 100m/200m sprints, relay races, shot put, Kho-Kho, and Kabaddi championships.</p>
          </div>
        </div>
      </div>
    ),
  },
  'admissions/process': {
    title: 'Admission Procedure 2026-27',
    subtitle: 'Step-by-step roadmap to enroll your child at DNKV',
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-amber-400 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 className="font-bold text-slate-900 mb-1">Inquiry / Registration</h4>
            <p className="text-xs text-slate-600">Fill the online admission enquiry form or visit the school office in person.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-amber-400 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 className="font-bold text-slate-900 mb-1">Campus Interaction</h4>
            <p className="text-xs text-slate-600">Informal conversation with the teachers and student to understand academic strengths.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-amber-400 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 className="font-bold text-slate-900 mb-1">Document Submission</h4>
            <p className="text-xs text-slate-600">Submit birth certificate, transfer certificate (TC), Aadhaar card, and photos.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-amber-400 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 className="font-bold text-slate-900 mb-1">Enrollment Confirmed</h4>
            <p className="text-xs text-slate-600">Receive admission confirmation receipt, book list, and academic uniform guidance.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-amber-500 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold">Ready to take the next step?</h4>
            <p className="text-sm">Submit your online enquiry today to reserve a priority interaction slot.</p>
          </div>
          <Link
            href="/admissions/enquiry"
            className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-sm hover:bg-slate-900 transition-colors flex-shrink-0"
          >
            Apply Online Now
          </Link>
        </div>
      </div>
    ),
  },
  'admissions/fees': {
    title: 'Fee Structure 2026-27',
    subtitle: 'Transparent, government-approved, affordable fee slabs',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>
          Dr. Netaji Karale Vidyalaya follows transparent, affordable fee regulations adhering strictly to Maharashtra Education Department norms. No capitation fee is ever charged.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Academic Stage</th>
                <th className="p-4">Grades</th>
                <th className="p-4">Fee Structure [TODO: Confirm]</th>
                <th className="p-4">Payment Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-4 font-semibold">Pre-Primary</td>
                <td className="p-4">Nursery – UKG</td>
                <td className="p-4 font-mono">Government Regulated Slabs</td>
                <td className="p-4 text-xs">Annual / Semi-Annual Installments</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Primary Section</td>
                <td className="p-4">Classes 1 – 5</td>
                <td className="p-4 font-mono">Government Regulated Slabs</td>
                <td className="p-4 text-xs">Annual / Semi-Annual Installments</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Middle Section</td>
                <td className="p-4">Classes 6 – 8</td>
                <td className="p-4 font-mono">Government Regulated Slabs</td>
                <td className="p-4 text-xs">Annual / Semi-Annual Installments</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Secondary SSC</td>
                <td className="p-4">Classes 9 & 10</td>
                <td className="p-4 font-mono">Government Regulated Slabs</td>
                <td className="p-4 text-xs">Annual / Semi-Annual Installments</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  'admissions/documents': {
    title: 'Required Documents',
    subtitle: 'Checklist of certificates and verification credentials',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>Please prepare original documents along with two sets of self-attested photocopies:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900">Original Birth Certificate</strong>
              <p className="text-xs text-slate-500">Issued by Municipal Corporation / Gram Panchayat (For Nursery to Class 1).</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900">Original School Leaving Certificate (TC)</strong>
              <p className="text-xs text-slate-500">From the previously attended recognized school (Countersigned if applicable).</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900">Student Aadhaar Card Copy</strong>
              <p className="text-xs text-slate-500">Mandatory for state scholarship and U-DISE student portal linking.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900">Passport Size Photographs</strong>
              <p className="text-xs text-slate-500">4 recent color photographs of the student and 2 of each parent/guardian.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  'privacy-policy': {
    title: 'Privacy Policy (DPDP Act 2023 Compliant)',
    subtitle: 'Commitment to data security and protection of minor student personal records',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
        <p>
          Dr. Netaji Karale Vidyalaya (&ldquo;DNKV&rdquo;) strictly complies with the Digital Personal Data Protection (DPDP) Act 2023 of India. We respect the privacy of our students, parents, and website visitors.
        </p>
        <h4 className="font-bold text-slate-900 text-lg">Protection of Minor Children Data</h4>
        <p>
          No photograph, full name, or academic achievement of any minor student is published on this website without verifiable written parental or legal guardian consent. Parents retain the unconditional right to request removal or anonymization of their child&rsquo;s records at any time by emailing dnkvchinchgaon@gmail.com.
        </p>
        <h4 className="font-bold text-slate-900 text-lg">Enquiry Form Information</h4>
        <p>
          Information submitted through our online admission enquiry form (name, phone number, village) is used exclusively for processing school admissions and is never sold, shared, or transferred to third parties.
        </p>
      </div>
    ),
  },
  'terms': {
    title: 'Terms of Use',
    subtitle: 'Website conditions and institutional guidelines',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
        <p>
          Welcome to the official website of Dr. Netaji Karale Vidyalaya, Chinchgaon. By browsing or submitting information through this site, you agree to these Terms of Use.
        </p>
        <h4 className="font-bold text-slate-900 text-lg">Intellectual Property</h4>
        <p>
          All website content, photographs, videos, curricula descriptions, and logos are the property of Dr. Netaji Karale Vidyalaya. Unauthorized reproduction is strictly prohibited.
        </p>
      </div>
    ),
  },
}

export default async function GenericPage({ params }: PageProps) {
  const { slug } = await params
  const slugPath = slug.join('/')

  // Attempt to fetch from Payload CMS
  const pageDoc = await fetchPageBySlug(slugPath)
  const fallback = pageFallbacks[slugPath]

  // If neither CMS nor fallback exists, return 404
  if (!pageDoc && !fallback) {
    notFound()
  }

  const title = pageDoc?.title || fallback?.title || slugPath
  const subtitle = pageDoc?.subtitle || fallback?.subtitle || ''

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Page Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-14 md:py-20 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            {slug.map((s, i) => (
              <React.Fragment key={i}>
                <ChevronRight className="w-3 h-3 text-slate-500" />
                <span className={i === slug.length - 1 ? 'text-amber-400 font-semibold capitalize' : 'capitalize'}>
                  {s.replace(/-/g, ' ')}
                </span>
              </React.Fragment>
            ))}
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-xl text-slate-300 max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-xs border border-slate-200">
          {/* If CMS has layout blocks, render them */}
          {pageDoc?.layout && pageDoc.layout.length > 0 ? (
            <BlockRenderer blocks={pageDoc.layout} />
          ) : fallback ? (
            fallback.content
          ) : (
            <div className="text-slate-600">Content being updated. Please check back shortly.</div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
