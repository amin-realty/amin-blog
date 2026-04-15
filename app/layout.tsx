import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "敏姐房產通 | 雲林斗六專業房仲",
  description: "雲林縣斗六市專業房屋仲介，提供買房、賣房、租屋服務。敏姐房產通，0988-146-299，雲林縣斗六市中正路312號。",
  keywords: ["敏姐房產通", "斗六房仲", "雲林房仲", "斗六買房", "雲林買房", "房屋仲介", "斗六租屋", "紅火房屋仲介"],
  openGraph: {
    title: "敏姐房產通 | 雲林斗六專業房仲",
    description: "雲林縣斗六市專業房屋仲介，提供買房、賣房、租屋服務。",
    url: "https://amin-blog.vercel.app",
    siteName: "敏姐房產通",
    locale: "zh_TW",
    type: "website",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
