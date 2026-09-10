import type { Lang } from '@/lib/i18n'

export const header: Record<Lang, {
  pakker: string
  skreddersy: string
  klima: string
  sporsmal: string
  kontakt: string
  tilbake: string
  tilHovedsiden: string
  logoAria: string
  aapneMeny: string
  lukkMeny: string
  menyVenstre: string
  menyHoyre: string
}> = {
  no: {
    pakker: 'Pakker',
    skreddersy: 'Skreddersy',
    klima: 'Klima',
    sporsmal: 'Spørsmål',
    kontakt: 'Kontakt oss',
    tilbake: '← Tilbake',
    tilHovedsiden: '← hotelfinse1222.no',
    logoAria: 'Hotel Finse1222 – til forsiden',
    aapneMeny: 'Åpne meny',
    lukkMeny: 'Lukk meny',
    menyVenstre: 'Meny venstre',
    menyHoyre: 'Meny høyre',
  },
  en: {
    pakker: 'Packages',
    skreddersy: 'Tailor-made',
    klima: 'Climate',
    sporsmal: 'FAQ',
    kontakt: 'Contact us',
    tilbake: '← Back',
    tilHovedsiden: '← hotelfinse1222.no',
    logoAria: 'Hotel Finse1222 – home',
    aapneMeny: 'Open menu',
    lukkMeny: 'Close menu',
    menyVenstre: 'Menu left',
    menyHoyre: 'Menu right',
  },
}
