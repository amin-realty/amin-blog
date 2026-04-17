import { getPostBySlug, getAllPosts, blocksToHtml } from '@/lib/notion'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 0

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const result = await getPostBySlug(params.slug)
  if (!result) return {}
  return {
    title: `${result.post.title} | 敏姐房產通`,
    description: result.post.summary,
    openGraph: {
      title: result.post.title,
      description: result.post.summary,
      type: 'article',
      publishedTime: result.post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const result = await getPostBySlug(params.slug)
  if (!result) notFound()

  const { post, blocks } = result
  const html = blocksToHtml(blocks)

  return (
    <main>
      {/* Hero 標題區 */}
      <section style={{
        background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 45%, #9b1c1c 80%, #b91c1c 100%)',
        padding: '60px 24px 48px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <a href="/blog" style={{
            display: 'inline-block', marginBottom: 20,
            color: '#fca5a5', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
          }}>
            ← 返回部落格
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                background: 'rgba(185,28,28,0.2)', color: '#fca5a5',
                padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700,
                border: '1px solid rgba(185,28,28,0.4)',
              }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, color: '#fff', marginBottom: 12, lineHeight: 1.3 }}>
            {post.title}
          </h1>
          <p style={{ color: '#a7f3d0', fontSize: '0.9rem' }}>{post.date} · 敏姐房產通</p>
        </div>
      </section>

      {/* 文章內容 */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <article
          style={{ color: '#374151', lineHeight: 1.9, fontSize: '1.05rem' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* CTA */}
        <div style={{
          marginTop: 56,
          background: 'linear-gradient(135deg, #1a1a2e, #7f1d1d)',
          borderRadius: 16, padding: '32px',
          border: '1px solid rgba(110,231,183,0.3)',
        }}>
          <p style={{ fontWeight: 900, fontSize: '1.2rem', color: '#fca5a5', marginBottom: 6 }}>
            想了解更多？找敏姐房產通
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: 20 }}>
            紅火房屋仲介有限公司
          </p>
          <a
            href="https://maps.google.com/?q=雲林縣斗六市中正路312號"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textDecoration: 'none', display: 'block', marginBottom: 20 }}
          >
            📍 雲林縣斗六市中正路312號
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href="tel:0988146299"
              style={{ background: '#DC2626', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
              📞 0988-146-299
            </a>
            <a href="https://wa.me/886988146299" target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
              💬 WhatsApp 免費諮詢
            </a>
            <a href="https://www.facebook.com/fantasichouse" target="_blank" rel="noopener noreferrer"
              style={{ background: '#1877F2', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
              FB 敏姐房產通
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
