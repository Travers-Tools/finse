import Link from 'next/link'
import { localePath, type Lang } from '@/lib/i18n'
import { contentSections } from '@/content/forside'
import StorySlider from './StorySlider'

/* Bildestier per seksjon, i samme rekkefølge som alt-tekstene i ordboken. */
const IMAGES: string[][] = [
  ['/assets/images/tog.png', '/assets/images/finse1222__242.JPG', '/assets/images/tur.png'],
  ['/assets/images/finse1222__182.JPG', '/assets/images/tak.png'],
  ['/assets/images/kart.png', '/assets/images/nansen.png'],
]

export default function ContentSections({ lang }: { lang: Lang }) {
  const t = contentSections[lang]
  return (
    <>
      {t.sections.map((s, i) => (
        <section key={i} id={i === 0 ? 'utforsk' : undefined} className="content-section">
          <div className="container">
            <div className="content-grid">
              <div className="content-text">
                <h2 className="content-title">{s.title[0]}<br />{s.title[1]}</h2>
                <p className="content-description">{s.body}</p>
                <Link href={localePath(lang, '/configurator')} className="btn btn-outline">
                  {s.cta}
                </Link>
              </div>
              <StorySlider
                sliderId={String(i + 1)}
                images={IMAGES[i].map((src, j) => ({ src, alt: s.alts[j] }))}
              />
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
