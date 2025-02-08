import { NextResponse } from 'next/server'
import type { RouteContext } from '@/types/api'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const data = await request.json()
    
    const zone = await prisma.DeliveryZone.update({
      where: {
        id: params.zoneId
      },
      data
    })

    return NextResponse.json(zone)
  } catch (error) {
    console.error('Erro ao atualizar zona:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar zona' },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await prisma.DeliveryZone.delete({
      where: {
        id: params.zoneId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir zona:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir zona' },
      { status: 500 }
    )
  }
} 