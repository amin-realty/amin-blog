import { readFileSync } from 'fs'
import { join } from 'path'

export default function HomePage() {
  const html = readFileSync(join(process.cwd(), 'public', 'home.html'), 'utf-8')

  // Extract <style> blocks from <head>
  const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
  const styles = styleMatches.map(m => m[1]).join('\n')

  // Extract <body> content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  const bodyContent = bodyMatch ? bodyMatch[1] : html

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  )
}
