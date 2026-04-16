import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

// GET / → 直接輸出 public/home.html 原始靜態 HTML
// Route Handler 不經過 layout.tsx，100% 保留原始樣式
export async function GET() {
  const html = readFileSync(join(process.cwd(), 'public', 'home.html'), 'utf-8')
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
