import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const token = req.cookies.get('drogon_admin')?.value
    if (!token) return NextResponse.redirect(new URL('/admin', req.url))
    const session = await verifyToken(token)
    if (!session) return NextResponse.redirect(new URL('/admin', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}