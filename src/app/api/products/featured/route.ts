import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest) {
  try {
    const stones = await prisma.product.findMany({
      where: {
        type: 'STONE',
        analytics: {
          some: {
            type: 'PRODUCT_VIEW'
          }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        gemFamily: true,
        weight: true,
        origin: true,
        color: true,
        clarity: true,
        cut: true
      },
      orderBy: {
        analytics: {
          _count: 'desc'
        }
      },
      take: 6
    })

    const courses = await prisma.product.findMany({
      where: {
        type: 'COURSE',
        startDate: {
          gte: new Date()
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        startDate: true,
        duration: true,
        level: true,
        maxStudents: true
      },
      orderBy: {
        startDate: 'asc'
      },
      take: 3
    })

    return NextResponse.json({
      data: {
        stones,
        courses
      }
    })
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos em destaque' },
      { status: 500 }
    )
  }
} 