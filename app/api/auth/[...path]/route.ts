export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

const BASE = process.env.NEON_AUTH_URL!

// Derive the Neon Auth server's own origin so it trusts the request
// (mirrors what prepareRequestHeaders does in the official handler)
function neonAuthOrigin(): string {
  try {
    const url = new URL(BASE)
    return `${url.protocol}//${url.host}`
  } catch {
    return BASE
  }
}

const NEON_ORIGIN = neonAuthOrigin()

async function proxy(req: NextRequest): Promise<NextResponse> {
  const subPath = req.nextUrl.pathname.replace(/^\/api\/auth\/?/, '')

  const headers: Record<string, string> = {
    'content-type': req.headers.get('content-type') || 'application/json',
    'accept': req.headers.get('accept') || 'application/json',
    // Use the Neon Auth server's own origin — this is how the official handler
    // bypasses the origin/CSRF check (not just x-neon-auth-middleware alone)
    'origin': NEON_ORIGIN,
    'x-neon-auth-middleware': 'true',
  }

  // Forward user-agent, authorization, referer as the official handler does
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
  upstream.headers.forEach((v, k) => {
    const key = k.toLowerCase()
    if (key === 'set-cookie' || key === 'content-type' || key === 'content-length') {
      resHeaders.append(k, v)
    }
  })

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
