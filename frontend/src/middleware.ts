import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const legacyRedirects: Record<string, string> = {
  '/principle_desk': '/about/principals-desk',
  '/acadmics': '/academics',
  '/gallary': '/gallery',
  '/contact_us': '/contact',
  '/admission': '/admissions/process',
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (legacyRedirects[pathname]) {
    const url = request.nextUrl.clone()
    url.pathname = legacyRedirects[pathname]
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - media (public media assets)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|media|favicon.ico).*)',
  ],
}
