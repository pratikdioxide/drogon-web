'use client'
import { NeonAuthUIProvider } from '@neondatabase/auth-ui'
import '@neondatabase/auth-ui/css'
import { authClient } from '@/lib/neon-auth'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const redirectTo = typeof window !== 'undefined'
    ? `${window.location.origin}/admin/dashboard`
    : '/admin/dashboard'

  return (
    <NeonAuthUIProvider authClient={authClient as any} redirectTo={redirectTo}>
      {children}
    </NeonAuthUIProvider>
  )
}
