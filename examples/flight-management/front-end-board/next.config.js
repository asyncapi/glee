/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    transpilePackages: ['ui'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
