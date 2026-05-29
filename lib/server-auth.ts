import { auth } from '@/lib/neon-server-auth'

export async function getSession() {
  try {
    const { data, error } = await auth.getSession()
    if (error || !data?.user) return null
    return data
  } catch {
    return null
  }
}
