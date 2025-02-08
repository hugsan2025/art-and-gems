import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
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

    // Verificar se as categorias foram criadas
    const allCategories = await prisma.category.findMany()

    return NextResponse.json({ 
      success: true, 
      created: categories,
      existing: allCategories 
    })
  } catch (error) {
    console.error('Erro ao criar categorias:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar categorias' },
      { status: 500 }
    )
  }
} 