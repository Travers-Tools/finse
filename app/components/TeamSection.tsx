import Link from 'next/link'
import { localePath, type Lang } from '@/lib/i18n'
import { team } from '@/content/forside'

export default function TeamSection({ lang }: { lang: Lang }) {
  const t = team[lang]
  return (
    <section className="content-section section-team">
      <div className="container">
        <div className="team-content">
          <div className="team-image">
            <img src="/assets/images/peisestua.jpg" alt={t.imageAlt} />
          </div>
          <div className="team-text">
            <h2 className="content-title">{t.title[0]}<br />{t.title[1]}</h2>
            <p className="content-description">{t.body}</p>
            <div className="team-signatures">
              <div className="signature">
                <span className="signature-name">{t.name}</span>
                <span className="signature-title">{t.role}</span>
              </div>
            </div>
            <Link href={localePath(lang, '/configurator')} className="btn btn-outline">
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
