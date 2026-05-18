'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeHotelletForDere() {
  return (
    <PackageTemplate
      title="Hotellet for dere selv"
      subtitle="Når dere fortjener hele Finse"
      intro="For jubileer, kickoffs og feiringer der dere vil ha Finse 1222 helt for dere selv. Opp til 110 gjester. Dere har hele hotellet, alt personalet, og full frihet til å forme oppholdet slik dere vil."
      heroImage={{
        src: '/assets/images/finse1222__242.JPG',
        alt: 'Hotellet for dere selv'
      }}
      gallery={[
        { src: '/assets/images/finse1222__242.JPG', alt: 'Hotellet for dere selv' },
        { src: '/assets/images/finse1222__182.JPG', alt: 'Interiør' },
        { src: '/assets/images/tog.png', alt: 'Tog' },
        { src: '/assets/images/finse.jpg', alt: 'Finse landskap' },
      ]}
      includes={[
        { icon: 'hotel', text: 'Hele hotellet for deres gruppe' },
        { icon: 'food', text: 'Frokost, lunsj og middag etter avtale' },
        { icon: 'party', text: 'Arrangementshåndtering' },
        { icon: 'group', text: 'Dedikert personale' },
        { icon: 'fire', text: 'Privat bruk av alle fasiliteter' },
      ]}
      suitableFor={['Julebord/firmafest', 'Kick-off', 'Privat arrangement', 'Konferanse']}
      itinerary={[
        {
          label: 'Ankomst og feiring',
          items: [
            { time: '14:00', title: 'Ankomst Finse', desc: 'Velkomstdrink på perrongen' },
            { time: '15:00', title: 'Innsjekk', desc: 'Hotellet er deres' },
            { time: '17:00', title: 'Aktivitet', desc: 'Felles tur eller teambuilding' },
            { time: '19:30', title: 'Gallamiddag', desc: 'Lokale råvarer' },
          ]
        },
        {
          label: 'Opplevelser',
          items: [
            { time: '08:00', title: 'Frokostbuffet', desc: '' },
            { time: '10:00', title: 'Valgfri aktivitet', desc: 'Tur, ski, brevandring eller møte' },
            { time: '15:00', title: 'Badstu og avslapning', desc: '' },
            { time: '19:00', title: 'Middag og underholdning', desc: 'Kveld tilpasset dere' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '09:00', title: 'Brunch', desc: 'Langsom start' },
            { time: '11:00', title: 'Siste tur', desc: 'For de som ønsker' },
            { time: '12:30', title: 'Tog hjem', desc: '' },
          ]
        },
      ]}
      ctaNote="Kontakt oss for tilgjengelighet og priser."
    />
  )
}
