export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

const BASE = process.env.NEON_AUTH_URL!

async function proxy(req: NextRequest, path: string): Promise<NextResponse> {
  const url = `${BASE}/${path}`

  const headers: Record<string, string> = {
    'content-type': req.headers.get('content-type') || 'application/json',
    'accept': req.headers.get('accept') || 'application/json',
  }
  const cookie = req.headers.get('cookie')
  if (cookie) headers['cookie'] = cookie
  const origin = req.headers.get('origin')
  if (origin) headers['origin'] = origin
  const host = req.headers.get('host')
  if (host) headers['x-forwarded-host'] = host

  let body: BodyInit | undefined
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await req.arrayBuffer()
  }

  const upstream = await fetch(url, {
    method: req.method,
    headers,
    body,
  })

  const resHeaders = new Headers()
  upstream.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'set-cookie' || k.toLowerCase() === 'content-type') {
      resHeaders.set(k, v)
    }
  })

  const data = await upstream.arrayBuffer()
  return new NextResponse(data, {
    status: upstream.status,
    headers: resHeaders,
  })
}

export async function GET(req: NextRequest, { params }: { params: { all: string[] } }) {
  return proxy(req, params.all.join('/'))
}
export async function POST(req: NextRequest, { params }: { params: { all: string[] } }) {
  return proxy(req, params.all.join('/'))
}
export async function PUT(req: NextRequest, { params }: { params: { all: string[] } }) {
  return proxy(req, params.all.join('/'))
}
export async function DELETE(req: NextRequest, { params }: { params: { all: string[] } }) {
  return proxy(req, params.all.join('/'))
}
export async function PATCH(req: NextRequest, { params }: { params: { all: string[] } }) {
  return proxy(req, params.all.join('/'))
}
