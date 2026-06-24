export default function Footer() {
  return (
    <footer id="kontakt" className="footer">
      <div className="footer-bg" style={{ backgroundImage: "url('/assets/images/image.png')" }}></div>
      <div className="footer-overlay"></div>

      <div className="container footer-inner">
        <div className="footer-contact-grid">
          <div className="footer-col">
            <h3 className="footer-col-title">Snakk med oss</h3>
            <p className="footer-col-line">+47 56 52 71 00</p>
            <p className="footer-col-line">resepsjon@hotelfinse1222.no</p>
            <p className="footer-col-muted">Vi svarer innen én arbeidsdag.</p>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Finn hit</h3>
            <p className="footer-col-line">Finse stasjon, 5765 Finse</p>
            <a
              className="footer-col-link"
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Finse+1222"
              target="_blank"
              rel="noopener noreferrer"
            >
              Åpne i Google Maps
            </a>
            <p className="footer-col-muted">Bergensbanen stopper rett ved hotellet, flere daglige avganger.</p>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Sesong</h3>
            <p className="footer-col-line">Helårsåpent</p>
            <p className="footer-col-muted">Vinter: ski, truger og stjernekikking.</p>
            <p className="footer-col-muted">Sommer: rallarvegen, brevandring og morgenbad.</p>
          </div>
        </div>

        <div className="footer-quote">
          <p className="footer-quote-text">
            «...da siver noget av det ægte, uforfalskede høyfjellstemning inn i sindene.»
          </p>
          <p className="footer-quote-source">Edvard Welle-Strand, 1914, om peisen på Hotel Finse1222</p>
        </div>

        <div className="footer-bottom">
          <img src="/assets/logo/logo.png" alt="Hotel Finse1222" className="footer-logo" />
          <span className="footer-copyright">© 2026 Hotel Finse1222 · Norges høyestliggende hotell · 1222 moh.</span>
        </div>
      </div>
    </footer>
  )
}
