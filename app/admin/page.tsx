'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [mode, setMode]         = useState<'login' | 'signup' | 'loading'>('loading')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [invite, setInvite]     = useState('')
  const [error, setError]       = useState('')
  const [busy, setBusy]         = useState(false)

  useEffect(() => {
    fetch('/api/auth/check')
      .then(async r => {
        if (!r.ok) { setMode('signup'); return }
        const text = await r.text()
        if (!text) { setMode('signup'); return }
        try {
          const d = JSON.parse(text)
          setMode(d.hasAdmin ? 'login' : 'signup')
        } catch {
          setMode('signup')
        }
      })
      .catch(() => setMode('signup'))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setError('')
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup'
    const body = mode === 'login' ? { email, password } : { email, password, invite }

    try {
      const r    = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const text = await r.text()
      const d    = text ? JSON.parse(text) : {}
      if (!r.ok) { setError(d.error || 'Something went wrong'); setBusy(false); return }
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Network error')
      setBusy(false)
    }
  }

  if (mode === 'loading') {
    return (
      <div className="min-h-screen bg-ash-900 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-flame-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-ash-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-flame-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="font-display font-800 text-2xl text-white">Drogon Admin</h1>
          <p className="text-ash-300 text-sm mt-1 font-mono">
            {mode === 'signup' ? 'First time setup — create admin account' : 'Sign in to dashboard'}
          </p>
        </div>

        <div className="bg-ash-800 border border-ash-500 rounded-2xl p-7">
          {mode === 'signup' && (
            <div className="bg-flame-500/10 border border-flame-500/30 rounded-lg px-4 py-3 mb-5 text-flame-400 text-xs font-mono">
              No admin found — set up your account below
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-ash-200 text-xs font-mono mb-1.5">Email</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-ash-700 border border-ash-500 rounded-lg px-4 py-2.5 text-white text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-ash-200 text-xs font-mono mb-1.5">Password</label>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-ash-700 border border-ash-500 rounded-lg px-4 py-2.5 text-white text-sm font-mono"
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-ash-200 text-xs font-mono mb-1.5">Invite Code</label>
                <input
                  type="text" required value={invite} onChange={e => setInvite(e.target.value)}
                  placeholder="Your invite code"
                  className="w-full bg-ash-700 border border-ash-500 rounded-lg px-4 py-2.5 text-white text-sm font-mono"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-900/20 border border-red-800 rounded-lg px-4 py-2.5 text-red-300 text-xs font-mono">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={busy}
              className="w-full bg-flame-500 hover:bg-flame-600 disabled:opacity-50 text-white font-display font-600 rounded-lg py-2.5 transition-colors mt-2">
              {busy ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center mt-4">
          <a href="/" className="text-ash-400 hover:text-ash-200 text-xs font-mono transition-colors">
            back to search
          </a>
        </p>
      </div>
    </main>
  )
}