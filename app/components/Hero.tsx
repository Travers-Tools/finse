import Link from 'next/link'

export default function Hero() {
  return (
    <main className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Steng verden<br />
          ute på Finse
        </h1>
        <p className="hero-subtitle">
          Hold møter og arrangementer i unike omgivelser. Hotel Finse1222<br />
          er et sted hvor det er lett å samles, tenke og knytte kontakter.
        </p>
        <div className="hero-buttons">
          <a href="#pakker" className="btn btn-tertiary">Utforsk pakker</a>
          <Link href="/configurator" className="btn btn-outline-light">Skreddersy oppholdet</Link>
        </div>
      </div>
    </main>
  )
}
