const NOTION_TOKEN = process.env.NOTION_TOKEN!
const DATABASE_ID = process.env.NOTION_DATABASE_ID!
const NOTION_VERSION = '2022-06-28'

const headers = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json',
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  date: string
  status: string
  tags: string[]
  summary: string
  cover?: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      filter: { property: 'Status', select: { equals: '發布' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    }),
    cache: 'no-store',
  })
  const data = await res.json()
  return (data.results ?? []).map(pageToPost)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPostBySlug(slug: string): Promise<{ post: BlogPost; blocks: Record<string, unknown>[] } | null> {
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      filter: { property: 'Slug', rich_text: { equals: slug } },
    }),
    cache: 'no-store',
  })
  const data = await res.json()
  if (!data.results?.length) return null

  const page = data.results[0]
  const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children?page_size=100`, {
    headers,
    cache: 'no-store',
  })
  const blocksData = await blocksRes.json()

  return { post: pageToPost(page), blocks: blocksData.results ?? [] }
}

function pageToPost(page: any): BlogPost {
  return {
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text ?? '',
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? page.id,
    date: page.properties.Date?.date?.start ?? '',
    status: page.properties.Status?.select?.name ?? '',
    tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) ?? [],
    summary: page.properties.Summary?.rich_text?.[0]?.plain_text ?? '',
    cover: page.properties.Cover?.url ?? undefined,
  }
}

export function blocksToHtml(blocks: any[]): string {
  return blocks.map(blockToHtml).join('\n')
}

function blockToHtml(block: any): string {
  const type = block.type
  const content = block[type]
  const text = (content?.rich_text ?? []).map((t: any) => {
    let s = t.plain_text
    if (t.annotations?.bold) s = `<strong>${s}</strong>`
    if (t.annotations?.italic) s = `<em>${s}</em>`
    if (t.annotations?.code) s = `<code>${s}</code>`
    return s
  }).join('')

  switch (type) {
    case 'heading_1': return `<h1 class="text-2xl font-bold mt-8 mb-3">${text}</h1>`
    case 'heading_2': return `<h2 class="text-xl font-bold mt-6 mb-2">${text}</h2>`
    case 'heading_3': return `<h3 class="text-lg font-semibold mt-4 mb-2">${text}</h3>`
    case 'paragraph': return text ? `<p class="mb-4 text-gray-700 leading-relaxed">${text}</p>` : '<br>'
    case 'bulleted_list_item': return `<li class="ml-5 list-disc mb-1">${text}</li>`
    case 'numbered_list_item': return `<li class="ml-5 list-decimal mb-1">${text}</li>`
    case 'quote': return `<blockquote class="border-l-4 border-orange-400 pl-4 my-4 text-gray-600 italic">${text}</blockquote>`
    case 'code': return `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>${content?.rich_text?.[0]?.plain_text ?? ''}</code></pre>`
    case 'divider': return '<hr class="my-6 border-gray-200">'
    default: return text ? `<p class="mb-4">${text}</p>` : ''
  }
}

// ── 房產物件庫 ──────────────────────────────────────────────
const PROPERTIES_DB_ID = process.env.NOTION_PROPERTIES_DATABASE_ID!

export interface Property {
  id: string
  title: string
  type: string       // 透天/住宅 | 土地/農地 | 預售/新成屋
  location: string
  area: string       // 坪數
  rooms: string      // 格局
  price: string      // 售價
  oldPrice: string   // 原價（可空）
  imageUrl: string
  propertyUrl: string
  badge: string      // 降價 | 精選 | 新成屋 | ''
}

export async function getProperties(): Promise<Property[]> {
  const res = await fetch(`https://api.notion.com/v1/databases/${PROPERTIES_DB_ID}/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      filter: { property: '狀態', select: { equals: '上架' } },
      sorts: [{ property: '標題', direction: 'ascending' }],
    }),
    next: { revalidate: 1800 },
  })
  const data = await res.json()
  return (data.results ?? []).map((p: any): Property => ({
    id: p.id,
    title: p.properties['標題']?.title?.[0]?.plain_text ?? '',
    type: p.properties['類型']?.select?.name ?? '',
    location: p.properties['地點']?.rich_text?.[0]?.plain_text ?? '',
    area: p.properties['坪數']?.rich_text?.[0]?.plain_text ?? '',
    rooms: p.properties['格局']?.rich_text?.[0]?.plain_text ?? '',
    price: p.properties['售價']?.rich_text?.[0]?.plain_text ?? '',
    oldPrice: p.properties['原價']?.rich_text?.[0]?.plain_text ?? '',
    imageUrl: p.properties['圖片網址']?.url ?? '',
    propertyUrl: p.properties['物件連結']?.url ?? '',
    badge: p.properties['標籤']?.select?.name ?? '',
  }))
}
