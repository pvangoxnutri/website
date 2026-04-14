export default function AppStoreSection() {
  return (
    <section className="w-full px-6 md:px-10 py-20 md:py-24 border-t border-sq-border">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* Blurred QR placeholder with lock overlay */}
        <div className="relative mb-8">
          {/* QR code pattern (blurred) */}
          <div
            className="w-[110px] h-[110px] rounded-2xl bg-sq-light border border-sq-border flex items-center justify-center overflow-hidden"
            style={{ filter: 'blur(3px)' }}
            aria-hidden
          >
            {/* Simplified QR-like grid pattern */}
            <div className="w-[82px] h-[82px] grid grid-cols-8 gap-[2.5px]">
              {[
                1,1,1,1,1,1,1,0,
                1,0,0,0,0,0,1,0,
                1,0,1,1,1,0,1,1,
                1,0,1,0,1,0,1,0,
                1,0,1,1,1,0,1,1,
                1,0,0,0,0,0,1,0,
                1,1,1,1,1,1,1,0,
                0,1,0,1,1,0,0,1,
              ].map((filled, i) => (
                <div
                  key={i}
                  className={`rounded-[1px] ${filled ? 'bg-sq-dark' : 'bg-transparent'}`}
                />
              ))}
            </div>
          </div>

          {/* Lock icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-11 h-11 rounded-full bg-sq-dark shadow-float flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="3"
                  y="7.5"
                  width="10"
                  height="7"
                  rx="2"
                  stroke="white"
                  strokeWidth="1.4"
                />
                <path
                  d="M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[22px] font-bold text-sq-dark tracking-tight mb-2">
          App Store Coming Soon
        </h3>

        {/* Platform / date */}
        <p className="text-[13px] text-sq-muted mb-7">
          iOS &amp; Android · 2025
        </p>

        {/* Instagram link */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] text-sq-dark font-medium border-b border-sq-dark/30 pb-0.5 hover:border-sq-dark transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="10.2" cy="3.8" r="0.7" fill="currentColor" />
          </svg>
          Follow the journey on Instagram
        </a>
      </div>
    </section>
  )
}
