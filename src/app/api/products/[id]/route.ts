import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    const product = await prisma.product.update({
      where: {
        id: params.id
      },
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        type: data.type,
        images: data.images,
        gemFamily: data.gemFamily || null,
        weight: data.weight ? parseFloat(data.weight) : null,
        origin: data.origin || null,
        color: data.color || null,
        clarity: data.clarity || null,
        duration: data.duration ? parseInt(data.duration) : null,
        level: data.level || null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        maxStudents: data.maxStudents ? parseInt(data.maxStudents) : null,
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar produto' },
      { status: 500 }
    )
  }
} 