import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Handle docs subdomain
  if (hostname === 'docs.orba.work') {
    const url = request.nextUrl.clone();

    // If the path is just '/', rewrite to /docs
    if (url.pathname === '/') {
      url.pathname = '/docs';
    } else if (!url.pathname.startsWith('/docs')) {
      // Prepend /docs to all other paths
      url.pathname = `/docs${url.pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  // Handle www subdomain - redirect to main domain
  if (hostname === 'www.orba.work') {
    const url = request.nextUrl.clone();
    url.hostname = 'orba.work';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};