'use client'

import { useRef, useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
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
    <>
      <nav className="w-full sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sq-border/50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-end shrink-0 cursor-pointer" onClick={handleLogoClick}>
            <span style={{ fontFamily: 'var(--font-raleway), sans-serif', fontWeight: 900, fontSize: '22px', letterSpacing: '-1.25px', color: '#111111', lineHeight: 1 }}>
              SideQuest
            </span>
            <span style={{ width: '5px', height: '5px', background: '#F4A7B0', borderRadius: '50%', marginLeft: '2px', marginBottom: '2px', display: 'inline-block', flexShrink: 0 }} />
          </div>

          {/* Desktop nav links */}
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

          {/* Right */}
          <div className="flex items-center gap-3 shrink-0">
<button
              onClick={() => scrollTo('waitlist')}
              className="hidden sm:block px-5 py-2.5 bg-sq-dark text-white text-[13px] font-medium rounded-full hover:bg-sq-dark-2 active:scale-[0.97] transition-all duration-150 tracking-tight"
            >
              Join Waitlist
            </button>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-[22px] h-[2px] bg-sq-dark rounded-full transition-transform duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block w-[22px] h-[2px] bg-sq-dark rounded-full transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-[22px] h-[2px] bg-sq-dark rounded-full transition-transform duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-cream/95 backdrop-blur-md flex flex-col pt-24 px-8 gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-[18px] font-semibold text-sq-dark py-4 border-b border-sq-border/40 hover:text-sq-muted transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('waitlist')}
            className="mt-6 w-full py-4 bg-sq-dark text-white text-[15px] font-medium rounded-full"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </>
  )
}
