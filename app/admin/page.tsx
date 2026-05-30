'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/neon-auth'
import { Loader2 } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/admin/dashboard',
      })
      if (result?.error) {
        setError('Invalid email or password.')
      } else {
        router.push('/admin/dashboard')
      }
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-ash-900 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.svg" alt="Drogon" className="w-7 h-7" />
          <h1 className="font-display font-800 text-2xl text-white">Drogon Admin</h1>
        </div>
        <p className="text-ash-400 text-sm font-mono mt-1">Sign in to your account</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-ash-800 border border-ash-700 rounded-xl shadow-xl p-8 flex flex-col gap-5"
      >
        <div>
          <h2 className="text-white font-semibold text-lg">Sign In</h2>
          <p className="text-ash-400 text-xs font-mono mt-0.5">Enter your email below to login</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-ash-300 text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="m@example.com"
            className="bg-ash-900 border border-ash-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-ash-500 focus:outline-none focus:border-ash-500 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-ash-300 text-sm font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className="bg-ash-900 border border-ash-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-ash-500 focus:outline-none focus:border-ash-500 transition"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center font-mono">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-white hover:bg-ash-100 disabled:opacity-50 text-ash-900 font-semibold rounded-lg py-2.5 text-sm transition flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>

      <p className="mt-6">
        <a href="/" className="text-ash-500 hover:text-ash-300 text-xs font-mono transition-colors">
          back to search
        </a>
      </p>
    </main>
  )
}
