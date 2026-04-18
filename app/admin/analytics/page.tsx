'use client'

import { useState, useEffect } from 'react'

type AnalyticsData = {
  total: number
  changePct: number | null
  mobilePct: number
  desktopPct: number
  topCountries: { code: string; name: string; flag: string; count: number }[]
  weeklyVisits: { day: string; visits: number }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((r) => r.json())
      .then((d) => { setData(d.weeklyVisits ? d : null); setLoading(false) })
  }, [])

  const maxVisits = data?.weeklyVisits?.length ? Math.max(...data.weeklyVisits.map((d) => d.visits), 1) : 1
  const changePct = data?.changePct
  const changeLabel = changePct == null ? null : `${changePct > 0 ? '+' : ''}${changePct}%`

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-gray-900">Analytics</h1>
        <p className="text-[13px] text-gray-400 mt-1">Real visit data · countries require Vercel deployment</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Visits',  value: data ? data.total.toLocaleString() : '—', change: changeLabel,   up: (changePct ?? 0) >= 0 },
          { label: 'This Week',     value: data ? data.weeklyVisits.reduce((s, d) => s + d.visits, 0).toLocaleString() : '—', change: null, up: true },
          { label: 'Mobile Share',  value: data ? `${data.mobilePct}%` : '—',  change: null, up: true },
          { label: 'Desktop Share', value: data ? `${data.desktopPct}%` : '—', change: null, up: true },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-card p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-3">{s.label}</p>
            <p className="text-[26px] font-bold text-gray-900 leading-none">{s.value}</p>
            {s.change && (
              <p className={`text-[11.5px] font-semibold mt-1.5 ${s.up ? 'text-emerald-500' : 'text-red-400'}`}>
                {s.change} vs prev week
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h2 className="text-[17px] font-bold text-gray-900 mb-6">Daily Visits (last 7 days)</h2>
        {loading ? (
          <p className="text-[13px] text-gray-400 pb-4">Loading…</p>
        ) : (
          <div className="flex items-end gap-3 h-[140px]">
            {data?.weeklyVisits.map(({ day, visits }) => {
              const pct = (visits / maxVisits) * 100
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-medium">{visits > 0 ? visits : ''}</span>
                  <div className="w-full rounded-t-lg bg-[#D98FAB]/15 relative overflow-hidden" style={{ height: '96px' }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-[#D98FAB] rounded-t-lg transition-all" style={{ height: `${pct}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{day}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Device + Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-5">Device Breakdown</h2>
          {loading ? <p className="text-[13px] text-gray-400">Loading…</p> : (
            <>
              <div className="space-y-4">
                {[
                  { label: 'Mobile',  pct: data?.mobilePct  ?? 50, color: 'bg-[#D98FAB]' },
                  { label: 'Desktop', pct: data?.desktopPct ?? 50, color: 'bg-gray-900'  },
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
              <div className="mt-6 pt-5 border-t border-gray-50">
                <p className="text-[24px] font-bold text-gray-900 leading-none">{data?.total.toLocaleString() ?? '—'}</p>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-400 mt-1">Total sessions</p>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-5">Top Countries</h2>
          {loading ? <p className="text-[13px] text-gray-400">Loading…</p> : (
            data?.topCountries.length ? (
              <div className="space-y-3">
                {data.topCountries.map(({ flag, name, count, code }) => {
                  const pct = data.total > 0 ? Math.round((count / data.total) * 100) : 0
                  return (
                    <div key={code}>
                      <div className="flex items-center gap-3 mb-1.5">
                        <div className="w-7 h-5 bg-gray-100 rounded flex items-center justify-center text-[11px] shrink-0">{flag}</div>
                        <span className="flex-1 text-[13px] text-gray-700">{name}</span>
                        <span className="text-[13px] font-semibold text-gray-900">{count.toLocaleString()}</span>
                      </div>
                      <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden ml-10">
                        <div className="h-full bg-gray-300 rounded-full" style={{ width: `${pct * 3}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-[13px] text-gray-400 leading-relaxed">
                No country data yet.<br />
                Country tracking requires deployment on Vercel.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}
