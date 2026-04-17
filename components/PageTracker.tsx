'use client'

import { useEffect, useRef } from 'react'

export default function PageTracker() {
  const tracked = useRef(false)
  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    fetch('/api/track', { method: 'POST' }).catch(() => {})
  }, [])
  return null
}
