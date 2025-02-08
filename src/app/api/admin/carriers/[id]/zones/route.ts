import { NextResponse } from 'next/server'
import type { RouteContext } from '@/types/api'
import { prisma } from '@/lib/prisma'

export async function POST(_request: Request, { params }: RouteContext) {
  try {
    const data = await _request.json()
    
    const zone = await prisma.DeliveryZone.create({
      data: {
        ...data,
        carrierId: params.id!
      }
    })

    return NextResponse.json(zone)
  } catch (error) {
    console.error('Erro ao criar zona:', error)
    return NextResponse.json(
      { error: 'Erro ao criar zona' },
      { status: 500 }
    )
  }
} 