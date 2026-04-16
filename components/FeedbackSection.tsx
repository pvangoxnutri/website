'use client'

import { useState } from 'react'

export default function FeedbackSection() {
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return
    setLoading(true)
    // TODO: POST to /api/feedback with { message: feedback }
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="feedback" className="w-full px-6 md:px-10 py-20 md:py-28 border-t border-sq-border">
      <div className="max-w-6xl mx-auto flex justify-center">

        {/* Centered card */}
        <div className="w-full max-w-[600px] bg-white rounded-[28px] border border-sq-border shadow-card p-10 md:p-12 lg:p-14">

          {/* Top icon accent */}
          <div className="w-11 h-11 rounded-2xl bg-sq-pink-light flex items-center justify-center mb-8">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2L10.8 7H16L11.4 10.2L13.2 15.2L9 12L4.8 15.2L6.6 10.2L2 7H7.2L9 2Z"
                stroke="#D98FAB"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Headline */}
          <h2 className="text-[28px] md:text-[32px] font-bold text-sq-dark leading-[1.2] tracking-[-0.02em] mb-4">
            Shape the Future of SideQuest
          </h2>

          {/* Supporting copy */}
          <p className="text-[14px] text-sq-muted leading-[1.75] mb-8">
            We&apos;re building this for the people who use it. Whether it&apos;s
            a feature you&apos;ve always wanted in a travel app, or thoughts on
            where we&apos;re heading — your ideas help shape what comes next.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Textarea */}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your dream travel features..."
                rows={4}
                className="w-full px-5 py-4 bg-sq-light rounded-2xl border border-sq-border text-sq-dark placeholder:text-sq-muted/70 text-[14px] resize-none outline-none focus:border-sq-pink/60 focus:bg-white transition-all duration-150 leading-relaxed"
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !feedback.trim()}
                className="w-full py-3.5 bg-sq-dark text-white text-[14px] font-semibold rounded-full hover:bg-sq-dark-2 active:scale-[0.98] disabled:opacity-50 transition-all duration-150 tracking-tight"
              >
                {loading ? 'Sending…' : 'Send Feedback'}
              </button>
            </form>
          ) : (
            <div className="bg-sq-light rounded-2xl border border-sq-border px-6 py-5 text-center">
              <p className="text-[16px] font-semibold text-sq-dark mb-1.5">
                Thank you — this means a lot. 🙏
              </p>
              <p className="text-[13px] text-sq-muted leading-relaxed">
                Your feedback has been received. Every idea shapes what SideQuest
                becomes.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
