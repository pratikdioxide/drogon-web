export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = process.env.BOT_HEALTH_URL
  if (!url) return NextResponse.json({ error: 'BOT_HEALTH_URL not set' }, { status: 500 })

  try {
    const r = await fetch(url, { next: { revalidate: 30 } })
    const d = await r.json()
    return NextResponse.json(d)
  } catch {
    return NextResponse.json({ error: 'Bot unreachable' }, { status: 503 })
  }
}