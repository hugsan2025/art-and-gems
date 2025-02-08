import { NextResponse } from 'next/server'
import type { RouteContext } from '@/types/api'
import type { ApiResponse, Carrier } from '@/types'
import { prisma } from '@/lib/prisma'

export async function GET(_request: Request, { params }: RouteContext): Promise<NextResponse<ApiResponse<Carrier>>> {
  try {
    const carrier = await prisma.carrier.findUnique({
      where: {
        id: params.id
      },
      include: {
        deliveryZones: true
      }
    })

    if (!carrier) {
      return NextResponse.json(
        { error: 'Transportadora não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: carrier })
  } catch (error) {
    console.error('Erro ao buscar transportadora:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar transportadora' },
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
    const carrier = await prisma.carrier.update({
      where: {
        id: params.id
      },
      data
    })

    return NextResponse.json(carrier)
  } catch (error) {
    console.error('Erro ao atualizar transportadora:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar transportadora' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.carrier.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir transportadora:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir transportadora' },
      { status: 500 }
    )
  }
} 