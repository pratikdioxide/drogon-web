import { neonAuthMiddleware } from '@neondatabase/auth/next/server'

export default neonAuthMiddleware({
  baseUrl: process.env.NEON_AUTH_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
  loginUrl: '/admin',
})

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
