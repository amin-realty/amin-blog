import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "紅火房屋仲介 | 雲林斗六專業房仲",
  description: "雲林縣斗六市專業房屋仲介，提供買房、賣房、租屋服務。紅火房屋仲介有限公司，雲林縣斗六市中正路312號。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
