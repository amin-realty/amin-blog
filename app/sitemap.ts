import { getAllPosts } from '@/lib/notion'
import type { MetadataRoute } from 'next'

const SITE = 'https://amin-blog.vercel.app'

export const revalidate = 3600 // 每小時重新生成一次

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const blogPosts = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE}/feed.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.3,
    },
    ...blogPosts,
  ]
}
