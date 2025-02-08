'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@prisma/client'
import ProductForm from '@/components/admin/ProductForm'

interface PageProps {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: PageProps) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/products/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setProduct(data.data)
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PUT',
        body: formData
      })

      if (response.ok) {
        router.push('/admin/produtos')
        router.refresh()
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Carregando produto...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-6">
        <p>Produto não encontrado</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
      <ProductForm 
        initialData={product}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 