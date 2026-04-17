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

const PAGE_SIZE = 10

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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

export default function WaitlistPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<'all' | WaitlistEntry['status']>('all')

  useEffect(() => {
    fetch('/api/admin/waitlist')
      .then((r) => r.json())
      .then((d) => { setWaitlist(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  const filtered = filter === 'all' ? waitlist : waitlist.filter((e) => e.status === filter)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageEntries = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const approvedCount = waitlist.filter((e) => e.has_full_access).length

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

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-gray-900">Waitlist</h1>
        <p className="text-[13px] text-gray-400 mt-1">
          {approvedCount} approved · {TOTAL_SPOTS - approvedCount} spots remaining
        </p>
      </div>

      <div className="flex gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setPage(1) }}
            className={`px-4 py-2 rounded-xl text-[12px] font-semibold capitalize transition-colors ${
              filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 shadow-card'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <p className="px-6 py-8 text-[13px] text-gray-400">Loading…</p>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['#', 'Email', 'Instagram', 'Date', 'Status', 'Access', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageEntries.map((entry, idx) => (
                  <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-4 text-[13px] text-gray-400 font-medium">
                      {String((page - 1) * PAGE_SIZE + idx + 1).padStart(2, '0')}
                    </td>
                    <td className="px-3 py-4 text-[13px] text-gray-700">{entry.email}</td>
                    <td className="px-3 py-4 text-[12.5px] text-gray-500">
                      {entry.instagram ? `@${entry.instagram}` : '—'}
                    </td>
                    <td className="px-3 py-4 text-[12px] text-gray-400 whitespace-nowrap">
                      {formatDate(entry.created_at)}
                    </td>
                    <td className="px-3 py-4"><StatusBadge status={entry.status} /></td>
                    <td className="px-3 py-4 text-[13px] text-gray-600">{entry.has_full_access ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-4">
                      {entry.status === 'pending' && (
                        <div className="flex gap-2">
                          <button onClick={() => updateStatus(entry.id, 'approved')} className="px-3 py-1.5 bg-pink-50 text-pink-600 rounded-lg text-[11px] font-semibold hover:bg-pink-100 transition-colors">Approve</button>
                          <button onClick={() => updateStatus(entry.id, 'rejected')} className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-[11px] font-semibold hover:bg-red-100 transition-colors">Reject</button>
                        </div>
                      )}
                      {entry.status === 'approved' && (
                        <button onClick={() => updateStatus(entry.id, 'rejected')} className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-[11px] font-semibold hover:bg-gray-200 transition-colors">Revoke</button>
                      )}
                    </td>
                  </tr>
                ))}
                {pageEntries.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-[13px] text-gray-400">No entries.</td></tr>
                )}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
              <span className="text-[12px] text-gray-400">
                Showing {(page - 1) * PAGE_SIZE + pageEntries.length} of {filtered.length} entries
              </span>
              <div className="flex gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[16px]">‹</button>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[16px]">›</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
