'use client'
import { useState, useEffect, useRef } from 'react'
import { User, Phone, MapPin, FileText, LayoutList, Search, Loader2, ChevronRight, X, Lock } from 'lucide-react'

export default function Home() {
  const [query, setQuery]       = useState('')
  const [fields, setFields]     = useState<{ key: string; value: string }[]>([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [searched, setSearched] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')

  // Auth state — cleared on refresh (sessionStorage)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [authToken, setAuthToken]   = useState('')
  const [showModal, setShowModal]   = useState(false)
  const [pw, setPw]                 = useState('')
  const [pwError, setPwError]       = useState('')
  const [pwLoading, setPwLoading]   = useState(false)
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pwInputRef  = useRef<HTMLInputElement>(null)

  // Restore token from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('_st')
    if (stored) { setAuthToken(stored); setIsUnlocked(true) }
  }, [])

  // Focus password input when modal opens
  useEffect(() => {
    if (showModal) setTimeout(() => pwInputRef.current?.focus(), 50)
  }, [showModal])

  function handleLogoClick() {
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)
    if (clickCount.current >= 3) {
      clickCount.current = 0
      setShowModal(true)
      setPw(''); setPwError('')
    } else {
      clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 1200)
    }
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!pw.trim()) return
    setPwLoading(true); setPwError('')
    try {
      const r = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      const d = await r.json()
      if (!r.ok) { setPwError('Wrong password'); setPwLoading(false); return }
      sessionStorage.setItem('_st', d.token)
      setAuthToken(d.token)
      setIsUnlocked(true)
      setShowModal(false)
      setPw('')
    } catch {
      setPwError('Network error')
    } finally {
      setPwLoading(false)
    }
  }

  function parseFields(data: any): { key: string; value: string }[] {
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
      return data.map((line: string) => {
        const idx = line.indexOf(':')
        if (idx === -1) return { key: line, value: '' }
        return { key: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() }
      })
    }
    if (typeof data === 'object' && !Array.isArray(data)) {
      return Object.entries(data).map(([k, v]) => ({ key: k, value: String(v ?? '—') }))
    }
    if (Array.isArray(data) && typeof data[0] === 'object') {
      return Object.entries(data[0]).map(([k, v]) => ({ key: k, value: String(v ?? '—') }))
    }
    return []
  }

  async function search(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    // Not unlocked → fake loading then generic error, no hints
    if (!isUnlocked || !authToken) {
      setLoading(true); setError(''); setFields([]); setSearched(false); setDebugInfo('')
      await new Promise(r => setTimeout(r, 1400 + Math.random() * 700))
      setLoading(false)
      setError('Failed API Error')
      return
    }

    setLoading(true); setError(''); setFields([]); setSearched(false); setDebugInfo('')
    try {
      const url = `/api/search?q=${encodeURIComponent(query.trim())}`
      const r   = await fetch(url, { headers: { 'x-search-token': authToken } })
      const text = await r.text()
      setDebugInfo(`Status: ${r.status}\nResponse: ${text.slice(0, 800)}`)
      let d
      try { d = JSON.parse(text) } catch { setError('Invalid response from server'); return }
      if (!r.ok) { setError(d.error || `Error ${r.status}`); return }
      if (!d.data || (Array.isArray(d.data) && d.data.length === 0)) { setSearched(true); return }
      setFields(parseFields(d.data))
      setSearched(true)
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const categories: Record<string, { key: string; value: string }[]> = {}
  fields.forEach(f => {
    const k = f.key.toLowerCase()
    let cat = 'Other'
    if (k.includes('mobile') || k.includes('phone') || k.includes('email') || k.includes('mail')) cat = 'Contact'
    else if (k.includes('name') || k.includes('dob') || k.includes('gender') || k.includes('age')) cat = 'Identity'
    else if (k.includes('address') || k.includes('city') || k.includes('state') || k.includes('pin') || k.includes('district')) cat = 'Address'
    else if (k.includes('document') || k.includes('pan') || k.includes('aadhar') || k.includes('voter') || k.includes('passport')) cat = 'Documents'
    if (!categories[cat]) categories[cat] = []
    categories[cat].push(f)
  })

  const catOrder = ['Identity', 'Contact', 'Address', 'Documents', 'Other']
  const catIcons: Record<string, React.ReactNode> = {
    Identity:  <User size={13} />,
    Contact:   <Phone size={13} />,
    Address:   <MapPin size={13} />,
    Documents: <FileText size={13} />,
    Other:     <LayoutList size={13} />,
  }

  return (
    <main className="min-h-screen bg-ash-900 flex flex-col">
      <header className="border-b border-ash-700 px-6 py-4 flex items-center gap-3">
        {/* Triple-click zone — no visual hint */}
        <span onClick={handleLogoClick} className="flex items-center gap-3 cursor-default select-none">
          <img src="/logo.svg" alt="Drogon" className="w-5 h-5" />
          <span className="font-display font-800 text-xl text-white tracking-tight">Drogon</span>
        </span>
        <span className="text-xs bg-ash-700 text-ash-300 px-2 py-0.5 rounded-full font-mono">free lookup</span>
      </header>

      {/* Password modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-backdrop-in">
          <div className="bg-ash-800 border border-ash-600 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl animate-modal-in">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-white">
                <Lock size={15} className="text-flame-500" />
                <span className="font-display font-700 text-sm">Access required</span>
              </div>
              <button onClick={() => setShowModal(false)} className="text-ash-400 hover:text-ash-200 transition-colors">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={submitPassword} className="flex flex-col gap-3">
              <input
                ref={pwInputRef}
                type="password"
                value={pw}
                onChange={e => { setPw(e.target.value); setPwError('') }}
                placeholder="Password"
                className="w-full bg-ash-900 border border-ash-500 rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-ash-500 focus:outline-none focus:border-flame-500 transition-colors"
              />
              {pwError && (
                <p className="text-red-400 text-xs font-mono">{pwError}</p>
              )}
              <button
                type="submit"
                disabled={pwLoading || !pw.trim()}
                className="w-full py-3 bg-flame-500 hover:bg-flame-600 disabled:opacity-50 text-white font-display font-700 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {pwLoading ? <><Loader2 size={13} className="animate-spin" /> Verifying…</> : 'Unlock'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-start pt-10 md:pt-16 pb-12 px-4 md:px-[10%]">

        {/* Hero */}
        <div className="text-center mb-6 md:mb-10 animate-fade-in max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-flame-500/10 border border-flame-500/20 text-flame-400 text-xs font-mono px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-flame-500 animate-pulse-slow" />
            Powered by Drogon Bot
          </div>
          <h1 className="font-display font-800 text-white mb-4 leading-none" style={{ fontSize: 'clamp(1.75rem, 6vw, 3.8rem)' }}>
            Search anyone by<br />
            <span className="text-flame-500">email</span> or <span className="text-flame-500">number</span>
          </h1>
          <p className="text-ash-300 text-base max-w-sm mx-auto leading-relaxed">
            Enter any Indian mobile number or email address to instantly retrieve all linked information.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={search} className="w-full animate-slide-up mb-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="9876543210 or john@example.com"
                className="w-full bg-ash-800 border border-ash-500 rounded-xl pl-10 pr-4 py-3.5 text-white font-mono text-sm placeholder:text-ash-500"
              />
            </div>
            <button type="submit" disabled={loading}
              className="px-4 sm:px-6 py-3.5 bg-flame-500 hover:bg-flame-600 disabled:opacity-50 text-white font-display font-700 rounded-xl text-sm transition-colors flex items-center gap-1.5 shrink-0">
              {loading
                ? <><Loader2 size={14} className="animate-spin" /><span className="hidden sm:inline">Searching</span></>
                : <><span className="hidden sm:inline">Search</span><ChevronRight size={14} /></>
              }
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-4 w-full bg-red-950/50 border border-red-900 rounded-xl p-4 text-red-300 text-sm font-mono">
            {error}
          </div>
        )}

        {searched && fields.length === 0 && !error && (
          <div className="mt-8 text-ash-400 font-mono text-sm">
            No record found for <span className="text-white">{query}</span>
          </div>
        )}

        {/* Results */}
        {fields.length > 0 && (
          <div className="mt-8 w-full animate-slide-up">

            {/* Summary bar */}
            <div className="flex items-center justify-between px-1 mb-3">
              <span className="text-ash-300 text-sm font-mono">
                <span className="text-white font-600">{fields.length}</span> fields for{' '}
                <span className="text-flame-400">{query}</span>
              </span>
              <button onClick={() => setShowDebug(p => !p)}
                className="text-ash-500 hover:text-ash-300 text-xs font-mono transition-colors">
                {showDebug ? 'hide debug' : 'debug'}
              </button>
            </div>

            {/* Category cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {catOrder.filter(c => categories[c]?.length).map(cat => (
              <div key={cat} className="bg-ash-800 border border-ash-600 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-2.5 border-b border-ash-700 bg-ash-800">
                  <span className="text-flame-500">{catIcons[cat]}</span>
                  <span className="text-ash-200 text-xs font-mono uppercase tracking-wider">{cat}</span>
                  <span className="ml-auto text-ash-500 text-xs font-mono">{categories[cat].length}</span>
                </div>
                <div className="divide-y divide-ash-700/40">
                  {categories[cat].map((f, i) => (
                    <div key={i} className="flex items-start gap-4 px-5 py-3 hover:bg-ash-700/20 transition-colors">
                      <span className="text-ash-400 text-xs font-mono w-20 sm:w-32 shrink-0 pt-0.5 break-all">{f.key}</span>
                      <span className="text-white text-sm font-mono break-all">{f.value || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>

            {/* Debug */}
            {showDebug && debugInfo && (
              <div className="bg-ash-800 border border-ash-600 rounded-xl p-4">
                <div className="text-ash-400 text-xs font-mono mb-2">Debug</div>
                <pre className="text-yellow-300 text-xs font-mono whitespace-pre-wrap break-all">{debugInfo}</pre>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="border-t border-ash-700 px-6 py-4 text-center text-ash-500 text-xs font-mono">
        Drogon — free info lookup
      </footer>
    </main>
  )
}
