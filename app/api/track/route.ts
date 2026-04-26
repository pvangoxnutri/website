import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  const ua = req.headers.get('user-agent') ?? ''
  let country = req.headers.get('x-vercel-ip-country') ?? null
  const device = /mobile|android|iphone|ipad|tablet/i.test(ua) ? 'mobile' : 'desktop'

  // Fallback for local development (Vercel header not available)
  if (!country && process.env.NODE_ENV === 'development') {
    const countries = ['SE', 'US', 'GB', 'DE', 'FR', 'NO', 'DK']
    country = countries[Math.floor(Math.random() * countries.length)]
  }

  await supabaseAdmin.from('page_views').insert({ country, device })
  return NextResponse.json({ ok: true })
}
