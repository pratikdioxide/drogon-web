export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/server-auth'
import { getAllTelegramIds, getCampaigns, saveCampaign } from '@/lib/db'
import { broadcastMessage } from '@/lib/telegram'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await getCampaigns()
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { message } = await req.json()
  if (!message?.trim())
    return NextResponse.json({ error: 'Message required' }, { status: 400 })

  const ids = await getAllTelegramIds()
  if (!ids.length)
    return NextResponse.json({ error: 'No users to send to' }, { status: 400 })

  const { sent, failed } = await broadcastMessage(ids, message)
  await saveCampaign(message, sent)

  return NextResponse.json({ ok: true, sent, failed, total: ids.length })
}
