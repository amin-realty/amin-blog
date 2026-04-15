import { getPostBySlug, getAllPosts, blocksToHtml } from '@/lib/notion'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const result = await getPostBySlug(params.slug)
  if (!result) return {}
  return {
    title: `${result.post.title} | 阿敏房產通`,
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
    <main className="max-w-3xl mx-auto px-4 py-12">
      <a href="/blog" className="text-sm text-orange-600 hover:underline">← 返回部落格</a>

      <div className="flex flex-wrap gap-2 mb-4 mt-6">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-8">{post.date} · 阿敏房產通</p>

      <article className="text-gray-700" dangerouslySetInnerHTML={{ __html: html }} />

      {/* CTA 聯絡區塊 */}
      <div
        className="mt-12 p-6 rounded-2xl"
        style={{ background: 'linear-gradient(120deg,#0D0D1A,#1a1530)', border: '1px solid rgba(201,151,122,0.3)' }}
      >
        <p className="font-black text-lg mb-1" style={{ color: '#C9977A' }}>想了解更多？找阿敏房產通</p>
        <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>紅火房屋仲介有限公司 · 雲林縣斗六市中正路312號</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="tel:0988146299"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-80"
            style={{ background: '#DC2626' }}
          >
            📞 0988-146-299
          </a>
          <a
            href="https://www.facebook.com/fantasichouse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-80"
            style={{ background: '#1877F2' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            FB 阿敏房產通
          </a>
        </div>
      </div>
    </main>
  )
}
