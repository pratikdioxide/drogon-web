import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ')

  try {
    const r = await fetch(`${process.env.NEON_AUTH_URL}/get-session`, {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    })
    if (!r.ok) return null
    const data = await r.json()
    return data?.user ? data : null
  } catch {
    return null
  }
}
