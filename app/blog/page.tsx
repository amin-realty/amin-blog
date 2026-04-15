import { getAllPosts } from '@/lib/notion'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '房產知識部落格 | 敏姐房產通',
  description: '雲林斗六房產知識、買房指南、市場分析，由敏姐房產通專業顧問撰寫。',
}

export const revalidate = 3600

const QR_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://amin-realty.github.io&color=0D0D1A&bgcolor=EEF4FF'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Agent Header Card — Luxury */}
      <div
        className="rounded-2xl p-7 mb-10 flex flex-col sm:flex-row items-center gap-7"
        style={{
          background: 'linear-gradient(120deg, #0D0D1A 0%, #1a1530 60%, #0D0D1A 100%)',
          border: '1px solid rgba(201,151,122,0.4)',
          boxShadow: '0 4px 32px rgba(201,151,122,0.08)',
        }}
      >
        {/* Photo */}
        <div className="flex-shrink-0">
          <Image
            src="/agent.jpg"
            alt="阿敏 專業顧問"
            width={96}
            height={96}
            className="rounded-full object-cover"
            style={{ width: 96, height: 96, border: '3px solid #DC2626' }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="text-2xl font-black mb-1" style={{ color: '#C9977A' }}>
            敏姐房產通
          </div>
          <div
            className="text-xs font-bold mb-2"
            style={{ color: '#DC2626', letterSpacing: '0.25em' }}
          >
            紅火房屋仲介有限公司
          </div>
          <div className="text-base font-semibold mb-1" style={{ color: '#DC2626' }}>
            0988-146-299
          </div>
          <a
            href="https://maps.google.com/?q=雲林縣斗六市中正路312號"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs block mb-2 hover:opacity-80 transition-opacity"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            📍 雲林縣斗六市中正路312號
          </a>
          <a
            href="https://amin-realty.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-opacity hover:opacity-100 block mb-3"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            amin-realty.github.io
          </a>
          <a
            href="https://www.facebook.com/fantasichouse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-85"
            style={{ background: '#1877F2' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            敏姐房產通 Facebook
          </a>
        </div>

        {/* QR Code */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={QR_URL}
            alt="掃碼看網站"
            width={108}
            height={108}
            className="rounded-lg"
            style={{ border: '3px solid #1D4ED8', padding: 4, background: '#EEF4FF' }}
          />
          <span className="text-xs" style={{ color: '#1D4ED8', letterSpacing: '2px' }}>掃碼看網站</span>
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
