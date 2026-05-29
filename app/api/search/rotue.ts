export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')
  if (!q) return NextResponse.json({ error: 'Query required' }, { status: 400 })

  const isEmail  = q.includes('@')
  const isMobile = /^\+?\d{7,15}$/.test(q.replace(/[\s-]/g, ''))

  if (!isEmail && !isMobile)
    return NextResponse.json({ error: 'Send a valid email or mobile number' }, { status: 400 })

  // Auto-add 91 prefix for 10-digit Indian numbers
  let query = q
  if (isMobile) {
    const digits = q.replace(/\D/g, '')
    if (digits.length === 10) query = '91' + digits
  }

  const url = `${process.env.API_BASE_URL}${encodeURIComponent(query)}`

  try {
    const r = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
    if (!r.ok) {
      const body = await r.text()
      return NextResponse.json({ error: `API error ${r.status}` }, { status: 502 })
    }
    const data = await r.json()
    const result = (data && typeof data === 'object' && 'data' in data) ? data.data : data
    return NextResponse.json({ data: result })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to reach API' }, { status: 503 })
  }
}