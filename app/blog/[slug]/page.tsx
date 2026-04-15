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
    title: `${result.post.title} | 紅火房屋仲介`,
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
      <p className="text-gray-400 text-sm mb-8">{post.date} · 紅火房屋仲介</p>

      <article
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-12 p-6 bg-orange-50 rounded-xl border border-orange-100">
        <p className="font-semibold text-gray-800 mb-1">想了解更多？聯繫我們</p>
        <p className="text-sm text-gray-600">紅火房屋仲介 · 雲林縣斗六市中正路312號</p>
        <a
          href="https://amin-realty.github.io#contact"
          className="mt-3 inline-block text-sm bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          免費諮詢 →
        </a>
      </div>
    </main>
  )
}
