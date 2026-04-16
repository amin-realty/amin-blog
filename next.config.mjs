/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        // 根路徑 / → 直接輸出 public/home.html（完全靜態，不過 React）
        source: '/',
        destination: '/home.html',
      },
    ]
  },
};

export default nextConfig;
