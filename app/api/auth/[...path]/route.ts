export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

const BASE = process.env.NEON_AUTH_URL!

async function proxy(req: NextRequest): Promise<NextResponse> {
  // Extract sub-path from URL directly — avoids Next.js 14/15 params incompatibility
  const subPath = req.nextUrl.pathname.replace(/^\/api\/auth\/?/, '')

  const origin =
    req.headers.get('origin') ||
    req.headers.get('referer')?.split('/').slice(0, 3).join('/') ||
    new URL(req.url).origin

  const headers: Record<string, string> = {
    'content-type': req.headers.get('content-type') || 'application/json',
    'accept': req.headers.get('accept') || 'application/json',
    'origin': origin,
    'x-neon-auth-middleware': 'true',
  }

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
