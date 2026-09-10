'use client'

import { useLang } from '@/lib/useLang'
import { footer } from '@/content/footer'

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/hotel.finse1222/',
    path: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hotelfinse1222/',
    path: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
        <line x1="7.4" y1="10.4" x2="7.4" y2="17" />
        <circle cx="7.4" cy="7.1" r="1.1" fill="currentColor" stroke="none" />
        <path d="M11.4 17v-3.7a2.6 2.6 0 0 1 5.2 0V17" />
        <line x1="11.4" y1="10.4" x2="11.4" y2="17" />
      </>
    ),
  },
]

export default function Footer() {
  const lang = useLang()
  const t = footer[lang]
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer id="kontakt" className="footer">
      <div className="footer-bg" style={{ backgroundImage: "url('/assets/images/image.png')" }}></div>
      <div className="footer-overlay"></div>

      <div className="container footer-inner">
        <div className="footer-quote">
          <p className="footer-quote-text">{t.quote}</p>
          <p className="footer-quote-source">{t.quoteSource}</p>
        </div>

        <div className="footer-contact-grid">
          <div className="footer-col">
            <h3 className="footer-col-title">{t.talkTitle}</h3>
            <a className="footer-col-link" href="tel:+4756527100">
              {t.phone}
            </a>
            <a className="footer-col-link" href="mailto:resepsjon@hotelfinse1222.no">
              {t.email}
            </a>
            <p className="footer-col-muted">{t.replyTime}</p>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">{t.findTitle}</h3>
            <p className="footer-col-line">{t.address}</p>
            <a
              className="footer-col-link"
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Finse+1222"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.openMaps}
            </a>
            <p className="footer-col-muted">{t.trainNote}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{t.copyright}</p>

          <div className="footer-actions">
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  className="footer-social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>

            <button type="button" className="footer-totop" onClick={toTop}>
              {t.toTop}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="6 11 12 5 18 11" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
