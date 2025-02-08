/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    NEXT_PUBLIC_APP_URL: 'https://artandgems.store', // Substitua pelo seu domínio
    DATABASE_URL: process.env.DATABASE_URL // Adicionando DATABASE_URL
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig