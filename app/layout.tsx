import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'SideQuest — Plan the trip. Add the side quests.',
  description:
    'Travel planning should be fun. Organize your ideas without getting lost and create sidequests along the way. Join the waitlist for early access.',
  keywords: ['travel', 'travel planning', 'side quests', 'adventure', 'trip planning'],
  openGraph: {
    title: 'SideQuest — Plan the trip. Add the side quests.',
    description:
      'Travel planning should be fun. Organize your ideas without getting lost and create sidequests along the way.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans bg-cream text-sq-dark antialiased">
        {children}
      </body>
    </html>
  )
}
