'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeHotelletForDere() {
  return (
    <PackageTemplate
      title="Hotellet for dere selv"
      subtitle="Når dere fortjener hele Finse"
      intro="For jubileer, kickoffs og feiringer der dere vil ha Finse 1222 helt for dere selv. Opp til 110 gjester, et dedikert personale, og rom til å forme oppholdet nøyaktig slik dere ønsker det. Magien av å være eneste gjester på Norges høyestliggende hotell."
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
      tags={['2–4 netter', 'Opp til 110 gjester', 'Eksklusivt']}
      includes={[
        { icon: 'hotel', text: 'Hele hotellet for deres gruppe' },
        { icon: 'food', text: 'Fullpensjon tilpasset deres ønsker' },
        { icon: 'party', text: 'Fleksibel arrangementshåndtering' },
        { icon: 'group', text: 'Dedikert personale' },
        { icon: 'fire', text: 'Privat bruk av alle fasiliteter' },
      ]}
      suitableFor={[
        { anledning: 'Julebord/firmafest', note: 'Hele hotellet til disposisjon — uten naboer i baren eller på dansegulvet.' },
        { anledning: 'Kick-off', note: 'Plass til større grupper, plenum og parallelle samlinger samtidig.' },
        { anledning: 'Privat arrangement', note: 'Jubileer og milepæler som fortjener en eksklusiv ramme.' },
        { anledning: 'Konferanse', note: 'Hold konferansen samlet — alle deltakere bor og spiser samme sted.' },
      ]}
      itinerary={[
        {
          label: 'Ankomst og feiring',
          body: 'Velkomstdrink på perrongen, innsjekk og fritt leide gjennom hotellet. En felles aktivitet eller teambuilding på ettermiddagen, før gallamiddagen — festmåltid med lokale råvarer.'
        },
        {
          label: 'Opplevelser',
          body: 'Frokostbuffet og en valgfri aktivitet — tur, ski, brevandring eller møte i grupper. Badstu og avslapning på ettermiddagen. Middag og underholdning på kvelden, formet etter dere.'
        },
        {
          label: 'Avreise med ro',
          body: 'Brunch og en langsom start. Tid for en siste tur ut for de som ønsker, før toget tar dere hjem. Et opphold dere kommer til å snakke om lenge etterpå.'
        },
      ]}
      ctaNote="Kontakt oss for tilgjengelighet og priser."
    />
  )
}
