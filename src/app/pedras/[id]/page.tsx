import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ProductDetails from '@/components/ProductDetails'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }): Promise<Metadata> {
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

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
} 