'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  telegram_id: number
  username: string | null
  first_name: string | null
  joined_at: string
  last_seen: string
  total_lookups: number
  photo?: string | null
}

type BotStatus = {
  status: string
  bot: string
  started_at: string
  uptime: string
  queries_total: number
  python: string
  platform: string
}

type Campaign = {
  id: number
  message: string
  sent_to: number
  created_at: string
}

type Tab = 'users' | 'campaign' | 'bot'

export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab]           = useState<Tab>('users')
  const [users, setUsers]       = useState<User[]>([])
  const [botStatus, setBotStatus] = useState<BotStatus | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading]   = useState(true)

  // Campaign
  const [msg, setMsg]           = useState('')
  const [preview, setPreview]   = useState(false)
  const [sending, setSending]   = useState(false)
  const [sendResult, setSendResult] = useState<{ sent: number; failed: number } | null>(null)

  // Search/filter
  const [search, setSearch]     = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const [uRes, bRes, cRes] = await Promise.all([
      fetch('/api/users'),
      fetch('/api/bot-status'),
      fetch('/api/campaign'),
    ])
    if (uRes.ok) setUsers(await uRes.json())
    if (bRes.ok) setBotStatus(await bRes.json())
    if (cRes.ok) setCampaigns(await cRes.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  async function sendCampaign() {
    if (!msg.trim()) return
    setSending(true); setSendResult(null)
    const r = await fetch('/api/campaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
    })
    const d = await r.json()
    setSendResult(d)
    setSending(false)
    if (r.ok) { setMsg(''); load() }
  }

  const filtered = users.filter(u =>
    !search ||
    u.first_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    String(u.telegram_id).includes(search)
  )

  function initials(u: User) {
    return (u.first_name?.[0] || u.username?.[0] || '?').toUpperCase()
  }

  function colorFor(id: number) {
    const colors = ['bg-flame-500', 'bg-purple-600', 'bg-blue-600', 'bg-emerald-600', 'bg-pink-600', 'bg-yellow-600']
    return colors[id % colors.length]
  }

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 1) return 'just now'
    if (m < 60) return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-ash-900 font-display">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-ash-800 border-r border-ash-600 flex flex-col items-center py-6 gap-6 z-10">
        <span className="text-2xl">🐉</span>
        <nav className="flex flex-col gap-2 mt-4">
          {([
            { id: 'users',    icon: '👥', label: 'Users'    },
            { id: 'campaign', icon: '📢', label: 'Campaign' },
            { id: 'bot',      icon: '⚙️', label: 'Bot'      },
          ] as { id: Tab; icon: string; label: string }[]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              title={t.label}
              className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-colors ${
                tab === t.id ? 'bg-flame-500 text-white' : 'text-ash-300 hover:bg-ash-700'
              }`}>
              {t.icon}
            </button>
          ))}
        </nav>
        <button onClick={logout} title="Logout"
          className="mt-auto text-ash-400 hover:text-red-400 transition-colors text-lg">
          ⏻
        </button>
      </div>

      {/* Main content */}
      <div className="ml-16 p-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users',   value: users.length,                            icon: '👥' },
            { label: 'Total Lookups', value: users.reduce((s, u) => s + u.total_lookups, 0), icon: '🔍' },
            { label: 'Bot Status',    value: botStatus?.status === 'ok' ? 'Online' : '—', icon: '🟢' },
            { label: 'Uptime',        value: botStatus?.uptime || '—',                 icon: '⏱' },
          ].map(s => (
            <div key={s.label} className="bg-ash-800 border border-ash-600 rounded-xl p-4">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-display font-700 text-xl text-white">{s.value}</div>
              <div className="text-ash-300 text-xs font-mono mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── USERS TAB ────────────────────────────────────── */}
        {tab === 'users' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-800 text-xl text-white">Users</h2>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, username, ID…"
                className="bg-ash-700 border border-ash-500 rounded-lg px-4 py-2 text-white text-sm font-mono w-64" />
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-flame-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(u => (
                  <div key={u.telegram_id}
                    className="user-card bg-ash-800 border border-ash-600 hover:border-flame-500/40 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Avatar */}
                      {u.photo
                        ? <img src={u.photo} alt="" className="w-12 h-12 rounded-full object-cover" />
                        : <div className={`w-12 h-12 rounded-full ${colorFor(u.telegram_id)} flex items-center justify-center text-white font-700 text-lg`}>
                            {initials(u)}
                          </div>
                      }
                      <div>
                        <div className="text-white font-600">{u.first_name || 'Unknown'}</div>
                        <div className="text-ash-300 text-xs font-mono">
                          {u.username ? `@${u.username}` : `ID: ${u.telegram_id}`}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs font-mono">
                      <Row label="Telegram ID" value={String(u.telegram_id)} />
                      <Row label="Lookups"     value={String(u.total_lookups)} accent />
                      <Row label="Joined"      value={timeAgo(u.joined_at)} />
                      <Row label="Last seen"   value={timeAgo(u.last_seen)} />
                    </div>
                    {u.username && (
                      <a href={`https://t.me/${u.username}`} target="_blank"
                        className="mt-4 block text-center text-xs text-ash-300 hover:text-flame-400 font-mono transition-colors">
                        Open in Telegram →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CAMPAIGN TAB ─────────────────────────────────── */}
        {tab === 'campaign' && (
          <div className="animate-fade-in max-w-2xl">
            <h2 className="font-800 text-xl text-white mb-5">📢 Broadcast Campaign</h2>

            <div className="bg-ash-800 border border-ash-600 rounded-xl p-6 mb-6">
              <label className="block text-ash-200 text-xs font-mono mb-2">Message (HTML supported)</label>
              <textarea
                value={msg} onChange={e => setMsg(e.target.value)} rows={6}
                placeholder="Type your message here…&#10;&#10;You can use <b>bold</b>, <i>italic</i>, <code>code</code>"
                className="w-full bg-ash-700 border border-ash-500 rounded-lg px-4 py-3 text-white text-sm font-mono resize-none"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-ash-400 text-xs font-mono">
                  Will be sent to <b className="text-white">{users.length}</b> users
                </span>
                <div className="flex gap-3">
                  <button onClick={() => setPreview(p => !p)}
                    className="px-4 py-2 bg-ash-700 hover:bg-ash-600 text-ash-200 rounded-lg text-sm transition-colors">
                    {preview ? 'Edit' : 'Preview'}
                  </button>
                  <button onClick={sendCampaign} disabled={sending || !msg.trim()}
                    className="px-5 py-2 bg-flame-500 hover:bg-flame-600 disabled:opacity-50 text-white rounded-lg text-sm font-600 transition-colors">
                    {sending ? 'Sending…' : '🚀 Send to All'}
                  </button>
                </div>
              </div>
            </div>

            {preview && msg && (
              <div className="bg-ash-800 border border-flame-500/30 rounded-xl p-6 mb-6 glow-flame">
                <div className="text-xs text-ash-400 font-mono mb-3">Preview</div>
                <div className="text-white text-sm" dangerouslySetInnerHTML={{ __html: msg }} />
              </div>
            )}

            {sendResult && (
              <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-4 font-mono text-sm text-emerald-300 mb-6">
                ✅ Sent to {sendResult.sent} users · {sendResult.failed} failed
              </div>
            )}

            {/* Campaign history */}
            <h3 className="font-700 text-white mb-3">History</h3>
            <div className="space-y-3">
              {campaigns.map(c => (
                <div key={c.id} className="bg-ash-800 border border-ash-600 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-ash-400 font-mono">{new Date(c.created_at).toLocaleString()}</span>
                    <span className="text-xs bg-ash-700 text-ash-200 px-2 py-0.5 rounded-full font-mono">
                      {c.sent_to} users
                    </span>
                  </div>
                  <p className="text-ash-200 text-sm font-mono line-clamp-2">{c.message}</p>
                </div>
              ))}
              {campaigns.length === 0 && (
                <p className="text-ash-400 text-sm font-mono">No campaigns sent yet.</p>
              )}
            </div>
          </div>
        )}

        {/* ── BOT STATUS TAB ───────────────────────────────── */}
        {tab === 'bot' && (
          <div className="animate-fade-in max-w-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-800 text-xl text-white">⚙️ Bot Status</h2>
              <button onClick={load}
                className="px-4 py-2 bg-ash-700 hover:bg-ash-600 text-ash-200 rounded-lg text-sm transition-colors font-mono">
                ↻ Refresh
              </button>
            </div>

            {botStatus ? (
              <div className="space-y-4">
                {/* Status banner */}
                <div className={`rounded-xl p-5 border flex items-center gap-4 glow-flame ${
                  botStatus.status === 'ok'
                    ? 'bg-emerald-900/20 border-emerald-700'
                    : 'bg-red-900/20 border-red-700'
                }`}>
                  <div className={`w-4 h-4 rounded-full animate-pulse-slow ${
                    botStatus.status === 'ok' ? 'bg-emerald-400' : 'bg-red-400'
                  }`} />
                  <div>
                    <div className="text-white font-700 text-lg">{botStatus.bot}</div>
                    <div className="text-ash-300 text-sm font-mono">
                      {botStatus.status === 'ok' ? '🟢 Online' : '🔴 Offline'}
                    </div>
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Uptime',         value: botStatus.uptime           },
                    { label: 'Total Queries',   value: String(botStatus.queries_total) },
                    { label: 'Python',          value: botStatus.python           },
                    { label: 'Platform',        value: botStatus.platform         },
                  ].map(m => (
                    <div key={m.label} className="bg-ash-800 border border-ash-600 rounded-xl p-4">
                      <div className="text-ash-400 text-xs font-mono mb-1">{m.label}</div>
                      <div className="text-white font-mono font-500">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Raw JSON */}
                <div className="bg-ash-800 border border-ash-600 rounded-xl p-5">
                  <div className="text-ash-400 text-xs font-mono mb-3">Raw JSON</div>
                  <pre className="text-ash-200 text-xs font-mono overflow-x-auto leading-relaxed">
                    {JSON.stringify(botStatus, null, 2)}
                  </pre>
                </div>

                <div className="text-xs text-ash-400 font-mono">
                  Started at: {new Date(botStatus.started_at).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="bg-ash-800 border border-ash-600 rounded-xl p-8 text-center text-ash-400 font-mono text-sm">
                {loading ? 'Loading…' : '⚠ Could not reach bot health endpoint'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-ash-400">{label}</span>
      <span className={accent ? 'text-flame-400 font-500' : 'text-ash-200'}>{value}</span>
    </div>
  )
}