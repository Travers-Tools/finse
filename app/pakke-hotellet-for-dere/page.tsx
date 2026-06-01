'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeHotelletForDere() {
  return (
    <PackageTemplate
      title="Hotellet for dere selv"
      subtitle="Når dere fortjener hele Finse"
      intro="For jubileer, konferanser, kickoffs og feiringer der dere vil ha Hotel Finse1222 helt for dere selv. På Finse er alle samlet, og dere har full frihet til å forme oppholdet slik dere vil."
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
          label: 'Ankomst',
          items: [
            { time: '14:00', title: 'Ankomst Finse', desc: 'Velkomstdrink på perrongen eller hotellet.' },
            { time: '15:00', title: 'Innsjekk', desc: 'Hotellet er deres.' },
            { time: '17:00', title: 'Aktivitet', desc: 'Felles tur eller teambuilding.' },
            { time: '19:30', title: 'Festmiddag i restauranten', desc: '' },
          ]
        },
        {
          label: 'Opplevelser',
          items: [
            { time: '07:00', title: 'Mulighet for morgenbading', desc: 'Om ønskelig kan vi fyre opp bålpannen og servere kaffe til morgenfugler som vil starte dagen med et bad i Finsevann, med utsikt mot blåisen på Hardangerjøkulen.' },
            { time: '08:00', title: 'Frokost og morgenkaffe', desc: '' },
            { time: '10:00', title: 'Valgfri aktivitet', desc: 'Sykkeltur, skitur, brevandring eller møte.' },
            { time: '15:00', title: 'Badstu og avslapning', desc: 'Foran peisen eller i solveggen.' },
            { time: '19:00', title: 'Middag og underholdning', desc: 'Kveld tilpasset dere.' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '09:00', title: 'Brunch', desc: 'Langsom start.' },
            { time: '11:00', title: 'Siste tur', desc: 'For de som ønsker.' },
            { time: '12:30', title: 'Tog hjem', desc: 'Muligheter for å leie egen togvogn eller togkupé for et avsluttende møte.' },
          ]
        },
      ]}
      activities={[
        {
          name: 'Sidersmaking',
          desc: 'Hele året. Bli bedre kjent med siderproduksjonen i Hardanger. Vi smaker og forteller historiene bak de lokale siderne.',
          image: '/assets/images/mat_finse.jpg',
        },
        {
          name: 'Finsequiz',
          desc: 'Hele året. Kveldsunderholdning foran peisen inne på hotellet. Kategoriene tilpasses, men vi sniker alltid med noen spørsmål om natur og Finse-historie.',
          image: '/assets/images/Finse_pakker00005.jpg',
        },
        {
          name: 'Bålpanne og after hike/ski/bike',
          desc: 'Hele året. Avslutt dagen ved Framheim ved Finsevann. Vi fyrer opp bålpanne og serverer snacks og god drikke.',
          image: '/assets/images/Finse_configurator_background.jpg',
        },
        {
          name: 'Polarhistorie i Framheim',
          desc: 'Hele året. På Finse har vi en tro kopi av Roald Amundsens base i Antarktis. Vi tør påstå at ingen steder i Norge er bedre egnet til å få fortellingen om de store norske og internasjonale polarheltene enn inne i Framheim ved Finsevann.',
          image: '/assets/images/nansen.png',
        },
      ]}
      ctaNote="Kontakt oss for tilgjengelighet og priser."
    />
  )
}
