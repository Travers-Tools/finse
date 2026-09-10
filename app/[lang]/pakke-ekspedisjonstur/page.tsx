'use client'

import PackageTemplate from '@/app/components/PackageTemplate'
import { useLang } from '@/lib/useLang'
import { pakkeEkspedisjon } from '@/content/pakke-ekspedisjon'

export default function PakkeEkspedisjonstur() {
  const lang = useLang()
  return <PackageTemplate {...pakkeEkspedisjon[lang]} />
}
