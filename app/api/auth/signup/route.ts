export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { adminExists, createAdmin } from '@/lib/db'
import { signToken, cookieOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password, invite } = await req.json()

  if (!email || !password || !invite)
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })

  if (invite !== process.env.ADMIN_INVITE_CODE)
    return NextResponse.json({ error: 'Invalid invite code' }, { status: 403 })

  if (await adminExists())
    return NextResponse.json({ error: 'Admin already exists. Please sign in.' }, { status: 409 })

  const passwordHash = await bcrypt.hash(password, 12)
  const rows = await createAdmin(email, passwordHash)
  const admin = rows[0] as { id: number; email: string }

  const token = await signToken({ email: admin.email, id: admin.id })
  const res   = NextResponse.json({ ok: true })
  res.cookies.set({ ...cookieOptions(), value: token })
  return res
}