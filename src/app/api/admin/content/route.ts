import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Buscar todos os conteúdos
export async function GET() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ 
      success: true,
      data: contents 
    })
  } catch (error) {
    console.error('Erro ao buscar conteúdos:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar conteúdos' 
      },
      { status: 500 }
    )
  }
} 