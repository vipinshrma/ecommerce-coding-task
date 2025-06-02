import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'dummyjson.com',
      'i.dummyjson.com',
      'cdn.dummyjson.com',
      
    ],
  },
  eslint:{
    ignoreDuringBuilds:true
  }
};

export default nextConfig;
