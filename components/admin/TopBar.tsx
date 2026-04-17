'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Waitlist',  href: '/admin/waitlist'  },
  { label: 'Feedback',  href: '/admin/feedback'  },
  { label: 'Analytics', href: '/admin/analytics' },
]

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5v2.5L2 10.5h12L12.5 8.5V6A4.5 4.5 0 008 1.5z" />
      <path d="M6.5 12.5a1.5 1.5 0 003 0" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9" />
    </svg>
  )
}

export default function TopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <header className="h-[52px] bg-white border-b border-gray-100 flex items-center px-6 shrink-0 z-10">
      {/* Logo */}
      <div
        className="text-[15px] font-black text-gray-900 tracking-tight mr-8 shrink-0"
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
        SideQuest
      </div>

      {/* Nav tabs */}
      <nav className="flex items-center gap-0.5 flex-1 h-full">
        {navItems.map(({ label, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`relative px-3 h-full flex items-center text-[13px] font-medium transition-colors ${
                isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 rounded-t-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
          <BellIcon />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
          <SettingsIcon />
        </button>
        <span className="text-[13px] text-gray-600 font-medium ml-2 mr-2">Admin Panel</span>

        <div className="relative">
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#9CA3AF">
              <circle cx="10" cy="7" r="4" />
              <path d="M2 19c0-4.418 3.582-8 8-8s8 3.582 8 8" />
            </svg>
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-10 bg-white rounded-xl shadow-float border border-gray-100 py-1 w-28 z-20">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-[13px] text-red-500 hover:bg-gray-50 text-left transition-colors"
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
