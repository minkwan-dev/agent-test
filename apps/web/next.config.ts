import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** 개발 중 좌하단 Next 로고/라우트 인디케이터 비표시 */
  devIndicators: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
