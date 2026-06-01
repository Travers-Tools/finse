import Link from 'next/link'

export default function TeamSection() {
  return (
    <section className="content-section section-team">
      <div className="container">
        <div className="team-content">
          <div className="team-image">
            <img src="/assets/images/Siv Lyngtun.jpg" alt="Siv" />
          </div>
          <div className="team-text">
            <h2 className="content-title">Vi gleder oss til<br />å ta imot dere</h2>
            <p className="content-description">
              På Hotel Finse1222 handler det om de ekte møtene – både med naturen og
              med hverandre. Vi sørger for at alt ligger til rette, så dere kan
              fokusere på det som virkelig betyr noe.
            </p>
            <div className="team-signatures">
              <div className="signature">
                <span className="signature-name">Siv</span>
                <span className="signature-title">Vert for grupper</span>
              </div>
            </div>
            <Link href="/configurator" className="btn btn-outline">
              Start planleggingen
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
