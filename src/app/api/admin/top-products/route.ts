import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface OrderItemGroup {
  productId: string
  _sum: {
    quantity: number | null
    price: number | null
  }
}

export async function GET() {
  try {
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
        price: true
      }
    })

    const productsWithDetails = await Promise.all(
      topProducts.slice(0, 5).map(async (item: OrderItemGroup) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        })

        return {
          id: item.productId,
          name: product?.name || 'Produto Removido',
          image: product?.images[0] || '/images/placeholder.jpg',
          sales: item._sum.quantity || 0,
          revenue: item._sum.price || 0
        }
      })
    )

    return NextResponse.json(productsWithDetails)
  } catch (error) {
    console.error('Erro ao buscar produtos mais vendidos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos mais vendidos' },
      { status: 500 }
    )
  }
} 