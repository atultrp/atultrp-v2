/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // FastRAG case study uses the product's own Open Graph image.
    remotePatterns: [{ protocol: 'https', hostname: 'www.fastrag.live', pathname: '/api/og' }],
  },
}

module.exports = nextConfig
