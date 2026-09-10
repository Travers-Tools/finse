import type { Lang } from '@/lib/i18n'

export const hero: Record<Lang, {
  kicker: string
  title: [string, string]
  subtitle: [string, string]
  pakker: string
  skreddersy: string
}> = {
  no: {
    kicker: 'Finse for bedrifter',
    title: ['Steng verden', 'ute på Finse'],
    subtitle: ['Finn fokus og ro 1222 meter over havet.', 'Ingen forstyrrelser, bare dere og fjellet.'],
    pakker: 'Utforsk pakker',
    skreddersy: 'Skreddersy oppholdet',
  },
  en: {
    kicker: 'Finse for business',
    title: ['Step out of the everyday,', 'at Finse'],
    subtitle: ['Find focus and calm 1,222 metres above sea level.', 'No distractions, just your group and the mountain.'],
    pakker: 'Explore packages',
    skreddersy: 'Tailor your stay',
  },
}
