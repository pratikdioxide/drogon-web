export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')
  if (!q) return NextResponse.json({ error: 'Query required' }, { status: 400 })

  const isEmail  = q.includes('@') && q.includes('.')
  const isMobile = /^\+?\d[\d\s-]{6,14}$/.test(q)

  if (!isEmail && !isMobile)
    return NextResponse.json({ error: 'Send a valid email or mobile number' }, { status: 400 })

  // Auto-add 91 prefix for 10-digit Indian numbers
  let query = q
  if (isMobile) {
    const digits = q.replace(/\D/g, '')
    if (digits.length === 10) query = '91' + digits
    else query = digits
  }

  const baseUrl = process.env.API_BASE_URL
  if (!baseUrl)
    return NextResponse.json({ error: 'API_BASE_URL not configured' }, { status: 500 })

  const url = `${baseUrl}${encodeURIComponent(query)}`

  try {
    const r = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15000),
    })

    if (r.status === 404)
      return NextResponse.json({ data: null }, { status: 200 })

    if (!r.ok)
      return NextResponse.json({ error: `API error ${r.status}` }, { status: 502 })

    const data = await r.json()
    const result = (data && typeof data === 'object' && 'data' in data) ? data.data : data
    return NextResponse.json({ data: result })
  } catch (e: any) {
    console.error('Search error:', e?.message)
    return NextResponse.json({ error: 'Failed to reach API' }, { status: 503 })
  }
}