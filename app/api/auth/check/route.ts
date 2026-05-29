export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { adminExists } from '@/lib/db'

export async function GET() {
  const hasAdmin = await adminExists()
  return NextResponse.json({ hasAdmin })
}