import { getAllPosts } from '@/lib/notion'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '房產知識部落格 | 紅火房屋仲介',
  description: '雲林斗六房產知識、買房指南、市場分析，由紅火房屋仲介專業團隊撰寫。',
}

export const revalidate = 3600 // 每小時重新抓取

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">房產知識部落格</h1>
        <p className="text-gray-500">雲林斗六房產專業知識，幫助您做出最佳決策</p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-orange-600 transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.summary}</p>
            <div className="flex items-center justify-between">
              <time className="text-xs text-gray-400">{post.date}</time>
              <Link href={`/blog/${post.slug}`} className="text-sm text-orange-600 hover:underline font-medium">
                閱讀全文 →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">目前還沒有文章，敬請期待。</div>
      )}
    </main>
  )
}
