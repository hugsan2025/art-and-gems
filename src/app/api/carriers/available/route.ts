import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const carriers = await prisma.carrier.findMany({
      where: {
        active: true
      },
      include: {
        deliveryZones: true
      }
    })

    return NextResponse.json(carriers)
  } catch (error) {
    console.error('Erro ao buscar transportadoras:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar transportadoras' },
      { status: 500 }
    )
  }
} 