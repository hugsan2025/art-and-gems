import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { format, subDays } from 'date-fns'

interface SaleGroup {
  createdAt: Date
  _sum: {
    total: number | null
  }
}

export async function GET() {
  try {
    const sevenDaysAgo = subDays(new Date(), 7)

    const sales = await prisma.order.groupBy({
      by: ['createdAt'],
      _sum: {
        total: true
      },
      where: {
        createdAt: {
          gte: sevenDaysAgo
        },
        status: 'COMPLETED'
      }
    })

    const formattedSales = sales.map((sale: SaleGroup) => ({
      date: format(sale.createdAt, 'dd/MM'),
      sales: sale._sum.total || 0
    }))

    return NextResponse.json(formattedSales)
  } catch (error) {
    console.error('Erro ao buscar vendas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar vendas' },
      { status: 500 }
    )
  }
} 