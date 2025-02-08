import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const featuredStones = await prisma.product.findMany({
    where: {
      type: 'STONE',
      featured: true
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      seoDesc: true,
      images: true,
      price: true,
      gemFamily: true
    },
    take: 6
  })

  const featuredCourses = await prisma.product.findMany({
    where: {
      type: 'COURSE',
      featured: true
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      seoDesc: true,
      images: true,
      price: true,
      duration: true,
      level: true
    },
    take: 3
  })

  return NextResponse.json({
    stones: featuredStones,
    courses: featuredCourses
  })
} 