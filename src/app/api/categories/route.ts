import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({
      success: true,
      categories
    })

  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar categorias' },
      { status: 500 }
    )
  }
} 