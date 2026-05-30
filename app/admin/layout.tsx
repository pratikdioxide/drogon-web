'use client'
import dynamic from 'next/dynamic'
import { authClient } from '@/lib/neon-auth'

const NeonAuthUIProvider = dynamic(
  () => import('@neondatabase/auth-ui').then((m) => ({ default: m.NeonAuthUIProvider })),
  { ssr: false }
)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider authClient={authClient as any} redirectTo="/admin/dashboard" signUp={false}>
      {children}
    </NeonAuthUIProvider>
  )
}
