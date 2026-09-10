'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { localePath, switchLangPath, type Lang } from '@/lib/i18n'
import { useLang } from '@/lib/useLang'
import { header } from '@/content/header'

interface HeaderProps {
  /** Beholdt for bakoverkompatibilitet – headeren er alltid mørk nå, som hotelfinse1222.no. */
  variant?: 'light' | 'dark'
  showBackButton?: boolean
  /** Ankeren finnes bare på forsiden. Undersider sender til '/#faq'. */
  faqHref?: string
}

export default function Header({ showBackButton = false, faqHref = '#faq' }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const lang = useLang()
  const pathname = usePathname()
  const t = header[lang]

  // Lås scroll når skuffen er åpen, og lukk på Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const onHome = faqHref === '#faq'
  const kontaktHref = 'mailto:resepsjon@hotelfinse1222.no'
  const pakkerHref = onHome ? '#pakker' : localePath(lang, '/#pakker')
  const faq = onHome ? faqHref : localePath(lang, faqHref)

  const navLeft = (
    <>
      <a href={pakkerHref} className="ch-link">{t.pakker}</a>
      <Link href={localePath(lang, '/configurator')} className="ch-link">{t.skreddersy}</Link>
    </>
  )
  const navRight = (
    <>
      <Link href={localePath(lang, '/klima')} className="ch-link">{t.klima}</Link>
      <a href={faq} className="ch-link">{t.sporsmal}</a>
    </>
  )
  const backLink = (
    <a href="https://hotelfinse1222.no" className="ch-link ch-back">{t.tilHovedsiden}</a>
  )
  const langSwitch = (
    <span className="ch-lang" aria-label="Språk / Language">
      {(['en', 'no'] as Lang[]).map((l, i) => (
        <span key={l}>
          {i > 0 && <span className="ch-lang-sep">|</span>}
          <Link
            href={switchLangPath(pathname, l)}
            className={`ch-lang-link ${l === lang ? 'active' : ''}`}
            aria-current={l === lang ? 'true' : undefined}
            hrefLang={l === 'no' ? 'nb' : 'en'}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </span>
  )

  return (
    <>
      <header className="ch-header">
        <div className="ch-inner">
          <div className="ch-left">
            {langSwitch}
            {showBackButton ? <Link href={localePath(lang, '/')} className="ch-link ch-back">{t.tilbake}</Link> : backLink}
          </div>

          <div className="ch-centre">
            <nav className="ch-nav ch-nav-left" aria-label={t.menyVenstre}>{navLeft}</nav>
            <Link href={localePath(lang, '/')} className="ch-logo" aria-label={t.logoAria}>
              <img src="/assets/logo/logo-hvit.webp" alt="Hotel Finse1222" />
            </Link>
            <nav className="ch-nav ch-nav-right" aria-label={t.menyHoyre}>{navRight}</nav>
          </div>

          <div className="ch-right">
            <a href={kontaktHref} className="ch-cta">{t.kontakt}</a>
            <button
              type="button"
              className="ch-burger"
              aria-label={t.aapneMeny}
              aria-expanded={open}
              aria-controls="ch-drawer"
              onClick={() => setOpen(true)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`ch-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside id="ch-drawer" className={`ch-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button type="button" className="ch-drawer-close" aria-label={t.lukkMeny} onClick={() => setOpen(false)}>✕</button>
        <nav className="ch-drawer-nav" onClick={() => setOpen(false)}>
          {navLeft}
          {navRight}
          {backLink}
          <div className="ch-drawer-lang">{langSwitch}</div>
          <a href={kontaktHref} className="ch-cta ch-cta-drawer">{t.kontakt}</a>
        </nav>
      </aside>
    </>
  )
}
