import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const COUNTRY_INFO: Record<string, { name: string; flag: string }> = {
  US: { name: 'United States',  flag: '🇺🇸' },
  GB: { name: 'United Kingdom', flag: '🇬🇧' },
  SE: { name: 'Sweden',         flag: '🇸🇪' },
  DE: { name: 'Germany',        flag: '🇩🇪' },
  FR: { name: 'France',         flag: '🇫🇷' },
  NO: { name: 'Norway',         flag: '🇳🇴' },
  DK: { name: 'Denmark',        flag: '🇩🇰' },
  FI: { name: 'Finland',        flag: '🇫🇮' },
  NL: { name: 'Netherlands',    flag: '🇳🇱' },
  ES: { name: 'Spain',          flag: '🇪🇸' },
  IT: { name: 'Italy',          flag: '🇮🇹' },
  CA: { name: 'Canada',         flag: '🇨🇦' },
  AU: { name: 'Australia',      flag: '🇦🇺' },
  JP: { name: 'Japan',          flag: '🇯🇵' },
  BR: { name: 'Brazil',         flag: '🇧🇷' },
  IN: { name: 'India',          flag: '🇮🇳' },
  PL: { name: 'Poland',         flag: '🇵🇱' },
  PT: { name: 'Portugal',       flag: '🇵🇹' },
  CH: { name: 'Switzerland',    flag: '🇨🇭' },
  AT: { name: 'Austria',        flag: '🇦🇹' },
}

export async function GET() {
  const { data: views, error } = await supabaseAdmin
    .from('page_views')
    .select('country, device, created_at')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const all = views ?? []
  const total = all.length

  const now = Date.now()
  const day7 = new Date(now - 7 * 864e5).toISOString()
  const day14 = new Date(now - 14 * 864e5).toISOString()
  const recent = all.filter((v) => v.created_at >= day7).length
  const prev   = all.filter((v) => v.created_at >= day14 && v.created_at < day7).length
  const changePct = prev === 0 ? null : Math.round(((recent - prev) / prev) * 100)

  const mobile  = all.filter((v) => v.device === 'mobile').length
  const desktop = all.filter((v) => v.device === 'desktop').length
  const mobilePct  = total === 0 ? 50 : Math.round((mobile / total) * 100)
  const desktopPct = 100 - mobilePct

  const countryCounts: Record<string, number> = {}
  all.forEach((v) => {
    if (v.country) countryCounts[v.country] = (countryCounts[v.country] ?? 0) + 1
  })
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([code, count]) => ({
      code,
      name: COUNTRY_INFO[code]?.name ?? code,
      flag: COUNTRY_INFO[code]?.flag ?? '🌍',
      count,
    }))

  const weeklyVisits = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().split('T')[0]
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      visits: all.filter((v) => v.created_at.startsWith(dateStr)).length,
    }
  })

  return NextResponse.json({ total, changePct, mobilePct, desktopPct, topCountries, weeklyVisits })
}
