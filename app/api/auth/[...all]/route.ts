export const dynamic = 'force-dynamic'

import { auth } from '@/lib/neon-server-auth'

// @ts-ignore – authApiHandler targets Next.js 15 types but works fine at runtime with Next.js 14
export const { GET, POST, PUT, DELETE, PATCH } = auth.handler()
