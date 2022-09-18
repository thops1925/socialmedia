/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['scontent.fmnl3-3.fna.fbcdn.net', 'lh3.googleusercontent.com'],
  },

}

module.exports = nextConfig
