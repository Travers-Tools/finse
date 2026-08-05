'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import './klima.css'

/** Tallgrunnlaget. Ti personer, tur/retur fra Oslo. */
export const KLIMA_FIGURES = [
  { route: 'Oslo–Finse, tog', value: '50 kg CO₂', finse: true },
  { route: 'Oslo–Lofoten, fly', value: '2,4 tonn CO₂' },
  { route: 'Oslo–Svalbard, fly', value: '5,1 tonn CO₂' },
  { route: 'Oslo–Marbella, fly', value: '7,2 tonn CO₂' },
  { route: 'Oslo–Marbella, fly på business', value: '16,2 tonn CO₂' },
]

export const KLIMA_SOURCE =
  'Samlet utslipp for ti personer tur/retur, beregnet med Klimatsmartsemester.se.'

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
export function KlimaChip({ label = 'Klimasmart valg' }: { label?: string }) {
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
        {label}
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
      aria-label="Klimaavtrykk"
      onClick={onClose}
    >
      <div className="klima-modal" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="klima-modal-close"
          onClick={onClose}
          aria-label="Lukk"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <span className="klima-modal-label">
          <TrainIcon size={15} />
          Klimasmart valg
        </span>

        <h2 className="klima-modal-title">
          Finse er bare tilgjengelig med tog
        </h2>

        <p className="klima-modal-body">
          Når vi reiser, ligger omtrent 75 prosent av reisens klimaavtrykk i
          transporten. Av tog, elbil og fly er toget den mest klimavennlige måten
          å forflytte seg på. Toget er den eneste måten å komme helt fram til
          Finse på, og da følger det lave avtrykket med på kjøpet.
        </p>

        <ul className="klima-figures">
          {KLIMA_FIGURES.map(f => (
            <li
              key={f.route}
              className={`klima-figure ${f.finse ? 'is-finse' : ''}`}
            >
              <span className="klima-figure-route">{f.route}</span>
              <span className="klima-figure-value">{f.value}</span>
            </li>
          ))}
        </ul>

        <p className="klima-figures-caption">{KLIMA_SOURCE}</p>

        <div className="klima-modal-foot">
          <Link href="/klima" className="klima-link" onClick={onClose}>
            Les hele regnestykket
          </Link>
        </div>
      </div>
    </div>,
    document.body
  )
}

/** Klimaseksjon til forsiden. Ligger under pakkegridet. */
export default function KlimaSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="klima klima-band" id="klima">
      <div className="klima-band-inner">
        <div className="klima-band-card">
          <span className="klima-modal-label">
            <TrainIcon size={15} />
            Klimasmart valg
          </span>

          <p className="klima-band-statement">
            En jobbsamling på Finse har et klimaavtrykk som er omtrent{' '}
            <em>150 ganger lavere</em> enn et tilsvarende arrangement på en
            flybasert destinasjon i Sør-Europa.
          </p>

          <p className="klima-band-sub">
            Omtrent 75 prosent av en reises klimaavtrykk ligger i transporten, og
            Finse er bare tilgjengelig med tog. Det gjelder alle oppholdene våre.
          </p>

          <div className="klima-band-actions">
            <button
              type="button"
              className="klima-band-btn"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
            >
              Se regnestykket
            </button>
            <Link href="/klima" className="klima-link">
              Mer om klimaavtrykket
            </Link>
          </div>
        </div>
      </div>

      <KlimaModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
