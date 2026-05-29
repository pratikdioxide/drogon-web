import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET!)
const COOKIE = 'drogon_admin'
const TTL    = 60 * 60 * 24 * 7  // 7 days

export async function signToken(payload: { email: string; id: number }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(await secret())
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, await secret())
    return payload as { email: string; id: number }
  } catch {
    return null
  }
}

export async function getSession() {
  const token = cookies().get(COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

export function cookieOptions() {
  return {
    name: COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: TTL,
    path: '/',
  }
}