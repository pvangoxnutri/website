import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  const ua = req.headers.get('user-agent') ?? ''
  const country = req.headers.get('x-vercel-ip-country') ?? null
  const device = /mobile|android|iphone|ipad|tablet/i.test(ua) ? 'mobile' : 'desktop'

  await supabaseAdmin.from('page_views').insert({ country, device })
  return NextResponse.json({ ok: true })
}
