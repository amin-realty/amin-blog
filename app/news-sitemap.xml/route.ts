import { getAllPosts } from '@/lib/notion'

const SITE = 'https://amin-blog.vercel.app'
const SITE_NAME = '敏姐房產通'

export async function GET() {
  const posts = await getAllPosts()

  // Google News Sitemap 只收錄近 2 天內發布的文章
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)

  const recentPosts = posts.filter((p) => {
    if (!p.date) return false
    return new Date(p.date) >= twoDaysAgo
  })

  // 若無近 2 天文章，仍回傳最新 5 篇（讓 GSC 有內容可讀）
  const targetPosts = recentPosts.length > 0 ? recentPosts : posts.slice(0, 5)

  const items = targetPosts
    .map((post) => {
      const pubDate = post.date
        ? new Date(post.date).toISOString()
        : new Date().toISOString()
      return `
  <url>
    <loc>${SITE}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>zh-tw</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>
  </url>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, stale-while-revalidate=3600',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
