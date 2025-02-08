import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais por hífen
    .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
}

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ data: products })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const slug = generateSlug(data.name)

    const product = await prisma.product.create({
      data: {
        ...data,
        slug
      }
    })

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
} 