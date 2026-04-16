'use client'

import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export default function ConditionalNav({ children }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  if (isHome) return null
  return <>{children}</>
}
