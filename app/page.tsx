import { readFileSync } from 'fs'
import { join } from 'path'

export default function HomePage() {
  const html = readFileSync(join(process.cwd(), 'public', 'home.html'), 'utf-8')

  // Extract <body> content only (layout.tsx handles <html>/<head>)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  const bodyContent = bodyMatch ? bodyMatch[1] : html

  return (
    <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
  )
}
