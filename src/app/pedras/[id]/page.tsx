'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'
import type { Product } from '@/types'
import ProductDetails from '@/components/ProductDetails'
import { notFound } from 'next/navigation'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const data = await response.json()
        
        if (!data.success) {
          notFound()
        }
        
        setProduct(data.data)
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!product) {
    return notFound()
  }

  return (
    <ProductDetails product={product} />
  )
} 