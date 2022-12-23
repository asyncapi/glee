/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    transpilePackages: ['ui'],
  },
  reactStrictMode: true,
  swcMinify: true,
}
// eslint-disable-next-line no-undef
module.exports = nextConfig
