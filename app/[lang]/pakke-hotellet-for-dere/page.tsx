'use client'

import PackageTemplate from '@/app/components/PackageTemplate'
import { useLang } from '@/lib/useLang'
import { pakkeHotellet } from '@/content/pakke-hotellet'

export default function PakkeHotelletForDere() {
  const lang = useLang()
  return <PackageTemplate {...pakkeHotellet[lang]} />
}
