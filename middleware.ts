import { NextRequest, NextResponse } from 'next/server'

/**
 * Norsk er standard og ligger uten prefiks: /configurator/ skrives om til
 * /no/configurator/ internt. Engelsk ligger åpent under /en/. Eksplisitt
 * /no/ sendes tilbake til den prefiksløse adressen så det bare finnes én URL
 * per side.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/en' || pathname.startsWith('/en/')) return NextResponse.next()

  if (pathname === '/no' || pathname.startsWith('/no/')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/^\/no/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  const url = req.nextUrl.clone()
  url.pathname = `/no${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Ikke API, Next-internt eller statiske filer (alt med filendelse).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
