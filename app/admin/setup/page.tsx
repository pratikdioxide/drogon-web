'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/neon-auth'
import { Loader2 } from 'lucide-react'

export default function SetupPage() {
  const router = useRouter()
  const [inviteCode, setInviteCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (inviteCode !== 'drogon_admin_2024') {
      setError('Invalid invite code.')
      return
    }

    setLoading(true)
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/admin/dashboard',
      })
      if (result?.error) {
        setError(result.error.message || 'Failed to create account.')
      } else {
        router.push('/admin/dashboard')
      }
    } catch {
      setError('Failed to create account. It may already exist.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-ash-900 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.svg" alt="Drogon" className="w-7 h-7" />
          <h1 className="font-display font-800 text-2xl text-white">Admin Setup</h1>
        </div>
        <p className="text-ash-400 text-sm font-mono mt-1">Create your admin account</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Invite Code</label>
          <input
            type="text"
            required
            value={inviteCode}
            onChange={e => setInviteCode(e.target.value)}
            placeholder="Enter invite code"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="m@example.com"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white font-medium rounded-lg py-2.5 text-sm transition flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {loading ? 'Creating…' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6">
        <a href="/admin" className="text-ash-500 hover:text-ash-300 text-xs font-mono transition-colors">
          back to sign in
        </a>
      </p>
    </main>
  )
}
