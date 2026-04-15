import { getAllPosts } from '@/lib/notion'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '房產知識部落格 | 敏姐房產通',
  description: '🏠 買房節稅、市場分析、投資攻略，敏姐帶你搞懂雲林房產每一步！',
  openGraph: {
    title: '🏠 房產知識部落格｜敏姐房產通',
    description: '買房、賣房、節稅、投資，敏姐幫你搞懂每一步｜雲林斗六專業房仲',
    url: 'https://amin-blog.vercel.app/blog',
    siteName: '敏姐房產通',
    locale: 'zh_TW',
    type: 'website',
    images: [
      {
        url: 'https://amin-blog.vercel.app/agent.jpg',
        width: 800,
        height: 600,
        alt: '敏姐房產通 房產知識部落格',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🏠 房產知識部落格｜敏姐房產通',
    description: '買房、賣房、節稅、投資，敏姐幫你搞懂每一步',
    images: ['https://amin-blog.vercel.app/agent.jpg'],
  },
}

export const revalidate = 0

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main style={{ background: '#f8f7f5' }}>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 45%, #9b1c1c 80%, #b91c1c 100%)',
        padding: '80px 24px 70px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 裝飾光暈 */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(185,28,28,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fca5a5', fontSize: '0.85rem', fontWeight: 600,
            padding: '6px 18px', borderRadius: 999, marginBottom: 20,
            letterSpacing: 1,
          }}>
            🏠 雲林房產專業知識
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', marginBottom: 14, letterSpacing: 1 }}>
            房產知識部落格
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 36 }}>
            買房、賣房、節稅、投資，敏姐幫你搞懂每一步
          </p>

          {/* Agent Card */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            borderRadius: 20, padding: '22px 32px',
            flexWrap: 'wrap', justifyContent: 'center',
            maxWidth: 720, margin: '0 auto',
          }}>
            {/* 照片 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/agent.jpg"
              alt="敏姐"
              style={{ width: 82, height: 82, borderRadius: '50%', objectFit: 'cover', border: '3px solid #f87171', flexShrink: 0 }}
            />
            {/* 資訊 */}
            <div style={{ textAlign: 'left', flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 900, fontSize: '1.25rem', color: '#fff', marginBottom: 2 }}>敏姐房產通</div>
              <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginBottom: 8, letterSpacing: 1 }}>紅火房屋仲介有限公司</div>
              <a href="tel:0988146299" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: 700, display: 'block', marginBottom: 10 }}>
                📞 0988-146-299
              </a>
              <a href="https://maps.google.com/?q=雲林縣斗六市中正路312號" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', textDecoration: 'none', display: 'block', marginBottom: 10 }}>
                📍 雲林縣斗六市中正路312號
              </a>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a href="https://www.facebook.com/fantasichouse" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#1877F2', color: '#fff', padding: '5px 14px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
                  FB 敏姐房產通
                </a>
                <a href="https://wa.me/886988146299" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#25D366', color: '#fff', padding: '5px 14px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
                  💬 WhatsApp
                </a>
              </div>
            </div>
            {/* QR Code */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://amin-realty.github.io&color=1a1a2e&bgcolor=FFF7F7"
                alt="掃碼看網站"
                width={100} height={100}
                style={{ borderRadius: 10, border: '3px solid #f87171', padding: 4, background: '#FFF7F7' }}
              />
              <span style={{ fontSize: '0.72rem', color: '#fca5a5', letterSpacing: 2 }}>掃碼看網站</span>
              <a href="https://amin-realty.github.io" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', letterSpacing: 0.5 }}>
                amin-realty.github.io
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* POSTS */}
      <section style={{ maxWidth: 920, margin: '0 auto', padding: '52px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 5, height: 28, background: '#b91c1c', borderRadius: 3 }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1a1a2e', margin: 0 }}>最新文章</h2>
        </div>
        <div style={{ display: 'grid', gap: 20 }}>
          {posts.map((post) => (
            <article key={post.id} style={{
              background: '#fff',
              border: '1px solid #f0e8e8',
              borderRadius: 16, padding: '28px 32px',
              boxShadow: '0 2px 12px rgba(185,28,28,0.06)',
              transition: 'transform .2s, box-shadow .2s',
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {post.tags.map((tag) => (
                  <span key={tag} style={{
                    background: '#fff1f1', color: '#b91c1c',
                    padding: '3px 12px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700,
                    border: '1px solid #fecaca',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {post.title}
                </Link>
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: 18, lineHeight: 1.7 }}>
                {post.summary}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <time style={{ fontSize: '0.82rem', color: '#9ca3af' }}>{post.date}</time>
                <Link href={`/blog/${post.slug}`} style={{
                  background: 'linear-gradient(135deg, #b91c1c, #dc2626)',
                  color: '#fff',
                  padding: '8px 22px', borderRadius: 8,
                  textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700,
                  boxShadow: '0 3px 10px rgba(185,28,28,0.3)',
                }}>
                  閱讀全文 →
                </Link>
              </div>
            </article>
          ))}
        </div>
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>目前還沒有文章，敬請期待。</div>
        )}
      </section>
    </main>
  )
}
