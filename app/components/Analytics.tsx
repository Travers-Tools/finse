'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { setPosthog, track } from '@/lib/track'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'

/** Beskriver hva som ble klikket, uten å sende personopplysninger. */
function describe(el: HTMLElement) {
  const text = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60)
  const anchor = el.closest('a') as HTMLAnchorElement | null
  const href = anchor?.getAttribute('href') || ''
  let type = 'button'
  if (href.startsWith('mailto:')) type = 'epost'
  else if (href.startsWith('tel:')) type = 'telefon'
  else if (href.startsWith('http')) type = 'ekstern'
  else if (href.startsWith('#')) type = 'anker'
  else if (href) type = 'lenke'
  const section = el.closest('section, header, footer, main, aside, nav')
  const where = section?.id || section?.className?.split(' ')[0] || section?.tagName.toLowerCase() || ''
  return { text, href, type, where, css: el.className?.toString().split(' ')[0] || '' }
}

export default function Analytics() {
  const pathname = usePathname()

  // PostHog: autocapture + session replay + tid på siden. Uten cookies, så ingen samtykkebanner.
  useEffect(() => {
    if (!POSTHOG_KEY) return
    import('posthog-js').then(({ default: ph }) => {
      ph.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        persistence: 'memory',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        session_recording: { maskAllInputs: true },
      })
      setPosthog(ph)
    })
  }, [])

  // Global klikklytter: alle lenker og knapper.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a, button') as HTMLElement | null
      if (!target) return
      const d = describe(target)
      track('klikk', { ...d, side: pathname })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])

  // Engasjert tid: sekunder med fanen synlig, sendt når siden forlates eller ruten byttes.
  useEffect(() => {
    let visibleSince = document.visibilityState === 'visible' ? Date.now() : 0
    let total = 0
    let maxScroll = 0
    const onScroll = () => {
      const h = document.documentElement
      const pct = Math.round(((window.scrollY + window.innerHeight) / h.scrollHeight) * 100)
      if (pct > maxScroll) maxScroll = Math.min(100, pct)
    }
    const onVis = () => {
      if (document.visibilityState === 'visible') visibleSince = Date.now()
      else if (visibleSince) { total += Date.now() - visibleSince; visibleSince = 0 }
    }
    const flush = () => {
      if (visibleSince) { total += Date.now() - visibleSince; visibleSince = 0 }
      const sek = Math.round(total / 1000)
      if (sek < 1) return
      const bøtte = sek < 10 ? '0-10s' : sek < 30 ? '10-30s' : sek < 60 ? '30-60s' : sek < 180 ? '1-3min' : sek < 600 ? '3-10min' : '10min+'
      track('tid_paa_side', { side: pathname, sekunder: sek, boette: bøtte, scroll: maxScroll })
      total = 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pagehide', flush)
    return () => {
      flush()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pagehide', flush)
    }
  }, [pathname])

  return <VercelAnalytics />
}
