'use client'

import PackageTemplate from '@/app/components/PackageTemplate'
import { useLang } from '@/lib/useLang'
import { pakkeFokus } from '@/content/pakke-fokus'

export default function PakkeFokusPaaVidda() {
  const lang = useLang()
  return <PackageTemplate {...pakkeFokus[lang]} />
}
