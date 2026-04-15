import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: '🏠 房產知識部落格｜敏姐房產通',
  description: '買房、賣房、節稅、投資，敏姐幫你搞懂每一步！雲林斗六專業房仲知識平台。',
  openGraph: {
    title: '🏠 房產知識部落格｜敏姐房產通',
    description: '買房、賣房、節稅、投資，敏姐幫你搞懂每一步！',
    url: 'https://amin-blog.vercel.app/share',
    siteName: '敏姐房產通',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: 'https://amin-blog.vercel.app/agent.jpg', width: 800, height: 600, alt: '敏姐房產通部落格' }],
  },
}

export default function SharePage() {
  redirect('/blog')
}
