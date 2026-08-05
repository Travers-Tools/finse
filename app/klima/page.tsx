'use client'

import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { KLIMA_FIGURES, KLIMA_SOURCE } from '../components/Klima'
import '../components/klima.css'
import './klima-side.css'

export default function KlimaPage() {
  return (
    <div className="klima klima-page">
      <Header variant="light" showBackButton={false} faqHref="/#faq" />

      <article className="klima-page-inner">
        <header className="klima-page-head">
          <span className="klima-modal-label">Klima</span>
          <h1 className="klima-page-title">
            En enkel måte å kutte bedriftens klimaavtrykk på
          </h1>
        </header>

        <section className="klima-prose">
          <p className="klima-lede">
            Noen ganger er det nødvendig å reise bort. En fellestur med jobben kan
            bety mye for arbeidsmiljøet, og noen dager utenfor kontoret er ofte
            både nyttige og samlende. For ledergruppa kan en strategisamling gi
            faglig påfyll og rom for nye tanker.
          </p>

          <p>
            Samtidig koster det å reise. Når vi forflytter oss, ligger omtrent 75
            prosent av reisens klimaavtrykk i transporten. Av tog, elbil og fly er
            toget den mest klimavennlige måten å komme seg fram på. Og toget er
            den eneste måten å komme helt til Finse på.
          </p>

          <p>
            På Finse skreddersyr vi opplegg med god mat, møterom, naturbaserte
            aktiviteter og omgivelser som setter seg i folk. Det er det jo mange
            andre steder i Norge som også kan. Men vi tror det er få steder der så
            eksotiske omgivelser kommer med et like lavt klimaavtrykk.
          </p>
        </section>

        <section className="klima-page-figures">
          <h2 className="klima-page-h2">Regnestykket</h2>
          <p className="klima-page-h2-sub">
            Ti personer fra en Oslo-bedrift skal på felles jobbsamling. Slik ser
            gruppas samlede utslipp ut for reisen til og fra reisemålet.
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
        </section>

        <section className="klima-prose">
          <p>
            For denne gruppa er Finse altså et nesten 50 ganger mer klimasmart
            valg enn en flybasert tur til Lofoten. Sammenlignet med en tur til
            Marbella er Finse rundt 150 ganger så klimasmart.
          </p>

          <p>
            I mange bedrifter utgjør de ansattes jobbreiser en betydelig del av
            det samlede klimaavtrykket. Å legge jobbturen til Finse framfor en
            flybasert destinasjon gir derfor et merkbart utslag, både i den
            enkeltes personlige avtrykk og når bedriften skal gjøre opp sitt
            årlige klimaregnskap.
          </p>
        </section>

        <section className="klima-page-aside">
          <h2 className="klima-page-h2">Møtet kan begynne på perrongen</h2>
          <p>
            Et togbasert reisemål har flere fordeler enn klimaregnskapet. Sammen
            med Vy kan vi legge til rette for at bedriftsgrupper får egen kupé
            eller vogn på turen. Da starter møtet med en gang dere reiser
            hjemmefra, og ikke først når dere kommer fram.
          </p>
        </section>

        <div className="klima-page-cta">
          <Link href="/#pakker" className="klima-band-btn klima-page-cta-btn">
            Se oppholdene våre
          </Link>
          <Link href="/configurator" className="klima-link">
            Eller lag deres eget
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}
