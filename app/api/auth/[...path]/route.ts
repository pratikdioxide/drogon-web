export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

const BASE = process.env.NEON_AUTH_URL!

function neonAuthOrigin(): string {
  try {
    const url = new URL(BASE)
    return `${url.protocol}//${url.host}`
  } catch {
    return BASE
  }
}

const NEON_ORIGIN = neonAuthOrigin()

/**
 * Rewrite a Set-Cookie header so it applies to our domain, not Neon's.
 * Strips Domain=..., strips Secure flag (Replit proxies over HTTPS already),
 * and sets SameSite=Lax so cookies survive page navigation.
 */
function rewriteSetCookie(raw: string): string {
  return raw
    .split(';')
    .map(part => part.trim())
    .filter(part => {
      const lower = part.toLowerCase()
      // Drop domain so browser uses current host
      if (lower.startsWith('domain=')) return false
      // Drop __Secure- cookies' Secure flag — Replit terminates TLS upstream
      // Actually keep Secure so __Secure- prefix validation passes in browser
      return true
    })
    .map(part => {
      const lower = part.toLowerCase()
      // Replace SameSite=None (requires HTTPS + Secure) with Lax for safety
      if (lower.startsWith('samesite=none')) return 'SameSite=Lax'
      return part
    })
    .join('; ')
}

async function proxy(req: NextRequest): Promise<NextResponse> {
  const subPath = req.nextUrl.pathname.replace(/^\/api\/auth\/?/, '')

  const headers: Record<string, string> = {
    'content-type': req.headers.get('content-type') || 'application/json',
    'accept': req.headers.get('accept') || 'application/json',
    'origin': NEON_ORIGIN,
    'x-neon-auth-middleware': 'true',
  }

  const ua = req.headers.get('user-agent')
  if (ua) headers['user-agent'] = ua
  const auth = req.headers.get('authorization')
  if (auth) headers['authorization'] = auth
  const referer = req.headers.get('referer')
  if (referer) headers['referer'] = referer

  const cookie = req.headers.get('cookie')
  if (cookie) headers['cookie'] = cookie

  let body: BodyInit | undefined
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await req.arrayBuffer()
  }

  const upstreamURL = new URL(`${BASE}/${subPath}`)
  upstreamURL.search = req.nextUrl.search

  const upstream = await fetch(upstreamURL.toString(), {
    method: req.method,
    headers,
    body,
  })

  const resHeaders = new Headers()

  // Forward content-type
  const ct = upstream.headers.get('content-type')
  if (ct) resHeaders.set('content-type', ct)

  // Rewrite all Set-Cookie headers — strip domain so they bind to our origin
  const rawSetCookies: string[] = []
  upstream.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'set-cookie') rawSetCookies.push(v)
  })
  for (const raw of rawSetCookies) {
    resHeaders.append('set-cookie', rewriteSetCookie(raw))
  }

  const data = await upstream.arrayBuffer()
  return new NextResponse(data, {
    status: upstream.status,
    headers: resHeaders,
  })
}

export async function GET(req: NextRequest) { return proxy(req) }
export async function POST(req: NextRequest) { return proxy(req) }
export async function PUT(req: NextRequest) { return proxy(req) }
export async function DELETE(req: NextRequest) { return proxy(req) }
export async function PATCH(req: NextRequest) { return proxy(req) }
