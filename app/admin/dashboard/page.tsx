'use client'

import { useState, useEffect } from 'react'
import { TOTAL_SPOTS } from '@/lib/adminMockData'

type WaitlistEntry = {
  id: string
  email: string
  instagram: string | null
  status: 'pending' | 'approved' | 'rejected'
  has_full_access: boolean
  created_at: string
}

type FeedbackEntry = {
  id: string
  name: string | null
  email: string | null
  message: string
  is_read: boolean
  created_at: string
}

const PAGE_SIZE = 5

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 36e5)
  if (h < 1) return 'Just now'
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d === 1) return 'Yesterday'
  return `${d} days ago`
}

function StatusBadge({ status }: { status: WaitlistEntry['status'] }) {
  const styles = {
    approved: 'bg-pink-50 text-pink-600',
    pending:  'bg-gray-100 text-gray-500',
    rejected: 'bg-red-50 text-red-500',
  }
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  )
}

function FilterIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M1 1.5h10L7.5 5.5v4.5l-3-1.5V5.5L1 1.5z" />
    </svg>
  )
}

export default function DashboardPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const [analytics, setAnalytics] = useState<{ total: number; changePct: number | null; mobilePct: number; desktopPct: number; topCountries: { code: string; name: string; flag: string; count: number }[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/waitlist').then((r) => r.json()),
      fetch('/api/admin/feedback').then((r) => r.json()),
      fetch('/api/admin/analytics').then((r) => r.json()),
    ]).then(([w, f, a]) => {
      setWaitlist(Array.isArray(w) ? w : [])
      setFeedback(Array.isArray(f) ? f : [])
      setAnalytics(a?.total !== undefined ? a : null)
      setLoading(false)
    })
  }, [])

  const approvedCount = waitlist.filter((e) => e.has_full_access).length
  const remainingSpots = TOTAL_SPOTS - approvedCount
  const unreadCount = feedback.filter((e) => !e.is_read).length

  const totalPages = Math.max(1, Math.ceil(waitlist.length / PAGE_SIZE))
  const pageEntries = waitlist.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const markRead = async (id: string) => {
    setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, is_read: true } : f)))
    await fetch(`/api/admin/feedback/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: true }),
    })
  }

  const updateStatus = async (id: string, status: WaitlistEntry['status']) => {
    setWaitlist((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, has_full_access: status === 'approved' } : e))
    )
    await fetch(`/api/admin/waitlist/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
  }

  const visitsBadge = analytics?.changePct == null ? null : `${analytics.changePct > 0 ? '+' : ''}${analytics.changePct}%`

  const stats = [
    { label: 'TOTAL VISITS',         value: analytics ? analytics.total.toLocaleString() : '—', badge: visitsBadge, accent: false },
    { label: 'WAITLIST\nREQUESTS',    value: String(waitlist.length), badge: null, accent: false },
    { label: 'APPROVED FULL\nACCESS', value: String(approvedCount),   badge: null, accent: false },
    { label: 'REMAINING\nSPOTS',      value: String(remainingSpots),  badge: null, accent: true  },
    { label: 'FEEDBACK\nSUBMISSIONS', value: String(feedback.length), badge: null, accent: false },
  ]

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-[13px] text-gray-400">Loading…</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-card">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-400 leading-snug mb-3 whitespace-pre-line">
              {s.label}
            </p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className={`text-[28px] font-bold leading-none ${s.accent ? 'text-[#D98FAB]' : 'text-gray-900'}`}>
                {s.value}
              </span>
              {s.badge && <span className="text-[11px] font-semibold text-emerald-500">{s.badge}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">

        {/* Waitlist table */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h2 className="text-[17px] font-bold text-gray-900">Waitlist Management</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-[12px] font-semibold text-gray-600 transition-colors">
              <FilterIcon />
              Filter
            </button>
          </div>

          {waitlist.length === 0 ? (
            <p className="px-6 pb-6 text-[13px] text-gray-400">No waitlist entries yet.</p>
          ) : (
            <>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['#', 'Email', 'Date', 'Status', 'Access'].map((h) => (
                      <th key={h} className="px-5 pb-3 text-left text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageEntries.map((entry, idx) => (
                    <tr key={entry.id} className="border-b border-gray-50 group hover:bg-gray-50/50">
                      <td className="px-5 py-4 text-[13px] text-gray-400 font-medium">
                        {String((page - 1) * PAGE_SIZE + idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-3 py-4 text-[13px] text-gray-700">{entry.email}</td>
                      <td className="px-3 py-4 text-[12px] text-gray-400 whitespace-nowrap">{formatDate(entry.created_at)}</td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={entry.status} />
                          {entry.status === 'pending' && (
                            <div className="hidden group-hover:flex gap-1">
                              <button onClick={() => updateStatus(entry.id, 'approved')} className="px-2 py-0.5 bg-pink-50 text-pink-600 rounded text-[10px] font-bold hover:bg-pink-100 transition-colors">✓</button>
                              <button onClick={() => updateStatus(entry.id, 'rejected')} className="px-2 py-0.5 bg-red-50 text-red-500 rounded text-[10px] font-bold hover:bg-red-100 transition-colors">✕</button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-4 text-[13px] text-gray-600">{entry.has_full_access ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
                <span className="text-[12px] text-gray-400">
                  Showing {(page - 1) * PAGE_SIZE + pageEntries.length} of {waitlist.length} requests
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[16px]">‹</button>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[16px]">›</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-50">
            <h2 className="text-[17px] font-bold text-gray-900">Recent Feedback</h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-full tracking-wider">
                {unreadCount} NEW
              </span>
            )}
          </div>

          {feedback.length === 0 ? (
            <p className="px-5 py-5 text-[13px] text-gray-400">No feedback yet.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {feedback.slice(0, 5).map((item) => (
                <div key={item.id} className={`px-5 py-4 ${item.is_read ? 'opacity-50' : ''}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-semibold text-gray-900">{item.name ?? 'Anonymous'}</span>
                    <span className="text-[11px] text-gray-400">{timeAgo(item.created_at)}</span>
                  </div>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed mb-2.5 line-clamp-2">
                    &ldquo;{item.message}&rdquo;
                  </p>
                  <div className="text-right">
                    {!item.is_read ? (
                      <button onClick={() => markRead(item.id)} className="text-[10px] font-bold text-[#D98FAB] hover:text-[#C87A99] uppercase tracking-wider transition-colors">
                        Mark as read
                      </button>
                    ) : (
                      <span className="text-[10px] font-medium text-gray-300 uppercase tracking-wider">Read</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-5">Device Breakdown</h2>
          <div className="space-y-4">
            {[
              { label: 'Mobile',  pct: analytics?.mobilePct  ?? 50, color: 'bg-[#D98FAB]' },
              { label: 'Desktop', pct: analytics?.desktopPct ?? 50, color: 'bg-gray-900'  },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[12.5px] font-medium text-gray-600">{label}</span>
                  <span className="text-[12.5px] font-semibold text-gray-900">{pct}%</span>
                </div>
                <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 mt-6 pt-5 border-t border-gray-50">
            <div>
              <p className="text-[24px] font-bold text-gray-900 leading-none">{analytics ? analytics.total.toLocaleString() : '—'}</p>
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-400 mt-1">Sessions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-5">Top Countries</h2>
          {analytics?.topCountries.length ? (
            <div className="space-y-3.5">
              {analytics.topCountries.map(({ flag, name, count }) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center text-[12px] shrink-0">{flag}</div>
                  <span className="flex-1 text-[13px] text-gray-700">{name}</span>
                  <span className="text-[13px] font-semibold text-gray-900">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-gray-400">No country data yet — deploy to Vercel for geolocation.</p>
          )}
        </div>
      </div>
    </div>
  )
}
