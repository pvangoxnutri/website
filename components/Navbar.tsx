'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

const navLinks = [
  { label: 'The Philosophy', id: 'philosophy' },
  { label: 'Early Access', id: 'waitlist' },
  { label: 'Feedback / Ideas', id: 'feedback' },
  { label: 'Social Media', id: 'social' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const router = useRouter()
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLogoClick = () => {
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)
    if (clickCount.current >= 3) {
      clickCount.current = 0
      router.push('/admin/login')
      return
    }
    clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 1000)
  }

  return (
    <nav className="w-full sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sq-border/50">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex items-end shrink-0" onClick={handleLogoClick}>
          <span
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontWeight: 900,
              fontSize: '22px',
              letterSpacing: '-1.25px',
              color: '#111111',
              lineHeight: 1,
            }}
          >
            SideQuest
          </span>
          <span
            style={{
              width: '5px',
              height: '5px',
              background: '#F4A7B0',
              borderRadius: '50%',
              marginLeft: '2px',
              marginBottom: '2px',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[12.5px] text-sq-muted hover:text-sq-dark transition-colors duration-150 font-medium whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden md:block text-xs text-sq-muted font-medium">
            Beta v0.2
          </span>
          <button
            onClick={() => scrollTo('waitlist')}
            className="px-5 py-2.5 bg-sq-dark text-white text-[13px] font-medium rounded-full hover:bg-sq-dark-2 active:scale-[0.97] transition-all duration-150 tracking-tight"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  )
}
