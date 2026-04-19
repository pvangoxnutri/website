'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function HeroSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleQuickJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // TODO: Connect to waitlist backend API
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="w-full px-6 md:px-10 pt-5 pb-10 md:pt-20 md:pb-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-0 order-1">

          {/* Pill badge */}
          <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-sq-light border border-sq-border mb-3 md:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sq-pink animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sq-muted">
              App Coming Soon
            </span>
          </div>

          {/* Pre-headline — hidden on mobile */}
          <p className="hidden md:block text-[13px] text-sq-muted leading-relaxed mb-6 max-w-sm">
            Join early — the first 100 users unlock{' '}
            <span className="text-sq-dark font-medium">
              lifetime free access to all premium features.
            </span>
          </p>

          {/* Main headline */}
          <h1 className="text-[34px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-bold text-sq-dark leading-[1.04] tracking-[-0.03em] mb-3 md:mb-7">
            Plan the trip.
            <br />
            Add the side
            <br />
            <span className="font-serif italic font-normal text-[36px] sm:text-[54px] md:text-[62px] lg:text-[70px] tracking-[-0.02em]">
              quests.
            </span>
          </h1>

          {/* Description — hidden on mobile */}
          <p className="hidden md:block text-[15px] text-sq-muted leading-[1.7] mb-8 max-w-full md:max-w-[380px]">
            Travel planning should be fun. Organize your ideas without getting
            lost in endless tabs — and create sidequests along the way.
          </p>

          {/* CTA button */}
          <div className="flex items-center gap-4 mb-4 md:mb-8">
            <button
              onClick={() =>
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-7 py-3.5 bg-sq-dark text-white text-[14px] font-medium rounded-full hover:bg-sq-dark-2 active:scale-[0.97] transition-all duration-150 tracking-tight shadow-sm"
            >
              Join Waitlist
            </button>
            <span className="text-xs text-sq-muted">No account needed</span>
          </div>

          {/* Feedback/collaboration card — desktop only */}
          <div className="hidden lg:block bg-white rounded-2xl border border-sq-border p-5 max-w-full md:max-w-[400px] shadow-card">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-sq-pink-light flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#D98FAB" strokeWidth="1.4" />
                  <path d="M4.5 7.5C5 8.5 6.5 9.5 8 8.5C9.5 7.5 9 5.5 7.5 5C6 4.5 4.5 5.5 5 7" stroke="#D98FAB" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-sq-dark mb-1 leading-snug">
                  We&apos;re building this together.
                </p>
                <p className="text-[12.5px] text-sq-muted leading-relaxed">
                  SideQuest is being shaped step by step — alongside the
                  explorers who use it. Your ideas, feedback, and wishes directly
                  influence what comes next.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (image) ── */}
        <div className="relative flex items-start justify-center lg:justify-end pt-4 lg:pt-0 order-2">

          {/* Hero image card with tilt */}
          <div className="relative w-full max-w-[420px] lg:max-w-none lg:w-[105%]">
            <div
              className="relative w-full rounded-[28px] overflow-hidden shadow-hero"
              style={{
                transform: 'rotate(1.5deg)',
                aspectRatio: 'var(--hero-ratio, 3/2)',
              }}
            >
              <style>{`@media (min-width: 1024px) { :root { --hero-ratio: 4/5; } }`}</style>
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85"
                alt="Scenic road trip through mountains"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle image overlay for warmth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Floating sidequest discovery card */}
              <div className="absolute bottom-6 left-5 bg-white rounded-[18px] p-3.5 shadow-float border border-white/60 max-w-[192px]">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[13px]">⚡</span>
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.13em] text-sq-pink">
                    Quest Unlocked
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-sq-dark leading-snug mb-1.5">
                  The Winding Pass Café
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-sq-muted">📍</span>
                  <span className="text-[11px] text-sq-muted">Dolomites, Italy</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-sq-border">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10.5px] text-sq-muted font-medium">Hidden gem · 2.3 km away</span>
                </div>
              </div>
            </div>

            {/* Background decorative glow */}
            <div
              className="absolute -inset-4 rounded-[32px] bg-sq-pink/8 blur-2xl -z-10"
              aria-hidden
            />
          </div>
        </div>

        {/* ── TOGETHER CARD — mobile only, below image ── */}
        <div className="lg:hidden order-3 bg-white rounded-2xl border border-sq-border p-5 shadow-card">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-sq-pink-light flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#D98FAB" strokeWidth="1.4" />
                <path d="M4.5 7.5C5 8.5 6.5 9.5 8 8.5C9.5 7.5 9 5.5 7.5 5C6 4.5 4.5 5.5 5 7" stroke="#D98FAB" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-sq-dark mb-1 leading-snug">
                We&apos;re building this together.
              </p>
              <p className="text-[12.5px] text-sq-muted leading-relaxed">
                SideQuest is being shaped step by step — alongside the
                explorers who use it. Your ideas, feedback, and wishes directly
                influence what comes next.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
