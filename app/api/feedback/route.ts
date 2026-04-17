import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  const { message, name, email } = await req.json()

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('feedback')
    .insert({ message: message.trim(), name: name?.trim() || null, email: email?.trim() || null })

  if (error) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
