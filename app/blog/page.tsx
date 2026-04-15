import { getAllPosts } from '@/lib/notion'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '房產知識部落格 | 紅火房屋仲介',
  description: '雲林斗六房產知識、買房指南、市場分析，由紅火房屋仲介專業團隊撰寫。',
}

export const revalidate = 3600

const QR_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://amin-realty.github.io&color=1a1a2e&bgcolor=ffffff'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Agent Header Card */}
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-6">
        {/* Photo */}
        <div className="flex-shrink-0">
          <Image
            src="/agent.jpg"
            alt="阿敏 專業顧問"
            width={90}
            height={90}
            className="rounded-full border-4 border-red-500 object-cover"
            style={{ width: 90, height: 90 }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left text-white">
          <div className="text-xs text-orange-300 font-semibold tracking-widest mb-1">紅火房屋仲介</div>
          <div className="text-2xl font-black mb-1">阿敏房產通</div>
          <div className="text-lg font-bold text-red-300 mb-1">📞 0988-146-299</div>
          <a
            href="https://amin-realty.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            🌐 amin-realty.github.io
          </a>
        </div>

        {/* QR Code */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={QR_URL}
            alt="掃碼看網站"
            width={110}
            height={110}
            className="rounded-lg border-2 border-white/20"
          />
          <span className="text-white/50 text-xs">掃碼看網站</span>
        </div>
      </div>

      {/* Blog Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">房產知識部落格</h1>
        <p className="text-gray-500">雲林斗六房產專業知識，幫助您做出最佳決策</p>
      </div>

      {/* Posts */}
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
