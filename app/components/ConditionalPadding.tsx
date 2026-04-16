'use client'

import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export default function ConditionalPadding({ children }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return (
    <div style={isHome ? {} : { paddingTop: 64 }}>
      {children}
    </div>
  )
}
