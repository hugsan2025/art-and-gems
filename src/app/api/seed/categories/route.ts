import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Criar categorias iniciais
    const categories = await prisma.category.createMany({
      data: [
        {
          id: 'cat_stones',
          name: 'Pedras Preciosas',
          description: 'Pedras preciosas e semipreciosas'
        },
        {
          id: 'cat_courses',
          name: 'Cursos',
          description: 'Cursos de lapidação e artesanato'
        }
      ],
      skipDuplicates: true
    })

    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('Erro ao criar categorias:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar categorias' },
      { status: 500 }
    )
  }
} 