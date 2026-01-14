/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.passage.com',
      },
      {
        protocol: 'https',
        hostname: 'kapowaz.github.io',
      },
      {
        protocol: 'https',
        hostname: 'ca.slack-edge.com',
      },
    ],
  },
}

module.exports = nextConfig
