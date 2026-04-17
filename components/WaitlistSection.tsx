'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const TOTAL_SPOTS = 100

export default function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [instagram, setInstagram] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [claimed, setClaimed] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/waitlist/stats')
      .then((r) => r.json())
      .then((d) => setClaimed(d.claimed))
  }, [])

  const remaining = claimed === null ? '—' : String(TOTAL_SPOTS - claimed)
  const progressPct = claimed === null ? 0 : (claimed / TOTAL_SPOTS) * 100

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!instagram.trim()) {
      setError('Please enter your Instagram username.')
      return
    }

    setLoading(true)
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, instagram }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Something went wrong.')
      setLoading(false)
      return
    }
    setSubmitted(true)
    setLoading(false)
    setClaimed((c) => (c === null ? 1 : c + 1))
  }

  return (
    <section id="waitlist" className="w-full px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">

        {/* Dark premium card */}
        <div className="bg-sq-dark rounded-[32px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0">

            {/* ── LEFT: Text + Form ── */}
            <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center">

              {/* Eyebrow */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-6">
                Early Access
              </p>

              {/* Headline */}
              <h2 className="text-[36px] md:text-[44px] font-bold text-white leading-[1.12] tracking-[-0.025em] mb-5 max-w-[420px]">
                Claim your spot on the journey.
              </h2>

              {/* Body copy */}
              <p className="text-[14px] text-white/55 leading-[1.75] mb-4 max-w-[380px]">
                We&apos;re keeping this exclusive. The first 100 explorers to join
                the SideQuest waitlist receive lifetime premium access — no
                subscriptions, no limits, just pure discovery.
              </p>

              {/* Highlighted line */}
              <div className="inline-flex self-start items-center gap-2 bg-sq-pink/15 border border-sq-pink/25 rounded-full px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-sq-pink" />
                <span className="text-sq-pink text-[13px] font-semibold">
                  The first 100 get it free. Forever.
                </span>
              </div>

              {/* Counter card */}
              <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-5 mb-6 max-w-[320px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-3">
                  Limited availability
                </p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-[40px] font-bold text-white leading-none">
                    {remaining}
                  </span>
                  <span className="text-[13px] text-white/40 mb-1.5">
                    / {TOTAL_SPOTS} spots remaining
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-[5px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sq-pink rounded-full transition-all duration-700"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10.5px] text-white/30">{claimed ?? '—'} claimed</span>
                  <span className="text-[10.5px] text-white/30">{remaining} left</span>
                </div>
              </div>

              {/* Form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="max-w-[380px]">
                  <div className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 bg-neutral-800 border border-white/15 rounded-full text-white placeholder:text-neutral-500 text-[13.5px] outline-none focus:border-sq-pink/60 transition-colors"
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-[13.5px] pointer-events-none">@</span>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value.replace(/^@/, ''))}
                        placeholder="Your Instagram username"
                        className="w-full pl-8 pr-4 py-3.5 bg-neutral-800 border border-white/15 rounded-full text-white placeholder:text-neutral-500 text-[13.5px] outline-none focus:border-sq-pink/60 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3.5 bg-sq-pink text-white text-[13.5px] font-semibold rounded-full hover:bg-sq-pink-hover active:scale-[0.97] disabled:opacity-70 transition-all duration-150 tracking-tight"
                    >
                      {loading ? 'Joining…' : 'Join Now'}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-[12px] text-red-400 pl-1">{error}</p>
                  )}
                  <p className="mt-3 text-[11.5px] text-white/25 pl-1">
                    No spam. Just progress updates and your launch invite.
                  </p>
                </form>
              ) : (
                <p className="text-[13px] text-white/30 max-w-[380px]">
                  Application received. We&apos;ll be in touch.
                </p>
              )}
            </div>

            {/* ── RIGHT: Mountain image ── */}
            <div className="relative hidden lg:block min-h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80"
                alt="Mountain landscape"
                fill
                className="object-cover grayscale contrast-[1.1] brightness-90"
                sizes="420px"
              />
              {/* Gradient fade from left */}
              <div className="absolute inset-0 bg-gradient-to-r from-sq-dark via-sq-dark/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Success popup */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-backdrop">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSubmitted(false)} />
          <div className="relative animate-popup bg-[#111111] border border-white/10 rounded-3xl p-10 max-w-[400px] w-full mx-5 shadow-hero text-center">

            <button
              onClick={() => setSubmitted(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-white/60 hover:bg-white/10 transition-colors text-[16px]"
            >
              ✕
            </button>

            {/* Pink pulse dot */}
            <div className="w-14 h-14 rounded-full bg-sq-pink/15 flex items-center justify-center mx-auto mb-7">
              <div className="w-5 h-5 rounded-full bg-sq-pink" />
            </div>

            <h3 className="text-[26px] font-bold text-white leading-tight tracking-[-0.025em] mb-3">
              You&apos;re in&nbsp;— almost.
            </h3>
            <p className="text-[14px] text-white/50 leading-relaxed">
              We&apos;ll review your Instagram and let you know by email once your spot is confirmed.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
