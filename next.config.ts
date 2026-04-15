import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root to this project directory so Next.js doesn't
  // walk up and find the pnpm-lock.yaml sitting in C:\Users\Eamon\.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
