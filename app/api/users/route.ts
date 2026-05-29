export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/server-auth'
import { getUsers } from '@/lib/db'
import { getUserPhoto } from '@/lib/telegram'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const users = await getUsers()

  const withPhotos = await Promise.all(
    (users as any[]).map(async (u) => {
      const photo = await getUserPhoto(Number(u.telegram_id)).catch(() => null)
      return { ...u, photo }
    })
  )

  return NextResponse.json(withPhotos)
}
