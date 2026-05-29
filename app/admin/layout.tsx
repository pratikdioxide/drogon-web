'use client'
import { NeonAuthUIProvider } from '@neondatabase/auth-ui'
import '@neondatabase/auth-ui/css'
import { authClient } from '@/lib/neon-auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider authClient={authClient as any} redirectTo="/admin/dashboard">
      {children}
    </NeonAuthUIProvider>
  )
}
