'use client'
import dynamic from 'next/dynamic'
import '@neondatabase/auth-ui/css'
import { authClient } from '@/lib/neon-auth'

const NeonAuthUIProvider = dynamic(
  () => import('@neondatabase/auth-ui').then((m) => ({ default: m.NeonAuthUIProvider })),
  { ssr: false }
)

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider authClient={authClient as any} redirectTo="/admin/dashboard">
      {children}
    </NeonAuthUIProvider>
  )
}
