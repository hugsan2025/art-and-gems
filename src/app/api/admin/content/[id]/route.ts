import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Atualizar descrição
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { description } = await request.json()

    const content = await prisma.content.update({
      where: {
        id: params.id
      },
      data: {
        description
      }
    })

    return NextResponse.json({ data: content })
  } catch (error) {
    console.error('Erro ao atualizar conteúdo:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar conteúdo' },
      { status: 500 }
    )
  }
}

// Excluir conteúdo
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.content.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir conteúdo:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir conteúdo' },
      { status: 500 }
    )
  }
} 