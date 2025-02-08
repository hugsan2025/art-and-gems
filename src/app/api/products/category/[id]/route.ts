import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: params.id
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        type: true,
        // Campos específicos para pedras
        gemFamily: true,
        weight: true,
        origin: true,
        color: true,
        clarity: true,
        cut: true,
        // Campos específicos para cursos
        duration: true,
        level: true,
        startDate: true,
        maxStudents: true,
        // Relacionamentos
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ data: products })
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos por categoria' },
      { status: 500 }
    )
  }
} 