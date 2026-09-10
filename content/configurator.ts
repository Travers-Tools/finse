import type { Lang } from '@/lib/i18n'

/**
 * Tekster for konfiguratoren. `id` på valg er den norske strengen som lagres i
 * skjemaet og sendes til hotellet (API/e-post) – den er lik på begge språk.
 * `label`/`title` er det som vises i grensesnittet.
 */
export type ConfigOption = { id: string; label: string }
export type ConfigActivity = { id: string; title: string; description: string }

export type ConfiguratorContent = {
  logoAlt: string
  stepIndicator: (step: number, total: number) => string
  /** Månedsnavn til visning, januar først. */
  months: string[]
  /** Ukedager til visning, mandag først. */
  weekdays: string[]
  nights: (n: number) => string
  nav: { back: string; next: string }
  step1: {
    title: string
    subtitle: string
    options: ConfigOption[]
    otherPlaceholder: string
  }
  step2: {
    title: string
    modeDates: string
    modeFlexible: string
    prevMonth: string
    nextMonth: string
    pickArrival: string
    arrivalPrefix: string
    arrivalSuffix: string
    howLong: string
    durations: ConfigOption[]
    whenInYear: string
    prevMonths: string
    nextMonths: string
    whenInWeek: string
    weekParts: ConfigOption[]
  }
  step3: { title: string; label: string; options: ConfigOption[] }
  step4: { title: string; subtitle: string; options: ConfigOption[] }
  step5: { title: string; subtitle: string; options: ConfigOption[] }
  step6: {
    title: string
    subtitle: string
    summer: ConfigActivity[]
    winter: ConfigActivity[]
    allYear: ConfigActivity[]
  }
  step7: {
    title: string
    name: string
    namePlaceholder: string
    company: string
    companyPlaceholder: string
    email: string
    emailPlaceholder: string
    phone: string
    phonePlaceholder: string
    notePlaceholder: string
    sending: string
    submit: string
    hint: string
  }
  summary: {
    title: string
    occasion: string
    arrival: string
    departure: string
    preferredMonth: string
    duration: string
    guests: string
    roomType: string
    meetingRoom: string
    activities: string
    note: string
  }
  errors: { sendFailed: string }
}

export const configurator: Record<Lang, ConfiguratorContent> = {
  no: {
    logoAlt: 'Hotel Finse1222',
    stepIndicator: (step, total) => `Steg ${step} av ${total}`,
    months: [
      'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
    ],
    weekdays: ['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'],
    nights: n => `${n} ${n === 1 ? 'natt' : 'netter'}`,
    nav: { back: 'Tilbake', next: 'Neste' },
    step1: {
      title: 'Hva er anledningen?',
      subtitle: 'Velg det som passer best',
      options: [
        { id: 'Ledergruppe', label: 'Ledergruppe' },
        { id: 'Teambuilding', label: 'Teambuilding' },
        { id: 'Strategisamling', label: 'Strategisamling' },
        { id: 'Kick-off', label: 'Kick-off' },
        { id: 'Julebord/firmafest', label: 'Julebord/firmafest' },
        { id: 'Konferanse', label: 'Konferanse' },
        { id: 'Privat arrangement', label: 'Privat arrangement' },
        { id: 'Annet', label: 'Annet' },
      ],
      otherPlaceholder: 'Beskriv anledningen din',
    },
    step2: {
      title: 'Når ønsker dere å komme?',
      modeDates: 'Datoer',
      modeFlexible: 'Fleksibel',
      prevMonth: 'Forrige måned',
      nextMonth: 'Neste måned',
      pickArrival: 'Velg ankomstdato',
      arrivalPrefix: 'Ankomst ',
      arrivalSuffix: ', velg avreisedato',
      howLong: 'Hvor lenge ønsker dere å bli?',
      durations: [
        { id: '1 natt', label: '1 natt' },
        { id: '2-3 netter', label: '2-3 netter' },
        { id: '4-5 netter', label: '4-5 netter' },
        { id: 'En uke', label: 'En uke' },
        { id: 'Over en uke', label: 'Over en uke' },
      ],
      whenInYear: 'Når på året?',
      prevMonths: 'Forrige måneder',
      nextMonths: 'Neste måneder',
      whenInWeek: 'Når i uken kommer dere?',
      weekParts: [
        { id: 'Midt i uken', label: 'Midt i uken' },
        { id: 'Helg', label: 'Helg' },
      ],
    },
    step3: {
      title: 'Hvor mange kommer?',
      label: 'Antall gjester',
      options: [
        { id: '1–4', label: '1–4' },
        { id: '5–15', label: '5–15' },
        { id: '15–30', label: '15–30' },
        { id: '30–60', label: '30–60' },
        { id: '60–110', label: '60–110' },
        { id: 'Over 110', label: 'Over 110' },
      ],
    },
    step4: {
      title: 'Hvilke romtyper ønsker dere?',
      subtitle: 'Velg gjerne flere, så setter vi opp pris på ulike kombinasjoner',
      options: [
        { id: 'Enkeltrom', label: 'Enkeltrom' },
        { id: 'Dobbeltrom med separate senger', label: 'Dobbeltrom med separate senger' },
        { id: 'Flersengsrom med separate senger', label: 'Flersengsrom med separate senger' },
        { id: 'Dobbeltrom med dobbeltseng', label: 'Dobbeltrom med dobbeltseng' },
      ],
    },
    step5: {
      title: 'Trenger dere møterom?',
      subtitle: 'Valgfritt, kan legges til senere',
      options: [
        { id: 'Hel dag', label: 'Hel dag' },
        { id: 'Halv dag', label: 'Halv dag' },
      ],
    },
    step6: {
      title: 'Hva ønsker dere å oppleve?',
      subtitle: 'Hotellet leier ut utstyr',
      summer: [
        { id: 'Fottur i området', title: 'Fottur i området', description: 'Juni til oktober. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold.' },
        { id: 'Sykkeltur i området', title: 'Sykkeltur i området', description: 'Juli til oktober. Vi tilpasser turmål etter tid og ønske. Vi har sykler til utlån.' },
        { id: 'Sykkeltur på Rallarvegen', title: 'Sykkeltur på Rallarvegen', description: 'Juli til september. Ikonisk rute med utsikt over Hardangervidda. Vi tilpasser turen etter tidsskjema og egne ønsker. Sykler og hjelmer leies fra hotellet.' },
        { id: 'Brevandring', title: 'Brevandring', description: 'Juli til september. Opplev isbreen på nært hold og utforsk blåisen på Hardangerjøkulen sammen med en erfaren guide.' },
      ],
      winter: [
        { id: 'Skiturer i området', title: 'Skiturer i området', description: 'Januar til mai. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold. Utstyr kan leies av oss.' },
        { id: 'Trugeturer', title: 'Trugeturer', description: 'Desember til mai. Truger er godt egnet for enkle turer i terrenget rundt Finse. Dette er en vinteraktivitet alle kan ta del i. Truger leies av oss.' },
        { id: 'Skiseiling', title: 'Skiseiling', description: 'Januar til mai. Skiseiling er en spennende måte å ferdes på i terrenget rundt Finse. Vinden sørger for fremdriften, og aktiviteten er forholdsvis enkel å lære. Noen timer på Finsevann gir garantert mestringsfølelse. Vi har alt nødvendig utstyr til utleie.' },
      ],
      allYear: [
        { id: 'Badstue og bading', title: 'Badstue og bading', description: 'Hele året. Badstue og bading i Finsevann, eller snøbading om vinteren. Bålpanne og varmt drikke, med utsikt til blåisen på Hardangerjøkulen.' },
        { id: 'Sidersmaking', title: 'Sidersmaking', description: 'Hele året. Bli bedre kjent med siderproduksjonen i Hardanger. Vi smaker og forteller historiene bak de lokale siderne.' },
        { id: 'Bålpanne og after hike/ski/bike', title: 'Bålpanne og after hike/ski/bike', description: 'Hele året. Avslutt dagen ved Framheim ved Finsevann. Vi fyrer opp bålpanne og serverer snacks og god drikke.' },
        { id: 'Finsequiz', title: 'Finsequiz', description: 'Hele året. Kveldsunderholdning foran peisen inne på hotellet. Kategoriene tilpasses, men vi sniker alltid med noen spørsmål om natur og Finse-historie.' },
        { id: 'Rallarmuseet', title: 'Rallarmuseet', description: 'Hele året. Lær om Bergensbanen og hvordan jernbanen over fjellet ble bygget av tøffe rallare og dyktige ingeniører på starten av 1900-tallet.' },
        { id: 'Polarhistorie i Framheim', title: 'Polarhistorie i Framheim', description: 'Hele året. På Finse har vi en tro kopi av Roald Amundsens base i Antarktis. Vi tør påstå at ingen steder i Norge er bedre egnet til å få fortellingen om de store norske og internasjonale polarheltene enn inne i Framheim ved Finsevann.' },
      ],
    },
    step7: {
      title: 'La oss ta kontakt',
      name: 'Navn',
      namePlaceholder: 'Ditt fulle navn',
      company: 'Bedrift',
      companyPlaceholder: 'Bedriftsnavn',
      email: 'E-post',
      emailPlaceholder: 'din@epost.no',
      phone: 'Telefon',
      phonePlaceholder: '+47',
      notePlaceholder: 'Noe annet vi bør vite? (valgfritt)',
      sending: 'Sender …',
      submit: 'Send forespørsel',
      hint: 'Vi svarer innen én arbeidsdag · Ingen binding',
    },
    summary: {
      title: 'Oppsummering',
      occasion: 'Anledning',
      arrival: 'Ankomst',
      departure: 'Avreise',
      preferredMonth: 'Ønsket måned',
      duration: 'Varighet',
      guests: 'Antall gjester',
      roomType: 'Romtype',
      meetingRoom: 'Møterom',
      activities: 'Aktiviteter',
      note: 'Navneliste med matintoleranser og kjøreplan trengs 4 uker før ankomst.',
    },
    errors: {
      sendFailed: 'Beklager, noe gikk galt da vi sendte forespørselen. Prøv igjen, eller kontakt oss på events@hotelfinse1222.no.',
    },
  },

  en: {
    logoAlt: 'Hotel Finse1222',
    stepIndicator: (step, total) => `Step ${step} of ${total}`,
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    nights: n => `${n} ${n === 1 ? 'night' : 'nights'}`,
    nav: { back: 'Back', next: 'Next' },
    step1: {
      title: 'What is the occasion?',
      subtitle: 'Choose the closest fit',
      options: [
        { id: 'Ledergruppe', label: 'Leadership team' },
        { id: 'Teambuilding', label: 'Team building' },
        { id: 'Strategisamling', label: 'Strategy retreat' },
        { id: 'Kick-off', label: 'Kick-off' },
        { id: 'Julebord/firmafest', label: 'Christmas party or company celebration' },
        { id: 'Konferanse', label: 'Conference' },
        { id: 'Privat arrangement', label: 'Private event' },
        { id: 'Annet', label: 'Other' },
      ],
      otherPlaceholder: 'Tell us about the occasion',
    },
    step2: {
      title: 'When would you like to come?',
      modeDates: 'Dates',
      modeFlexible: 'Flexible',
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      pickArrival: 'Choose an arrival date',
      arrivalPrefix: 'Arriving ',
      arrivalSuffix: ', now choose a departure date',
      howLong: 'How long would you like to stay?',
      durations: [
        { id: '1 natt', label: '1 night' },
        { id: '2-3 netter', label: '2–3 nights' },
        { id: '4-5 netter', label: '4–5 nights' },
        { id: 'En uke', label: 'One week' },
        { id: 'Over en uke', label: 'More than a week' },
      ],
      whenInYear: 'What time of year?',
      prevMonths: 'Earlier months',
      nextMonths: 'Later months',
      whenInWeek: 'Which part of the week?',
      weekParts: [
        { id: 'Midt i uken', label: 'Midweek' },
        { id: 'Helg', label: 'Weekend' },
      ],
    },
    step3: {
      title: 'How many are coming?',
      label: 'Number of guests',
      options: [
        { id: '1–4', label: '1–4' },
        { id: '5–15', label: '5–15' },
        { id: '15–30', label: '15–30' },
        { id: '30–60', label: '30–60' },
        { id: '60–110', label: '60–110' },
        { id: 'Over 110', label: 'More than 110' },
      ],
    },
    step4: {
      title: 'Which room types would you like?',
      subtitle: 'Feel free to choose several, and we will price a few combinations for you',
      options: [
        { id: 'Enkeltrom', label: 'Single room' },
        { id: 'Dobbeltrom med separate senger', label: 'Twin room, two single beds' },
        { id: 'Flersengsrom med separate senger', label: 'Shared room, single beds' },
        { id: 'Dobbeltrom med dobbeltseng', label: 'Double room, double bed' },
      ],
    },
    step5: {
      title: 'Do you need a meeting room?',
      subtitle: 'Optional, and it can be added later',
      options: [
        { id: 'Hel dag', label: 'Full day' },
        { id: 'Halv dag', label: 'Half day' },
      ],
    },
    step6: {
      title: 'What would you like to experience?',
      subtitle: 'Equipment can be hired from the hotel',
      summer: [
        { id: 'Fottur i området', title: 'Hiking around Finse', description: 'June to October. A welcome break from the meeting room. We choose the route to suit your schedule and the conditions on the day.' },
        { id: 'Sykkeltur i området', title: 'Cycling in the area', description: 'July to October. We adapt the route to your time and wishes. Bikes are available to borrow.' },
        { id: 'Sykkeltur på Rallarvegen', title: 'Cycling the Rallarvegen', description: 'July to September. A classic route with views across the Hardangervidda plateau. We tailor the ride to your timetable and wishes. Bikes and helmets can be hired from the hotel.' },
        { id: 'Brevandring', title: 'Glacier walk', description: 'July to September. See the glacier up close and explore the blue ice of Hardangerjøkulen with an experienced guide.' },
      ],
      winter: [
        { id: 'Skiturer i området', title: 'Ski touring around Finse', description: 'January to May. A welcome break from the meeting room. We choose the route to suit your schedule and the conditions on the day. Equipment can be hired from us.' },
        { id: 'Trugeturer', title: 'Snowshoe walks', description: 'December to May. Snowshoes are well suited to easy walks in the terrain around Finse, and this is a winter activity everyone can join. Snowshoes can be hired from us.' },
        { id: 'Skiseiling', title: 'Ski sailing', description: 'January to May. Ski sailing is an exciting way to move across the terrain around Finse. The wind does the work, and the basics are fairly easy to pick up. A few hours on the frozen lake at Finse leave everyone with a real sense of achievement. We have all the equipment you need for hire.' },
      ],
      allYear: [
        { id: 'Badstue og bading', title: 'Sauna and swimming', description: 'All year. Sauna and a swim in Lake Finsevann, or a roll in the snow in winter. A fire pit and something hot to drink, with a view of the blue ice on Hardangerjøkulen.' },
        { id: 'Sidersmaking', title: 'Cider tasting', description: 'All year. Get to know cider making in Hardanger. We taste the local ciders and tell the stories behind them.' },
        { id: 'Bålpanne og after hike/ski/bike', title: 'Fire pit and après hike, ski or bike', description: 'All year. End the day at Framheim by the lake. We light the fire pit and serve snacks and good drinks.' },
        { id: 'Finsequiz', title: 'Finse quiz', description: 'All year. Evening entertainment by the fireplace in the hotel. We adapt the categories to your group, but always slip in a few questions about nature and the history of Finse.' },
        { id: 'Rallarmuseet', title: 'The Navvy Museum', description: 'All year. Learn about the Bergen Line and how the railway across the mountains was built by hardy navvies and skilled engineers in the early 1900s.' },
        { id: 'Polarhistorie i Framheim', title: 'Polar history at Framheim', description: 'All year. At Finse we have a faithful replica of Roald Amundsen\'s Antarctic base. We would argue that nowhere in Norway is better suited to telling the story of the great Norwegian and international polar explorers than inside Framheim by the lake.' },
      ],
    },
    step7: {
      title: 'How can we reach you?',
      name: 'Name',
      namePlaceholder: 'Your full name',
      company: 'Company',
      companyPlaceholder: 'Company name',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      phone: 'Phone',
      phonePlaceholder: '+47',
      notePlaceholder: 'Anything else we should know? (optional)',
      sending: 'Sending …',
      submit: 'Send request',
      hint: 'We reply within one working day · No obligation',
    },
    summary: {
      title: 'Summary',
      occasion: 'Occasion',
      arrival: 'Arrival',
      departure: 'Departure',
      preferredMonth: 'Preferred month',
      duration: 'Duration',
      guests: 'Guests',
      roomType: 'Room type',
      meetingRoom: 'Meeting room',
      activities: 'Activities',
      note: 'We need a guest list with dietary requirements and a programme for your stay 4 weeks before arrival.',
    },
    errors: {
      sendFailed: 'Sorry, something went wrong when sending your request. Please try again, or contact us at events@hotelfinse1222.no.',
    },
  },
}
