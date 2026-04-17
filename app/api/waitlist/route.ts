import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  const { email, instagram } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('waitlist')
    .insert({ email, instagram: instagram?.trim() || null })

  if (error) {
    console.error('[/api/waitlist]', error.code, error.message)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'This email is already on the list.' }, { status: 409 })
    }
    if (error.code === '42P01') {
      return NextResponse.json({ error: 'Database table missing — run supabase/schema.sql first.' }, { status: 500 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
