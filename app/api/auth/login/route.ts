export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getAdminByEmail } from '@/lib/db'
import { signToken, cookieOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (!email || !password)
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 })

  const admin = await getAdminByEmail(email)
  if (!admin)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const valid = await bcrypt.compare(password, admin.password_hash)
  if (!valid)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const token = await signToken({ email: admin.email, id: admin.id })
  const res   = NextResponse.json({ ok: true })
  res.cookies.set({ ...cookieOptions(), value: token })
  return res
}