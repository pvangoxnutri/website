'use client'

export default function Navbar() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="w-full sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sq-border/50">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-sq-dark flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7L5.5 10.5L12 4"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sq-dark font-semibold text-[15px] tracking-tight">
            SideQuest
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-xs text-sq-muted font-medium">
            Beta v0.2
          </span>
          <button
            onClick={scrollToWaitlist}
            className="px-5 py-2.5 bg-sq-dark text-white text-[13px] font-medium rounded-full hover:bg-sq-dark-2 active:scale-[0.97] transition-all duration-150 tracking-tight"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  )
}
