'use client'
import { useState } from 'react'

type Record = { [key: string]: string }

export default function Home() {
  const [query, setQuery]     = useState('')
  const [result, setResult]   = useState<Record | Record[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [page, setPage]       = useState(0)

  async function search(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true); setError(''); setResult(null); setPage(0)
    try {
      const r = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
      const d = await r.json()
      if (!r.ok) { setError(d.error || 'Search failed'); return }
      setResult(d.data)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const records = Array.isArray(result) ? result : result ? [result] : []
  const current = records[page]

  return (
    <main className="min-h-screen bg-ash-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-ash-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display font-800 text-xl text-white tracking-tight">Drogon</span>
          <span className="text-xs bg-ash-700 text-ash-200 px-2 py-0.5 rounded-full font-mono">free lookup</span>
        </div>
        <a href="/admin"
          className="text-xs bg-ash-700 hover:bg-ash-600 border border-ash-500 hover:border-flame-500/50 text-ash-200 hover:text-white px-3 py-1.5 rounded-lg font-mono transition-all">
          Admin Panel
        </a>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-start pt-20 px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-800 text-4xl md:text-5xl text-white mb-4 text-glow">
            Find anyone instantly
          </h1>
          <p className="text-ash-200 text-lg max-w-md mx-auto">
            Enter an email or mobile number to retrieve all available information from the database.
          </p>
        </div>

        {/* Search box */}
        <form onSubmit={search} className="w-full max-w-xl animate-slide-up">
          <div className="relative">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="john@example.com  or  9876543210"
              className="w-full bg-ash-800 border border-ash-500 rounded-xl px-5 py-4 text-white font-mono text-sm placeholder:text-ash-400 pr-32"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-5 bg-flame-500 hover:bg-flame-600 disabled:opacity-50 text-white font-display font-600 rounded-lg text-sm transition-colors"
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
          <p className="text-center text-ash-400 text-xs mt-3 font-mono">
            Works with email addresses and Indian mobile numbers
          </p>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-6 w-full max-w-xl bg-red-900/20 border border-red-800 rounded-xl p-4 text-red-300 text-sm font-mono animate-fade-in">
            {error}
          </div>
        )}

        {/* Results */}
        {records.length > 0 && current && (
          <div className="mt-8 w-full max-w-xl animate-slide-up">
            {records.length > 1 && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-ash-300 text-sm font-mono">
                  Result {page + 1} of {records.length}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => p - 1)} disabled={page === 0}
                    className="px-3 py-1 bg-ash-700 hover:bg-ash-600 disabled:opacity-30 rounded-lg text-sm transition-colors">
                    Prev
                  </button>
                  <button onClick={() => setPage(p => p + 1)} disabled={page === records.length - 1}
                    className="px-3 py-1 bg-ash-700 hover:bg-ash-600 disabled:opacity-30 rounded-lg text-sm transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}

            <div className="bg-ash-800 border border-flame-500/30 rounded-xl p-6 glow-flame">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-flame-500 animate-pulse-slow" />
                <span className="text-flame-400 text-sm font-mono font-500">record found</span>
              </div>
              <div className="space-y-3">
                {Object.entries(current).map(([k, v]) => (
                  <div key={k} className="flex gap-3 border-b border-ash-600 pb-3 last:border-0 last:pb-0">
                    <span className="text-ash-300 text-sm font-mono w-32 shrink-0">{k}</span>
                    <span className="text-white text-sm font-mono break-all">{String(v) || '—'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {result !== null && records.length === 0 && !loading && (
          <div className="mt-8 text-ash-300 font-mono text-sm animate-fade-in">
            No record found for <span className="text-white">{query}</span>
          </div>
        )}
      </div>

      <footer className="border-t border-ash-700 px-6 py-4 text-center text-ash-400 text-xs font-mono">
        Drogon — free info lookup
      </footer>
    </main>
  )
}