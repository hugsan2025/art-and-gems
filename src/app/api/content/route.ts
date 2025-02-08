import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section') || 'gallery'

    const contents = await prisma.content.findMany({
      where: {
        section: section as string
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: contents
    })
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar conteúdo' 
      },
      { status: 500 }
    )
  }
} 