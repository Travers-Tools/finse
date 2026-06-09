'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeEkspedisjonstur() {
  return (
    <PackageTemplate
      title="Ekspedisjonstur"
      subtitle="I fotsporene til Nansen og Amundsen"
      intro="Finse og omgivelsene rundt hotellet har vært base for norske polfarere i over hundre år. Her får dere kjenne på det selv, i et tempo som passer gruppen. Turene og utfordringene tilpasses deres eget ambisjonsnivå og program."
      heroImage={{
        src: '/assets/images/ekspedisjon-guide.jpg',
        alt: 'Guide briefer gruppen før turen'
      }}
      gallery={[
        { src: '/assets/images/ekspedisjon-guide.jpg', alt: 'Guide briefer gruppen før turen' },
        { src: '/assets/images/ekspedisjon-sommer.jpg', alt: 'Sykkeltur mot Hardangerjøkulen' },
        { src: '/assets/images/pkg-hotellet.jpg', alt: 'Finse om sommeren' },
        { src: '/assets/images/pkg-ekspedisjon.jpg', alt: 'Skiseiling på vidda' },
      ]}
      includes={[
        { icon: 'bed', text: 'Overnatting i komfortable rom' },
        { icon: 'food', text: 'Frokost, matpakke og treretters middag' },
        { icon: 'ski', text: 'Guidede turer (ski, bre eller sykkel)' },
        { icon: 'gear', text: 'Utstyr kan leies på stedet' },
        { icon: 'fire', text: 'Kvelder ved peisen' },
      ]}
      suitableFor={['Teambuilding', 'Kick-off', 'Privat arrangement', 'Ledergruppe']}
      itinerary={[
        {
          label: 'Ankomst og forberedelser',
          items: [
            { time: '12:00', title: 'Ankomst, innsjekk og lunsj', desc: 'Lunsj serveres etter ønske.' },
            { time: '13:00', title: 'Arbeidsøkt', desc: 'Tid i møterommet fram til 16:00.' },
            { time: '16:00', title: 'Briefing', desc: 'Vi går gjennom morgendagens tur, planlegger og tilpasser utstyr.' },
            { time: '19:00', title: 'Tre retters middag', desc: 'Med utsikt mot Hardangerjøkulen.' },
          ]
        },
        {
          label: 'Eventyr på vidda',
          items: [
            { time: '07:00', title: 'Mulighet for morgenbading', desc: 'Om ønskelig kan vi fyre opp bålpannen og servere kaffe til morgenfugler som vil starte dagen med et bad i Finsevann, med utsikt mot blåisen på Hardangerjøkulen.' },
            { time: '08:00', title: 'Tidlig frokost', desc: 'Energi til dagen.' },
            { time: '09:00', title: 'Guidet tur', desc: 'Ski, brevandring eller sykkeltur på Rallarvegen.' },
            { time: '16:00', title: 'Hjem til hotellet', desc: 'Hvile, badstu, peis eller noe å drikke i solveggen.' },
            { time: '19:30', title: 'Festmiddag', desc: 'God mat og godt drikke.' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '09:00', title: 'Sen frokost', desc: 'Ta det med ro.' },
            { time: '10:00', title: 'Kaffe', desc: 'Foran peisen eller foran bålpannen ute.' },
            { time: '10:30', title: 'Tog hjem', desc: 'Muligheter for å leie egen togvogn eller togkupé for et avsluttende møte.' },
          ]
        },
      ]}
      activities={[
        {
          name: 'Skiseiling',
          desc: 'Januar til mai. Skiseiling er en spennende måte å ferdes på i terrenget rundt Finse. Vinden sørger for fremdriften, og aktiviteten er forholdsvis enkel å lære. Noen timer på Finsevann gir garantert mestringsfølelse. Vi har alt nødvendig utstyr til utleie.',
          image: '/assets/images/akt-skiseiling.jpg',
        },
        {
          name: 'Skiturer i området',
          desc: 'Januar til mai. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold. Utstyr kan leies av oss.',
          image: '/assets/images/akt-skitur.jpg',
        },
        {
          name: 'Trugeturer',
          desc: 'Desember til mai. Truger er godt egnet for enkle turer i terrenget rundt Finse. Dette er en vinteraktivitet alle kan ta del i. Truger leies av oss.',
          image: '/assets/images/akt-truger.jpg',
        },
        {
          name: 'Stjernekikking',
          desc: 'Oktober til mars. Med minimalt med kunstig lys og en vid, åpen himmel byr Finse på enestående forhold for å oppleve stjernene, mørket og den skiftende nattehimmelen. Vi samarbeider med en astroguide som kan vise dere himmelen på en helt ny måte.',
          image: '/assets/images/akt-stjerner.jpg',
        },
        {
          name: 'Sykkeltur på Rallarvegen',
          desc: 'Juli til september. Ikonisk rute med utsikt over Hardangervidda. Vi tilpasser turen etter tidsskjema og egne ønsker. Sykler og hjelmer leies fra hotellet.',
          image: '/assets/images/akt-rallarvegen.jpg',
        },
        {
          name: 'Brevandring',
          desc: 'Juli til september. Opplev isbreen på nært hold og utforsk blåisen på Hardangerjøkulen sammen med en erfaren guide.',
          image: '/assets/images/akt-brevandring.jpg',
        },
        {
          name: 'Fottur i området',
          desc: 'Juni til oktober. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold.',
          image: '/assets/images/akt-fottur-kart.jpg',
        },
        {
          name: 'Morgenbad i Finsevann',
          desc: 'Morgenbad, bålpanne og varmt drikke, med utsikt til blåisen på Hardangerjøkulen. En enkel opplevelse med stor effekt.',
          image: '/assets/images/akt-morgenbad.jpg',
        },
        {
          name: 'Polarhistorie i Framheim',
          desc: 'Hele året. På Finse har vi en tro kopi av Roald Amundsens base i Antarktis. Vi tør påstå at ingen steder i Norge er bedre egnet til å få fortellingen om de store norske og internasjonale polarheltene enn inne i Framheim ved Finsevann.',
          image: '/assets/images/nansen.png',
        },
        {
          name: 'Rallarmuseet',
          desc: 'Hele året. Lær om Bergensbanen og hvordan jernbanen over fjellet ble bygget av tøffe rallare og dyktige ingeniører på starten av 1900-tallet.',
          image: '/assets/images/Finseskilt.jpg',
        },
      ]}
      ctaNote="Vi tilpasser aktivitetene etter sesong og ønsker."
    />
  )
}
