import { getAllPosts } from '@/lib/notion'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '房產知識部落格 | 敏姐房產通',
  description: '雲林斗六房產知識、買房指南、市場分析，由敏姐房產通專業顧問撰寫。',
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        padding: '80px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#d1fae5', fontSize: '0.85rem', fontWeight: 500,
            padding: '6px 16px', borderRadius: 999, marginBottom: 20,
          }}>
            📚 雲林斗六房產專業知識
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            房產知識部落格
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#a7f3d0', lineHeight: 1.8, marginBottom: 32 }}>
            買房、賣房、節稅、投資，敏姐幫你搞懂每一步
          </p>
          {/* Agent Card */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
            background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(110,231,183,0.4)',
            borderRadius: 16, padding: '20px 32px',
            flexWrap: 'wrap', justifyContent: 'center',
          }}>
            {/* 照片 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/agent.jpg"
              alt="敏姐"
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #6ee7b7', flexShrink: 0 }}
            />
            {/* 資訊 */}
            <div style={{ textAlign: 'left', flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#fff', marginBottom: 2 }}>敏姐房產通</div>
              <div style={{ color: '#6ee7b7', fontSize: '0.82rem', marginBottom: 8 }}>紅火房屋仲介有限公司</div>
              <a href="tel:0988146299" style={{ color: '#fca5a5', textDecoration: 'none', fontSize: '1rem', fontWeight: 700, display: 'block', marginBottom: 8 }}>
                📞 0988-146-299
              </a>
              <a href="https://maps.google.com/?q=雲林縣斗六市中正路312號" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textDecoration: 'none', display: 'block', marginBottom: 10 }}>
                📍 雲林縣斗六市中正路312號
              </a>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a href="https://www.facebook.com/fantasichouse" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#1877F2', color: '#fff', padding: '5px 14px', borderRadius: 6, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                  FB 敏姐房產通
                </a>
                <a href="https://wa.me/886988146299" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#25D366', color: '#fff', padding: '5px 14px', borderRadius: 6, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                  💬 WhatsApp
                </a>
              </div>
            </div>
            {/* QR Code */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://amin-realty.github.io&color=0D0D1A&bgcolor=EEF4FF"
                alt="掃碼看網站"
                width={108} height={108}
                style={{ borderRadius: 8, border: '3px solid #6ee7b7', padding: 4, background: '#EEF4FF' }}
              />
              <span style={{ fontSize: '0.72rem', color: '#6ee7b7', letterSpacing: 2 }}>掃碼看網站</span>
            </div>
          </div>
        </div>
      </section>

      {/* POSTS */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#064e3b', marginBottom: 32, borderLeft: '4px solid #25D366', paddingLeft: 12 }}>
          最新文章
        </h2>
        <div style={{ display: 'grid', gap: 24 }}>
          {posts.map((post) => (
            <article key={post.id} style={{
              border: '1px solid #e5e7eb', borderRadius: 16, padding: 28,
              transition: 'box-shadow .2s',
              boxShadow: '0 2px 8px rgba(6,78,59,0.06)',
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {post.tags.map((tag) => (
                  <span key={tag} style={{
                    background: '#d1fae5', color: '#065f46',
                    padding: '3px 10px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {post.title}
                </Link>
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: 16, lineHeight: 1.7 }}>
                {post.summary}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <time style={{ fontSize: '0.82rem', color: '#9ca3af' }}>{post.date}</time>
                <Link href={`/blog/${post.slug}`} style={{
                  background: '#064e3b', color: '#fff',
                  padding: '8px 20px', borderRadius: 8,
                  textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700,
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
