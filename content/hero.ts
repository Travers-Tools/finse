import type { Lang } from '@/lib/i18n'

export const hero: Record<Lang, {
  title: [string, string]
  subtitle: [string, string]
  pakker: string
  skreddersy: string
}> = {
  no: {
    title: ['Ta med bedriften', 'til fjells'],
    subtitle: ['Finn fokus og ro 1222 meter over havet.', 'Ingen forstyrrelser, bare dere og fjellet.'],
    pakker: 'Utforsk pakker',
    skreddersy: 'Skreddersy oppholdet',
  },
  en: {
    title: ['Take the team', 'to the mountains'],
    subtitle: ['Find focus and calm 1,222 metres above sea level.', 'No distractions, just your group and the mountain.'],
    pakker: 'Explore packages',
    skreddersy: 'Tailor your stay',
  },
}
