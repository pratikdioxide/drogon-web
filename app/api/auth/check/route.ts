export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { adminExists } from '@/lib/db'

export async function GET() {
  try {
    const hasAdmin = await adminExists()
    return NextResponse.json({ hasAdmin })
  } catch (e: any) {
    console.error('auth/check error:', e?.message)
    // Return valid JSON even on DB error — default to signup
    return NextResponse.json({ hasAdmin: false, error: 'DB unavailable' })
  }
}