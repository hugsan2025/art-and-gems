import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      seoDesc: true,
      images: true,
      type: true,
      createdAt: true
    },
    take: 20
  })

  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: 'Art & Gems - Novos Produtos',
    home_page_url: process.env.NEXT_PUBLIC_BASE_URL,
    feed_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed`,
    items: products.map(product => ({
      id: product.id,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${product.type === 'STONE' ? 'pedras' : 'cursos'}/${product.slug}`,
      title: product.name,
      content_html: product.description,
      summary: product.seoDesc || product.description.slice(0, 200),
      image: product.images[0],
      date_published: product.createdAt.toISOString()
    }))
  }

  return NextResponse.json(feed)
} 