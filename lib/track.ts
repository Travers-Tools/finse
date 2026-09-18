'use client'

import { track as vercelTrack } from '@vercel/analytics'

type Props = Record<string, string | number | boolean>

let posthog: typeof import('posthog-js').default | null = null

export function setPosthog(ph: typeof import('posthog-js').default) {
  posthog = ph
}

/** Sender en hendelse til Vercel Web Analytics og PostHog (hvis nøkkel finnes). */
export function track(event: string, props: Props = {}) {
  try {
    vercelTrack(event, props)
  } catch {}
  try {
    posthog?.capture(event, props)
  } catch {}
}
