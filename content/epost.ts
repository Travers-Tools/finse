import type { Lang } from '@/lib/i18n'

/**
 * Tekstene i bekreftelsen til kunden, på begge språk. E-posten til hotellet er
 * alltid norsk og ligger i epost.ts. Strengene her settes inn uescapet i HTML
 * via esc(), så skriv vanlige tegn, ikke entiteter.
 */
export const kundeEpost: Record<Lang, {
  /** Emnefelt, uten « – Hotel Finse1222»-suffikset som route.ts legger på. */
  emne: string
  /** <title> i HTML-dokumentet. */
  tittel: string
  preheader: string
  takk: (fornavn: string) => string
  svarInnen: string
  rader: {
    anledning: string
    dato: string
    varighet: string
    antall: string
    romtyper: string
    aktiviteter: string
  }
  delLenke: string
  seOppsummering: string
  /** Det praktiske hotellet trenger hvis det blir en bestilling. Flyttet hit fra steg 7 i konfiguratoren. */
  praktisk: string
  /** Delt i to rundt telefonnummeret, som er en lenke i HTML. */
  sporsmaal: [string, string]
  bunnlinje: string
}> = {
  no: {
    emne: 'Vi har mottatt forespørselen din',
    tittel: 'Vi har mottatt forespørselen din',
    preheader: 'Vi tar kontakt innen én arbeidsdag.',
    takk: fornavn => `Takk for forespørselen${fornavn ? `, ${fornavn}` : ''}`,
    svarInnen: 'Vi kommer tilbake med et forslag til en skreddersydd pakke innen én arbeidsdag.',
    rader: {
      anledning: 'Anledning',
      dato: 'Dato',
      varighet: 'Varighet',
      antall: 'Antall gjester',
      romtyper: 'Romtyper',
      aktiviteter: 'Aktiviteter',
    },
    delLenke: 'Her er forespørselen oppsummert på én side, klar til å dele med kollegaer.',
    seOppsummering: 'Se oppsummeringen',
    praktisk: 'Blir det et opphold, trenger vi navneliste med matintoleranser og kjøreplan senest fire uker før ankomst. Det tar vi sammen når den tid kommer.',
    sporsmaal: ['Har dere spørsmål i mellomtiden, svar gjerne på denne e-posten eller ring oss på ', '.'],
    bunnlinje: 'Hotel Finse1222 · Norges høyestliggende hotell · 1222 moh.',
  },
  en: {
    emne: 'We have received your request',
    tittel: 'We have received your request',
    preheader: 'We will be in touch within one working day.',
    takk: fornavn => `Thank you for your request${fornavn ? `, ${fornavn}` : ''}`,
    svarInnen: 'We will come back to you with a proposal for a tailored package within one working day.',
    rader: {
      anledning: 'Occasion',
      dato: 'Dates',
      varighet: 'Duration',
      antall: 'Number of guests',
      romtyper: 'Room types',
      aktiviteter: 'Activities',
    },
    delLenke: 'Here is your request summarised on a single page, ready to share with colleagues.',
    seOppsummering: 'View the summary',
    praktisk: 'If the stay goes ahead, we will need a guest list with dietary requirements and a programme no later than four weeks before arrival. We will sort that out together when the time comes.',
    sporsmaal: ['If you have any questions in the meantime, simply reply to this e-mail or call us on ', '.'],
    bunnlinje: 'Hotel Finse1222 · Norway’s highest hotel · 1,222 m a.s.l.',
  },
}

/** Slik språket omtales i hotellets varsel, så de vet hvilket språk de skal svare på. */
export const spraakNavn: Record<Lang, string> = {
  no: 'norsk',
  en: 'engelsk',
}
