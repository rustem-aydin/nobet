// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // API rotalarını atla
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Statik dosyaları atla
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('payload-token')?.value

  // Token YOKSA
  if (!token) {
    // Zaten login sayfasındaysa kal
    if (pathname === '/login') {
      return NextResponse.next()
    }

    // Diğer her sayfadan login'e yönlendir
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Token VARSA
  // Login sayfasındaysa ana sayfaya yönlendir (giriş yapmış kişi login'e gitmesin)
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Diğer tüm sayfalara (/, /admin, /dashboard vb.) izin ver
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
