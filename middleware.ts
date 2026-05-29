import { NextRequest, NextResponse } from 'next/server'

const BASE = process.env.NEON_AUTH_URL!

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    return NextResponse.next()
  }

  const cookie = req.headers.get('cookie') || ''

  try {
    const r = await fetch(`${BASE}/get-session`, {
      headers: { cookie },
      cache: 'no-store',
    })

    if (!r.ok) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    const data = await r.json()
    if (!data?.user) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  } catch {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
