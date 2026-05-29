import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getUsers } from '@/lib/db'
import { getUserPhoto } from '@/lib/telegram'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const users = await getUsers()

  // Fetch Telegram profile photos in parallel (max 10 at a time to avoid rate limits)
  const withPhotos = await Promise.all(
    (users as any[]).map(async (u) => {
      const photo = await getUserPhoto(Number(u.telegram_id)).catch(() => null)
      return { ...u, photo }
    })
  )

  return NextResponse.json(withPhotos)
}