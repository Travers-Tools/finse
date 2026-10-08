import type { Lang } from '@/lib/i18n'

export const footer: Record<Lang, {
  /** Oppfordringen øverst i footeren: de som har bladd helt ned, skal ha en vei inn i konfiguratoren. */
  ctaTitle: string
  ctaButton: string
  ctaNote: string
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
    ctaTitle: 'Utforsk hvordan samlingen deres kan bli',
    ctaButton: 'Skreddersy oppholdet',
    ctaNote: 'Uforpliktende. Dere får et forslag med pris innen én arbeidsdag.',
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
    ctaTitle: 'Explore what your retreat could be',
    ctaButton: 'Tailor your stay',
    ctaNote: 'No obligation. You get a proposal with prices within one working day.',
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
