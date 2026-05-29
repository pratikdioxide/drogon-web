'use client'
import { AuthView } from '@neondatabase/auth-ui'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-ash-900 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="font-display font-800 text-2xl text-white">Drogon Admin</h1>
        <p className="text-ash-400 text-sm font-mono mt-1">Sign in to your account</p>
      </div>
      <AuthView
        pathname="sign-in"
        redirectTo="/admin/dashboard"
      />
      <p className="mt-6">
        <a href="/" className="text-ash-500 hover:text-ash-300 text-xs font-mono transition-colors">
          back to search
        </a>
      </p>
    </main>
  )
}
