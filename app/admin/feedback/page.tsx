'use client'

import { useState, useEffect } from 'react'

type FeedbackEntry = {
  id: string
  name: string | null
  email: string | null
  message: string
  is_read: boolean
  created_at: string
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

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    fetch('/api/admin/feedback')
      .then((r) => r.json())
      .then((d) => { setFeedback(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  const filtered =
    filter === 'all' ? feedback : feedback.filter((f) => (filter === 'unread' ? !f.is_read : f.is_read))

  const unreadCount = feedback.filter((f) => !f.is_read).length

  const markRead = async (id: string) => {
    setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, is_read: true } : f)))
    await fetch(`/api/admin/feedback/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: true }),
    })
  }

  const deleteFeedback = async (id: string) => {
    setFeedback((prev) => prev.filter((f) => f.id !== id))
    await fetch(`/api/admin/feedback/${id}`, { method: 'DELETE' })
  }

  const markAllRead = async () => {
    const unread = feedback.filter((f) => !f.is_read)
    setFeedback((prev) => prev.map((f) => ({ ...f, is_read: true })))
    await Promise.all(
      unread.map((f) =>
        fetch(`/api/admin/feedback/${f.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_read: true }),
        })
      )
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Feedback</h1>
          <p className="text-[13px] text-gray-400 mt-1">
            {loading ? '…' : `${unreadCount} unread · ${feedback.length} total`}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="px-4 py-2 bg-white rounded-xl text-[12px] font-semibold text-gray-600 hover:bg-gray-100 shadow-card transition-colors">
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {(['all', 'unread', 'read'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[12px] font-semibold capitalize transition-colors ${
              filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 shadow-card'
            }`}
          >
            {f}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-[#D98FAB] text-white rounded-full text-[9px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[13px] text-gray-400">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl shadow-card p-6 transition-opacity ${item.is_read ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">{item.name ?? 'Anonymous'}</p>
                  {item.email && <p className="text-[11.5px] text-gray-400 mt-0.5">{item.email}</p>}
                </div>
                <span className="text-[11px] text-gray-400 shrink-0 ml-4">{timeAgo(item.created_at)}</span>
              </div>
              <p className="text-[13.5px] text-gray-600 leading-relaxed mb-4">&ldquo;{item.message}&rdquo;</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  {!item.is_read ? <span className="w-2 h-2 rounded-full bg-[#D98FAB]" /> : <span />}
                  {!item.is_read ? (
                    <button onClick={() => markRead(item.id)} className="text-[10.5px] font-bold text-[#D98FAB] hover:text-[#C87A99] uppercase tracking-wider transition-colors">
                      Mark as read
                    </button>
                  ) : (
                    <span className="text-[10.5px] font-medium text-gray-300 uppercase tracking-wider">Read</span>
                  )}
                </div>
                <button onClick={() => deleteFeedback(item.id)} className="text-[10.5px] font-bold text-gray-300 hover:text-red-400 uppercase tracking-wider transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-[13px] text-gray-400 py-8 text-center col-span-2">No feedback in this category.</p>
          )}
        </div>
      )}
    </div>
  )
}
