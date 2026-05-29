import { auth } from '@/lib/neon-server-auth'

// @ts-ignore – neonAuthMiddleware targets Next.js 15 types but works fine at runtime with Next.js 14
export default auth.middleware({ loginUrl: '/admin' })

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
