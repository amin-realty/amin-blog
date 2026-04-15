import type { Metadata } from 'next'

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
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/blog" />
      <div style={{ textAlign: 'center', padding: '80px 24px', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏠</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1a1a2e', marginBottom: 8 }}>敏姐房產通 房產知識部落格</h1>
        <p style={{ color: '#6b7280', marginBottom: 24 }}>買房、賣房、節稅、投資，敏姐幫你搞懂每一步！</p>
        <a href="/blog" style={{ background: '#b91c1c', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
          進入部落格 →
        </a>
      </div>
    </>
  )
}
