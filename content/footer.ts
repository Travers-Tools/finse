import type { Lang } from '@/lib/i18n'

export const footer: Record<Lang, {
  quote: string
  quoteSource: string
  talkTitle: string
  phone: string
  email: string
  replyTime: string
  findTitle: string
  address: string
  openMaps: string
  trainNote: string
  copyright: string
  toTop: string
}> = {
  no: {
    quote: '«...da siver noget av det ægte, uforfalskede høyfjellstemning inn i sindene.»',
    quoteSource: 'Edvard Welle-Strand, 1914, om peisen på Hotel Finse1222',
    talkTitle: 'Snakk med oss',
    phone: '+47 56 52 71 00',
    email: 'resepsjon@hotelfinse1222.no',
    replyTime: 'Vi svarer innen én arbeidsdag.',
    findTitle: 'Finn hit',
    address: 'Finse stasjon, 5765 Finse',
    openMaps: 'Åpne i Google Maps',
    trainNote: 'Bergensbanen stopper rett ved hotellet, flere daglige avganger.',
    copyright: '© 2026 Hotel Finse1222 · Norges høyestliggende hotell · 1222 moh.',
    toTop: 'Til toppen',
  },
  en: {
    quote: '“...then something of the true, unspoilt high-mountain mood seeps into the mind.”',
    quoteSource: 'Edvard Welle-Strand, 1914, on the fireplace at Hotel Finse1222',
    talkTitle: 'Talk to us',
    phone: '+47 56 52 71 00',
    email: 'resepsjon@hotelfinse1222.no',
    replyTime: 'We reply within one working day.',
    findTitle: 'Find us',
    address: 'Finse station, 5765 Finse, Norway',
    openMaps: 'Open in Google Maps',
    trainNote: 'The Bergen Line stops right by the hotel, with several departures a day.',
    copyright: '© 2026 Hotel Finse1222 · Norway’s highest hotel · 1,222 m a.s.l.',
    toTop: 'Back to top',
  },
}
