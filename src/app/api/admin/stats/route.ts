import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Buscar estatísticas
    const totalProducts = await prisma.product.count()
    const totalOrders = await prisma.order.count()
    const totalSales = await prisma.order.aggregate({
      _sum: {
        total: true
      },
      where: {
        status: 'COMPLETED'
      }
    })
    const totalCustomers = await prisma.order.groupBy({
      by: ['customerEmail'],
      _count: true
    })

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalSales: totalSales._sum.total || 0,
      totalCustomers: totalCustomers.length
    })
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
} 