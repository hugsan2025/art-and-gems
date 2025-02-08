import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })

  if (!product) {
    return {
      title: 'Produto não encontrado'
    }
  }

  return {
    title: product.name,
    description: product.description
  }
} 