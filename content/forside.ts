import type { Lang } from '@/lib/i18n'

/* Innholdsseksjonene (toget, natur, historie). Bildestier ligger i komponenten. */
export const contentSections: Record<Lang, {
  sections: {
    title: [string, string]
    body: string
    cta: string
    alts: string[]
  }[]
}> = {
  no: {
    sections: [
      {
        title: ['Gå på toget i byen,', 'gå av på vidda.'],
        body: 'På Finse er det toget som tar deg frem. Gå på toget i byen, og gå av på vidda.',
        cta: 'Skreddersy din pakke',
        alts: ['Tog til Finse', 'Restaurant', 'På tur'],
      },
      {
        title: ['Stillhet og ro møter rå', 'natur og oppdagerlyst'],
        body: 'Ingen biler, ingen forstyrrelser. Bare vidda, himmelen og gode samtaler. Her får teamet rom til å tenke stort – og koble av skikkelig.',
        cta: 'Lag din bedriftspakke',
        alts: ['Avslapning', 'Utsikt fra Finse'],
      },
      {
        title: ['Over 100 år med', 'eventyrlyst og ambisjoner'],
        body: 'Fra Nansen til Ousland har Finse vært stedet. Nå er det deres tur.',
        cta: 'Skriv din historie',
        alts: ['Historisk kart', 'Fridtjof Nansen'],
      },
    ],
  },
  en: {
    sections: [
      {
        title: ['Board the train in the city,', 'step off on the plateau.'],
        body: 'At Finse, the train is what gets you here. Board in the city and step off on the mountain plateau.',
        cta: 'Tailor your package',
        alts: ['Train to Finse', 'Restaurant', 'Out walking'],
      },
      {
        title: ['Stillness and calm meet raw', 'nature and a spirit of discovery'],
        body: 'No cars, no distractions. Just the plateau, the sky and good conversation. Here your team has room to think big, and to properly switch off.',
        cta: 'Build your company package',
        alts: ['Relaxing', 'View from Finse'],
      },
      {
        title: ['Over 100 years of', 'adventure and ambition'],
        body: 'From Nansen to Ousland, Finse has been the place. Now it’s your turn.',
        cta: 'Write your story',
        alts: ['Historical map', 'Fridtjof Nansen'],
      },
    ],
  },
}

export interface Testimonial {
  quote: string
  company: string
  details: string
}

export const testimonials: Record<Lang, Testimonial[]> = {
  no: [
    {
      quote: 'Utrolig bra opplevelse. Vi hadde en intern spørreundersøkelse og turen fikk 5,5 av 6!',
      company: 'Eviny',
      details: 'Teambuilding, 40 personer',
    },
    {
      quote: 'Fantastisk service, nydelig natur, veldig god mat! Beliggenhet midt mellom Bergen og Oslo var perfekt.',
      company: 'Meteorologisk institutt',
      details: 'Konferanse, 29 personer',
    },
    {
      quote: 'Alt fra service, mat, personal og sted var helt suverent. Vi leide hele hotellet – helt magisk.',
      company: 'Verdane',
      details: 'Privat feiring, 110 gjester',
    },
    {
      quote: 'Det at lokasjonen var lukket var en ukjent fordel – alle snakket med hverandre.',
      company: 'Eviny',
      details: 'Firmatur, 40 personer',
    },
    {
      quote: 'Å starte turen i egen leid togvogn var genialt. Kjempe flott hotell med flott natur rundt.',
      company: 'SYSTRA',
      details: 'Julebord, 44 personer',
    },
    {
      quote: 'Fantastisk! Personalet var veldig hyggelige og behjelpelig, rommene var store, fine og rene og maten var av topp klasse. 100% fornøyde.',
      company: 'Bryn Byggkontroll',
      details: 'Avdelingstur, 15 personer',
    },
    {
      quote: 'Utrolig fin opplevelse. Polartime på Framheim, skiseilekurs, god matopplevelse, fine rom og ikke minst hyggelig personale.',
      company: 'Pandion Energy',
      details: 'Firmatur, 20 personer',
    },
    {
      quote: 'Veldig flott, god tilrettelegging fra Finse 1222 fra vi kom til vi dro. Praktisk med matpakke til Rallarvegen og bagasjesending.',
      company: '7analytics',
      details: 'Blåtur, 17 personer',
    },
    {
      quote: 'Det var utrolig fint! Vi ville være der hvert år hvis vi kunne. Alt har vært helt suverent.',
      company: 'Norfund',
      details: 'Jobbtur, 8 personer',
    },
    {
      quote: 'Vi var veldig fornøyde med alt, våre kriterier ble møtt og et meget hyggelig personale. Super møterom og mat – nydelige kanelboller!',
      company: 'Tribia',
      details: 'Ledersamling, 8 personer',
    },
    {
      quote: 'Meget god opplevelse. Hotellet leverte godt på restaurantopplevelse, hyggelig personell, beliggenhet og komfort.',
      company: 'NorgesGruppen',
      details: 'Fellestur, 10 personer',
    },
    {
      quote: 'Meget bra. Utrolig bra mat og veldig fint at dere hadde en sommelier som var interessert i mat og vin.',
      company: 'Forsvaret',
      details: 'Samling, 15 personer',
    },
  ],
  en: [
    {
      quote: 'A really good experience. We ran an internal survey afterwards and the trip scored 5.5 out of 6.',
      company: 'Eviny',
      details: 'Team building, 40 people',
    },
    {
      quote: 'Fantastic service, beautiful scenery, very good food. The location halfway between Bergen and Oslo was perfect.',
      company: 'Meteorologisk institutt',
      details: 'Conference, 29 people',
    },
    {
      quote: 'Everything, from the service and food to the staff and the setting, was superb. We hired the whole hotel. Pure magic.',
      company: 'Verdane',
      details: 'Private celebration, 110 guests',
    },
    {
      quote: 'The fact that the location was closed off turned out to be an unexpected advantage. Everyone talked to each other.',
      company: 'Eviny',
      details: 'Company trip, 40 people',
    },
    {
      quote: 'Starting the trip in our own hired railway carriage was a brilliant idea. A wonderful hotel with beautiful nature all around.',
      company: 'SYSTRA',
      details: 'Christmas party, 44 people',
    },
    {
      quote: 'Fantastic. The staff were very friendly and helpful, the rooms were large, lovely and clean, and the food was top class. 100% satisfied.',
      company: 'Bryn Byggkontroll',
      details: 'Department trip, 15 people',
    },
    {
      quote: 'A really lovely experience. A polar history session at Framheim, a ski-sailing course, good food, nice rooms and, not least, friendly staff.',
      company: 'Pandion Energy',
      details: 'Company trip, 20 people',
    },
    {
      quote: 'Very good, and well organised by Finse 1222 from the moment we arrived until we left. Packed lunches for Rallarvegen and luggage transfer were very practical.',
      company: '7analytics',
      details: 'Mystery trip, 17 people',
    },
    {
      quote: 'It was wonderful. We would go every year if we could. Everything was superb.',
      company: 'Norfund',
      details: 'Work trip, 8 people',
    },
    {
      quote: 'We were very pleased with everything. Our criteria were met and the staff were very friendly. Great meeting room and food, and delicious cinnamon buns.',
      company: 'Tribia',
      details: 'Leadership retreat, 8 people',
    },
    {
      quote: 'A very good experience. The hotel delivered on the restaurant, friendly staff, location and comfort.',
      company: 'NorgesGruppen',
      details: 'Team outing, 10 people',
    },
    {
      quote: 'Very good. Excellent food, and it was a real bonus to have a sommelier who cared about food and wine.',
      company: 'Forsvaret',
      details: 'Gathering, 15 people',
    },
  ],
}

export const team: Record<Lang, {
  imageAlt: string
  title: [string, string]
  body: string
  name: string
  role: string
  cta: string
}> = {
  no: {
    imageAlt: 'Peisestuen på Hotel Finse1222',
    title: ['Vi gleder oss til', 'å ta imot dere'],
    body: 'På Hotel Finse1222 handler det om de ekte møtene – både med naturen og med hverandre. Vi sørger for at alt ligger til rette, så dere kan fokusere på det som virkelig betyr noe.',
    name: 'Vertskapet på Hotel Finse1222',
    role: 'events@hotelfinse1222.no',
    cta: 'Start planleggingen',
  },
  en: {
    imageAlt: 'The fireside lounge at Hotel Finse1222',
    title: ['We look forward to', 'welcoming you'],
    body: 'Hotel Finse1222 is about real encounters, with nature and with each other. We make sure everything is in place, so you can focus on what really matters.',
    name: 'Your hosts at Hotel Finse1222',
    role: 'events@hotelfinse1222.no',
    cta: 'Start planning',
  },
}
