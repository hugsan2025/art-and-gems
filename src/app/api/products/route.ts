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

async function generateUniqueSlug(name: string): Promise<string> {
  let slug = generateSlug(name)
  let counter = 1
  let uniqueSlug = slug

  while (true) {
    // Verificar se o slug já existe
    const existing = await prisma.product.findUnique({
      where: { slug: uniqueSlug }
    })

    if (!existing) {
      return uniqueSlug
    }

    // Se existe, adiciona um número ao final
    uniqueSlug = `${slug}-${counter}`
    counter++
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: products 
    })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const slug = await generateUniqueSlug(data.name)
    const categoryId = data.type === 'STONE' ? 'cat_stones' : 'cat_courses'

    // Verificar se a categoria existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Categoria ${categoryId} não encontrada` 
        },
        { status: 404 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        images: data.images,
        type: data.type,
        slug,
        gemFamily: data.gemFamily,
        origin: data.origin,
        color: data.color,
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: product 
    })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
} 