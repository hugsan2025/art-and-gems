import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Criar categoria
    const category = await prisma.Category.create({
      data: {
        name: 'Pedras',
        description: 'Pedras preciosas'
      }
    })

    // Criar produto
    const product = await prisma.Product.create({
      data: {
        name: 'Ametista Teste',
        description: 'Uma bela ametista para teste',
        price: 299.99,
        stock: 10,
        type: 'STONE',
        images: ['https://images.unsplash.com/photo-1617142137869-325955e2d3cb'],
        categoryId: category.id,
        weight: 100,
        origin: 'Brasil',
        color: 'Roxo',
        clarity: 'Alta'
      }
    })

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Erro ao criar dados de teste:', error)
    return NextResponse.json(
      { error: 'Erro ao criar dados de teste' },
      { status: 500 }
    )
  }
} 