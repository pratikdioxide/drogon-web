export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Token rotates daily — stale after midnight UTC
function makeToken(secret: string) {
  const day = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  return crypto.createHmac('sha256', secret).update(`drogon-access-v1:${day}`).digest('hex')
}

// Simple in-memory rate limiter — 5 attempts per IP per minute
const attempts = new Map<string, { count: number; reset: number }>()
const MAX  = 5
const WIN  = 60_000

function allowed(ip: string): boolean {
  const now = Date.now()
  const e   = attempts.get(ip)
  if (!e || now > e.reset) { attempts.set(ip, { count: 1, reset: now + WIN }); return true }
  if (e.count >= MAX) return false
  e.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!allowed(ip))
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 })

  try {
    const { password } = await req.json()
    const secret = process.env.SEARCH_PASSWORD
    if (!secret || !password || password !== secret)
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })

    return NextResponse.json({ token: makeToken(secret) })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
