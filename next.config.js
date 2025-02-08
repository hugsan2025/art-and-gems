/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  env: {
    NEXT_PUBLIC_APP_URL: 'https://artandgems.store', // Substitua pelo seu domínio
    DATABASE_URL: process.env.DATABASE_URL // Adicionando DATABASE_URL
  }
}

module.exports = nextConfig