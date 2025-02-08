/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
  env: {
    NEXT_PUBLIC_APP_URL: 'https://artandgems.netlify.app',
    DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig