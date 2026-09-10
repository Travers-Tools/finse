'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { localePath } from '@/lib/i18n'
import { useLang } from '@/lib/useLang'
import { klima, klimaFigures, klimaSource } from '@/content/klima'
import './klima.css'

/** Tallgrunnlaget per språk. Ti personer, tur/retur fra Oslo. */
export const KLIMA_FIGURES = klimaFigures
export const KLIMA_SOURCE = klimaSource

function TrainIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="13" rx="3" />
      <path d="M5 10h14" />
      <circle cx="9" cy="13" r="0.6" fill="currentColor" />
      <circle cx="15" cy="13" r="0.6" fill="currentColor" />
      <path d="M8 16l-2 5" />
      <path d="M16 16l2 5" />
    </svg>
  )
}

/** Chip som åpner klimamodalen. Brukes i pakkesidenes «passer for»-rad. */
export function KlimaChip({ label }: { label?: string }) {
  const lang = useLang()
  const [open, setOpen] = useState(false)

  return (
    <span className="klima">
      <button
        type="button"
        className="klima-chip"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <TrainIcon />
        {label ?? klima[lang].chipLabel}
      </button>
      <KlimaModal open={open} onClose={() => setOpen(false)} />
    </span>
  )
}

export function KlimaModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const lang = useLang()
  const t = klima[lang]
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open || !mounted) return null

  /* Portal til body: .pkg-content har en animasjon med transform og
     fill-mode both, og blir dermed containing block for position: fixed. */
  return createPortal(
    <div
      className="klima klima-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t.modalAria}
      onClick={onClose}
    >
      <div className="klima-modal" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="klima-modal-close"
          onClick={onClose}
          aria-label={t.close}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <span className="klima-modal-label">
          <TrainIcon size={15} />
          {t.chipLabel}
        </span>

        <h2 className="klima-modal-title">{t.modalTitle}</h2>

        <p className="klima-modal-body">{t.modalBody}</p>

        <ul className="klima-figures">
          {KLIMA_FIGURES[lang].map(f => (
            <li
              key={f.route}
              className={`klima-figure ${f.finse ? 'is-finse' : ''}`}
            >
              <span className="klima-figure-route">{f.route}</span>
              <span className="klima-figure-value">{f.value}</span>
            </li>
          ))}
        </ul>

        <p className="klima-figures-caption">{KLIMA_SOURCE[lang]}</p>

        <div className="klima-modal-foot">
          <Link href={localePath(lang, '/klima')} className="klima-link" onClick={onClose}>
            {t.readFull}
          </Link>
        </div>
      </div>
    </div>,
    document.body
  )
}

/** Klimaseksjon til forsiden. Ligger under pakkegridet. */
export default function KlimaSection() {
  const lang = useLang()
  const t = klima[lang]
  const [open, setOpen] = useState(false)

  return (
    <section className="klima klima-band" id="klima">
      <div className="klima-band-inner">
        <div className="klima-band-card">
          <span className="klima-modal-label">
            <TrainIcon size={15} />
            {t.chipLabel}
          </span>

          <p className="klima-band-statement">
            {t.bandStatement[0]}
            <em>{t.bandStatement[1]}</em>
            {t.bandStatement[2]}
          </p>

          <p className="klima-band-sub">{t.bandSub}</p>

          <div className="klima-band-actions">
            <button
              type="button"
              className="klima-band-btn"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
            >
              {t.seeFigures}
            </button>
            <Link href={localePath(lang, '/klima')} className="klima-link">
              {t.moreAbout}
            </Link>
          </div>
        </div>
      </div>

      <KlimaModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
