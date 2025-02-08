import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      type: 'STONE'
    },
    select: {
      id: true,
      slug: true,
      updatedAt: true,
      seoTitle: true,
      seoDesc: true
    }
  })

  const courses = await prisma.product.findMany({
    where: {
      type: 'COURSE'
    },
    select: {
      id: true,
      slug: true,
      updatedAt: true,
      seoTitle: true,
      seoDesc: true
    }
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const urls = [
    {
      loc: `${baseUrl}`,
      lastmod: new Date().toISOString(),
      priority: 1.0,
      changefreq: 'daily'
    },
    ...products.map(product => ({
      loc: `${baseUrl}/pedras/${product.slug}`,
      lastmod: product.updatedAt.toISOString(),
      priority: 0.8,
      changefreq: 'weekly',
      title: product.seoTitle || undefined,
      description: product.seoDesc || undefined
    })),
    ...courses.map(course => ({
      loc: `${baseUrl}/cursos/${course.slug}`,
      lastmod: course.updatedAt.toISOString(),
      priority: 0.8,
      changefreq: 'weekly',
      title: course.seoTitle || undefined,
      description: course.seoDesc || undefined
    }))
  ]

  return NextResponse.json(urls)
} 