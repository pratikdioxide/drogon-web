import { authApiHandler } from '@neondatabase/auth/next/server'

export const { GET, POST, PUT, DELETE, PATCH } = authApiHandler({
  baseUrl: process.env.NEON_AUTH_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
})
