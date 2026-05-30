'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/neon-auth'
import {
  Users, Search, Megaphone, Settings, LogOut,
  RefreshCw, Send, Eye, EyeOff, ExternalLink,
  Bot, Clock, Activity, Hash, ChevronRight,
  AlertCircle, CheckCircle2, Loader2
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
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

// ── Skeleton components ───────────────────────────────────────────────────────
function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-ash-700 rounded animate-pulse ${className}`} />
  )
}

function StatCardSkeleton() {
  return (
    <div className="bg-ash-800 border border-ash-700 rounded-xl p-4 space-y-3">
      <SkeletonBlock className="w-8 h-8 rounded-lg" />
      <SkeletonBlock className="w-16 h-6 rounded" />
      <SkeletonBlock className="w-24 h-3 rounded" />
    </div>
  )
}

function UserCardSkeleton() {
  return (
    <div className="bg-ash-800 border border-ash-700 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonBlock className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="w-28 h-4 rounded" />
          <SkeletonBlock className="w-20 h-3 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex justify-between">
            <SkeletonBlock className="w-20 h-3 rounded" />
            <SkeletonBlock className="w-16 h-3 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

function CampaignRowSkeleton() {
  return (
    <div className="bg-ash-800 border border-ash-700 rounded-xl p-4 space-y-3">
      <div className="flex justify-between">
        <SkeletonBlock className="w-32 h-3 rounded" />
        <SkeletonBlock className="w-16 h-5 rounded-full" />
      </div>
      <SkeletonBlock className="w-full h-3 rounded" />
      <SkeletonBlock className="w-3/4 h-3 rounded" />
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function initials(u: User) {
  return (u.first_name?.[0] || u.username?.[0] || '?').toUpperCase()
}

const AVATAR_COLORS = [
  'bg-flame-500', 'bg-purple-600', 'bg-blue-600',
  'bg-emerald-600', 'bg-pink-600', 'bg-yellow-600',
]
function colorFor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length]
}

// ── Row helper ────────────────────────────────────────────────────────────────
function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-ash-400">{label}</span>
      <span className={accent ? 'text-flame-400 font-medium' : 'text-ash-200'}>{value}</span>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('users')
  const [users, setUsers] = useState<User[]>([])
  const [botStatus, setBotStatus] = useState<BotStatus | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  const [msg, setMsg] = useState('')
  const [preview, setPreview] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ sent: number; failed: number } | null>(null)

  const [search, setSearch] = useState('')

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
    await authClient.signOut()
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

  const totalLookups = users.reduce((s, u) => s + u.total_lookups, 0)

  const NAV_ITEMS: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: 'users',    icon: <Users size={18} />,    label: 'Users'    },
    { id: 'campaign', icon: <Megaphone size={18} />, label: 'Campaign' },
    { id: 'bot',      icon: <Bot size={18} />,       label: 'Bot'      },
  ]

  return (
    <div className="min-h-screen bg-ash-900 font-display flex">

      {/* ── Bottom nav (mobile) ────────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-ash-800 border-t border-ash-700 flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
              tab === t.id ? 'text-flame-400 bg-flame-500/10' : 'text-ash-400'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
        <button
          onClick={logout}
          className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-mono text-ash-400 hover:text-red-400"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>

      {/* ── Main ──────────────────────────────────────────────────────── */}
      <main className="flex-1 px-4 md:px-8 pt-6 pb-24 md:pb-8 max-w-full overflow-x-hidden">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white font-semibold text-lg leading-tight">Drogon Admin</h1>
            <p className="text-ash-400 text-xs font-mono mt-0.5">
              {NAV_ITEMS.find(n => n.id === tab)?.label}
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="p-2 rounded-lg bg-ash-800 border border-ash-700 text-ash-400 hover:text-ash-200 hover:border-ash-500 transition-all disabled:opacity-40"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* ── Stat Cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
          {loading ? (
            [1,2,3,4].map(i => <StatCardSkeleton key={i} />)
          ) : (
            [
              { label: 'Total Users',   value: users.length,                                     icon: <Users size={16} />,    sub: 'registered' },
              { label: 'Total Lookups', value: totalLookups,                                     icon: <Search size={16} />,   sub: 'all time'   },
              { label: 'Bot Status',    value: botStatus?.status === 'ok' ? 'Online' : 'Offline', icon: <Activity size={16} />, sub: 'current'    },
              { label: 'Uptime',        value: botStatus?.uptime || '—',                          icon: <Clock size={16} />,    sub: 'running'    },
            ].map(s => (
              <div key={s.label} className="bg-ash-800 border border-ash-700 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-ash-700 flex items-center justify-center text-ash-300 mb-3">
                  {s.icon}
                </div>
                <div className="text-white font-semibold text-xl leading-none mb-1">{s.value}</div>
                <div className="text-ash-400 text-xs font-mono">{s.label}</div>
              </div>
            ))
          )}
        </div>

        {/* ── USERS TAB ──────────────────────────────────────────────── */}
        {tab === 'users' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h2 className="text-white font-semibold text-base">
                Users
                {!loading && (
                  <span className="ml-2 text-xs text-ash-400 font-mono font-normal">
                    {filtered.length} of {users.length}
                  </span>
                )}
              </h2>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Name, username, ID…"
                  className="bg-ash-800 border border-ash-700 rounded-lg pl-8 pr-4 py-2 text-white text-sm font-mono w-full sm:w-56 focus:outline-none focus:border-ash-500 transition-colors"
                />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(i => <UserCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-ash-500">
                <Users size={32} className="mb-3 opacity-40" />
                <p className="font-mono text-sm">No users found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(u => (
                  <div
                    key={u.telegram_id}
                    className="bg-ash-800 border border-ash-700 hover:border-ash-500 rounded-xl p-5 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {u.photo ? (
                        <img src={u.photo} alt="" className="w-11 h-11 rounded-full object-cover" />
                      ) : (
                        <div className={`w-11 h-11 rounded-full ${colorFor(u.telegram_id)} flex items-center justify-center text-white font-semibold text-base`}>
                          {initials(u)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-white font-medium text-sm truncate">{u.first_name || 'Unknown'}</div>
                        <div className="text-ash-400 text-xs font-mono truncate">
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
                      <a
                        href={`https://t.me/${u.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ash-400 hover:text-ash-200 font-mono transition-colors"
                      >
                        Open in Telegram
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CAMPAIGN TAB ───────────────────────────────────────────── */}
        {tab === 'campaign' && (
          <div className="max-w-2xl">
            <h2 className="text-white font-semibold text-base mb-5">Broadcast Campaign</h2>

            {/* Composer */}
            <div className="bg-ash-800 border border-ash-700 rounded-xl p-5 mb-5">
              <label className="block text-ash-300 text-xs font-mono mb-2">
                Message <span className="text-ash-500">(HTML supported: &lt;b&gt;, &lt;i&gt;, &lt;code&gt;)</span>
              </label>
              <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                rows={6}
                placeholder="Type your message here…"
                className="w-full bg-ash-900 border border-ash-700 rounded-lg px-4 py-3 text-white text-sm font-mono resize-none focus:outline-none focus:border-ash-500 transition-colors"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                <span className="text-ash-400 text-xs font-mono">
                  Sending to{' '}
                  <span className="text-white font-medium">{users.length}</span> users
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreview(p => !p)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-ash-700 hover:bg-ash-600 text-ash-200 rounded-lg text-sm transition-colors font-mono"
                  >
                    {preview ? <EyeOff size={14} /> : <Eye size={14} />}
                    {preview ? 'Edit' : 'Preview'}
                  </button>
                  <button
                    onClick={sendCampaign}
                    disabled={sending || !msg.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-flame-500 hover:bg-flame-600 disabled:opacity-40 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {sending
                      ? <><Loader2 size={14} className="animate-spin" /> Sending…</>
                      : <><Send size={14} /> Send to All</>
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            {preview && msg && (
              <div className="bg-ash-800 border border-ash-600 rounded-xl p-5 mb-5">
                <div className="text-ash-400 text-xs font-mono mb-3 flex items-center gap-1.5">
                  <Eye size={12} /> Preview
                </div>
                <div className="text-white text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg }} />
              </div>
            )}

            {/* Result */}
            {sendResult && (
              <div className="flex items-center gap-3 bg-emerald-900/20 border border-emerald-800/50 rounded-xl px-4 py-3 font-mono text-sm text-emerald-300 mb-5">
                <CheckCircle2 size={16} />
                Sent to {sendResult.sent} users · {sendResult.failed} failed
              </div>
            )}

            {/* History */}
            <h3 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
              <Hash size={14} className="text-ash-500" />
              History
            </h3>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <CampaignRowSkeleton key={i} />)}
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-ash-500 text-sm font-mono text-center py-8 border border-ash-700 rounded-xl">
                No campaigns sent yet
              </div>
            ) : (
              <div className="space-y-3">
                {campaigns.map(c => (
                  <div key={c.id} className="bg-ash-800 border border-ash-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-ash-500 text-xs font-mono">
                        {new Date(c.created_at).toLocaleString()}
                      </span>
                      <span className="text-xs bg-ash-700 text-ash-300 px-2 py-0.5 rounded-full font-mono">
                        {c.sent_to} users
                      </span>
                    </div>
                    <p className="text-ash-200 text-sm font-mono line-clamp-2">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BOT STATUS TAB ─────────────────────────────────────────── */}
        {tab === 'bot' && (
          <div className="max-w-2xl">
            <h2 className="text-white font-semibold text-base mb-5">Bot Status</h2>

            {loading ? (
              <div className="space-y-4">
                <SkeletonBlock className="h-20 rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                  {[1,2,3,4].map(i => <SkeletonBlock key={i} className="h-20 rounded-xl" />)}
                </div>
                <SkeletonBlock className="h-40 rounded-xl" />
              </div>
            ) : botStatus ? (
              <div className="space-y-4">
                {/* Status banner */}
                <div className={`rounded-xl p-5 border flex items-center gap-4 ${
                  botStatus.status === 'ok'
                    ? 'bg-emerald-950/40 border-emerald-800/50'
                    : 'bg-red-950/40 border-red-800/50'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    botStatus.status === 'ok' ? 'bg-emerald-400' : 'bg-red-400'
                  }`} />
                  <div>
                    <div className="text-white font-semibold">{botStatus.bot}</div>
                    <div className={`text-sm font-mono ${botStatus.status === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {botStatus.status === 'ok' ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Uptime',        value: botStatus.uptime,                   icon: <Clock size={14} />    },
                    { label: 'Total Queries', value: String(botStatus.queries_total),     icon: <Activity size={14} /> },
                    { label: 'Python',        value: botStatus.python,                   icon: <Hash size={14} />     },
                    { label: 'Platform',      value: botStatus.platform,                 icon: <Settings size={14} /> },
                  ].map(m => (
                    <div key={m.label} className="bg-ash-800 border border-ash-700 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 text-ash-500 text-xs font-mono mb-2">
                        {m.icon} {m.label}
                      </div>
                      <div className="text-white font-mono text-sm font-medium">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Raw JSON */}
                <div className="bg-ash-800 border border-ash-700 rounded-xl p-5">
                  <div className="text-ash-400 text-xs font-mono mb-3">Raw JSON</div>
                  <pre className="text-ash-300 text-xs font-mono overflow-x-auto leading-relaxed">
                    {JSON.stringify(botStatus, null, 2)}
                  </pre>
                </div>

                <p className="text-ash-500 text-xs font-mono">
                  Started: {new Date(botStatus.started_at).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="bg-ash-800 border border-ash-700 rounded-xl p-10 text-center">
                <AlertCircle size={28} className="mx-auto mb-3 text-ash-500" />
                <p className="text-ash-400 font-mono text-sm">Could not reach bot health endpoint</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}