import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dnkv.in'

  const routes = [
    '',
    '/about/school-story',
    '/about/principals-desk',
    '/about/presidents-desk',
    '/about/vice-principals-desk',
    '/about/vice-presidents-desk',
    '/about/recognition',
    '/academics',
    '/academics/curriculum',
    '/academics/calendar',
    '/academics/results',
    '/facilities',
    '/student-life/activities',
    '/student-life/clubs',
    '/student-life/events',
    '/admissions/process',
    '/admissions/fees',
    '/admissions/documents',
    '/admissions/enquiry',
    '/news-and-notices',
    '/gallery',
    '/contact',
    '/privacy-policy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/admissions') ? 0.9 : 0.8,
  }))
}
