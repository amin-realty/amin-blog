import { getAllPosts } from '@/lib/notion'

const SITE = 'https://minjie-realty.com'
const SITE_NAME = '敏姊房產通'
const SITE_DESC = '買房、賣房、節稅、投資，敏姊幫你搞懂每一步！雲林斗六專業房仲知識平台。'

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
    .slice(0, 20)
    .map((post) => {
      const url = `${SITE}/blog/${post.slug}`
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()
      const tags = post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('')
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.summary || post.title)}</description>
      ${tags}
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} 房產知識部落格</title>
    <link>${SITE}/blog</link>
    <description>${SITE_DESC}</description>
    <language>zh-TW</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
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
