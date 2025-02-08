import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(recentOrders)
  } catch (error) {
    console.error('Erro ao buscar pedidos recentes:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos recentes' },
      { status: 500 }
    )
  }
} 