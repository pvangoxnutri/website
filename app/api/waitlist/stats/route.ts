import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const TOTAL_SPOTS = 100

export async function GET() {
  const { count, error } = await supabaseAdmin
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  if (error) return NextResponse.json({ claimed: 0, total: TOTAL_SPOTS, remaining: TOTAL_SPOTS })

  const claimed = count ?? 0
  return NextResponse.json({ claimed, total: TOTAL_SPOTS, remaining: TOTAL_SPOTS - claimed })
}
