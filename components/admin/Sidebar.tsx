'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <rect x="1" y="1" width="5.5" height="5.5" rx="1" />
      <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" />
      <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" />
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <circle cx="5.5" cy="4.5" r="2.5" />
      <path d="M1 13.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" />
      <circle cx="11" cy="5" r="2" />
      <path d="M9.5 13.5c0-1.8 1-3.2 2.5-3.8" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 2A1 1 0 001 3v8a1 1 0 001 1h1v2.5l3-2.5H13a1 1 0 001-1V3a1 1 0 00-1-1H2z" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <rect x="1" y="8.5" width="3" height="5.5" rx="0.5" />
      <rect x="6" y="5" width="3" height="9" rx="0.5" />
      <rect x="11" y="1" width="3" height="13" rx="0.5" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 9V2M4 4.5L6.5 2 9 4.5" />
      <path d="M1.5 10v1A1.5 1.5 0 003 12.5h7A1.5 1.5 0 0011.5 11v-1" />
    </svg>
  )
}

const navItems = [
  { label: 'DASHBOARD', href: '/admin/dashboard', icon: GridIcon },
  { label: 'WAITLIST',  href: '/admin/waitlist',  icon: UsersIcon },
  { label: 'FEEDBACK',  href: '/admin/feedback',  icon: MessageIcon },
  { label: 'ANALYTICS', href: '/admin/analytics', icon: ChartIcon },
]

type Props = { isOpen: boolean; onClose: () => void }

export default function Sidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname()

  const content = (
    <aside className="w-[240px] shrink-0 bg-white h-full flex flex-col border-r border-gray-100">
      <div className="px-6 pt-7 pb-6">
        <div className="text-[17px] font-black text-gray-900 tracking-tight leading-none" style={{ fontFamily: 'var(--font-raleway)' }}>
          SideQuest
        </div>
        <div className="text-[9px] font-semibold tracking-[0.2em] text-gray-400 mt-1.5 uppercase">
          Curator Suite
        </div>
      </div>

      <nav className="px-3 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-0.5 text-[10.5px] font-bold tracking-[0.1em] transition-all ${
                isActive ? 'bg-[#5C2637] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 flex flex-col gap-2">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-full text-[12px] font-semibold hover:bg-gray-800 transition-colors">
          <UploadIcon />
          Export Data
        </button>
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-500 rounded-full text-[12px] font-semibold hover:bg-gray-200 transition-colors"
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden lg:flex h-full">
        {content}
      </div>

      {/* Mobile: overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative h-full">
            {content}
          </div>
        </div>
      )}
    </>
  )
}
