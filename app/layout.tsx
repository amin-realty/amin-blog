import type { Metadata } from "next";
import "./globals.css";
import NavSocial from "./components/NavSocial";

export const metadata: Metadata = {
  title: "🏠 房產知識部落格｜敏姐房產通",
  description: "買房、賣房、節稅、投資，敏姐幫你搞懂每一步！雲林斗六專業房仲知識平台。",
  keywords: ["敏姐房產通", "房產部落格", "買房指南", "斗六房仲", "雲林房仲", "節稅攻略", "房屋仲介"],
  openGraph: {
    title: "🏠 房產知識部落格｜敏姐房產通",
    description: "買房、賣房、節稅、投資，敏姐幫你搞懂每一步！",
    url: "https://amin-blog.vercel.app/blog",
    siteName: "敏姐房產通",
    locale: "zh_TW",
    type: "website",
    images: [{ url: "https://amin-blog.vercel.app/agent.jpg", width: 800, height: 600 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "敏姐房產通",
  "alternateName": "紅火房屋仲介有限公司",
  "description": "雲林縣斗六市專業房屋仲介，提供買房、賣房、租屋服務",
  "url": "https://amin-blog.vercel.app",
  "telephone": "0988-146-299",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "中正路312號",
    "addressLocality": "斗六市",
    "addressRegion": "雲林縣",
    "addressCountry": "TW"
  },
  "sameAs": [
    "https://amin-realty.github.io",
    "https://www.facebook.com/fantasichouse"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "'Noto Sans TC', sans-serif", margin: 0, padding: 0, background: '#fff', color: '#1a1a1a' }}>
        {/* NAV */}
        <nav style={{
          position: 'fixed', top: 0, width: '100%', zIndex: 100,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64, boxSizing: 'border-box',
        }}>
          <a href="https://amin-realty.github.io" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#166534', letterSpacing: 1, textDecoration: 'none' }}>
            🏠 敏姐房產通
          </a>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="https://amin-realty.github.io" style={{ textDecoration: 'none', color: '#374151', fontWeight: 500, fontSize: '0.9rem' }}>主網站</a>
            <a href="/blog" style={{ textDecoration: 'none', color: '#166534', fontWeight: 700, fontSize: '0.9rem' }}>部落格</a>
            <a
              href="https://wa.me/886988146299"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366', color: '#fff', border: 'none',
                padding: '8px 14px', borderRadius: 8,
                fontWeight: 700, fontSize: '0.85rem',
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </nav>
        <NavSocial />
        <div style={{ paddingTop: 64 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
