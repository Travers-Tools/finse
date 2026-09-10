import type { Lang } from '@/lib/i18n'

export const faq: Record<Lang, {
  title: [string, string]
  avatarAlt: string
  avatarName: string
  avatarEmail: string
  items: { question: string; answer: string }[]
}> = {
  no: {
    title: ['Disse spørsmålene', 'dukker gjerne opp.'],
    avatarAlt: 'Siv',
    avatarName: 'Siv',
    avatarEmail: 'events@hotelfinse1222.no',
    items: [
      {
        question: 'Hvordan kommer vi oss til Finse?',
        answer: 'Hotellet ligger rett ved siden av Finse stasjon, som betjenes av Bergensbanen, en av verdens vakreste togstrekninger. Bergensbanen har flere daglige avganger i begge retninger, og det er mulig å leie egen togvogn eller togkupé dersom dere vil starte reisen med sosiale aktiviteter eller møter.',
      },
      {
        question: 'Hvor mange gjester kan dere ta imot?',
        answer: 'Vi har plass til opptil 110 gjester. Hotellet kan også bookes eksklusivt for deres gruppe, slik at dere får hele Hotel Finse1222 for dere selv.',
      },
      {
        question: 'Hvilken tid på året er best for bedriftsopphold?',
        answer: 'Finse er fantastisk hele året. Vinteren byr på ski, truger og nordlys. Sommeren gir midnattssol, sykling på Rallarvegen og brevandring. Høsten er rolig og perfekt for fokus.',
      },
      {
        question: 'Har dere møterom og fasiliteter for seminarer?',
        answer: 'Ja, vi har flere rom som kan tilpasses møter, workshops og presentasjoner. Vi har prosjektor, whiteboard og god wifi. Flere av rommene har fantastisk utsikt over Hardangerjøkulen og Hardangervidda.',
      },
      {
        question: 'Hva er inkludert i oppholdet?',
        answer: 'Alle opphold inkluderer overnatting, frokost, lunsj og middag med lokale råvarer. Aktiviteter og spesielle arrangementer kan skreddersys etter behov.',
      },
      {
        question: 'Kan vi tilpasse programmet?',
        answer: 'Absolutt. Vi skreddersyr oppholdet basert på deres ønsker og behov. Bruk konfiguratoren vår eller ta kontakt direkte, så lager vi et forslag sammen.',
      },
    ],
  },
  en: {
    title: ['Questions we are', 'often asked.'],
    avatarAlt: 'Siv',
    avatarName: 'Siv',
    avatarEmail: 'events@hotelfinse1222.no',
    items: [
      {
        question: 'How do we get to Finse?',
        answer: 'The hotel sits right next to Finse station, served by the Bergen Line, one of the most scenic railways in the world. There are several departures a day in both directions, and you can hire your own carriage or compartment if you would like to begin the journey with meetings or something social.',
      },
      {
        question: 'How many guests can you accommodate?',
        answer: 'We have room for up to 110 guests. The hotel can also be booked exclusively for your group, so you have the whole of Hotel Finse1222 to yourselves.',
      },
      {
        question: 'What time of year is best for a company stay?',
        answer: 'Finse is remarkable all year round. Winter offers skiing, snowshoeing and the northern lights. Summer brings the midnight sun, cycling on Rallarvegen and glacier walks. Autumn is quiet and ideal for focused work.',
      },
      {
        question: 'Do you have meeting rooms and facilities for seminars?',
        answer: 'Yes. We have several rooms that can be set up for meetings, workshops and presentations, with projector, whiteboard and good wifi. Several of them look out over the Hardangerjøkulen glacier and the Hardangervidda plateau.',
      },
      {
        question: 'What is included in the stay?',
        answer: 'Every stay includes accommodation, breakfast, lunch and dinner made with local produce. Activities and special events can be tailored to your needs.',
      },
      {
        question: 'Can we adapt the programme?',
        answer: 'Absolutely. We tailor the stay around your wishes and needs. Use our configurator or get in touch directly, and we will put together a proposal with you.',
      },
    ],
  },
}
