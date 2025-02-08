'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Product } from '@/types'

interface PageProps {
  params: {
    id: string
  }
}

export default function ProductDetailsPage({ params }: PageProps) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const json = await response.json()
        if (json.success) {
          setProduct(json.data)
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (!product) {
    return <div className="p-6">Produto não encontrado</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/produtos"
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Detalhes do Produto</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Imagens */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Imagens</h2>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={url}
                  alt={`${product.name} - Imagem ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-4">Informações Básicas</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Nome</dt>
                <dd className="font-medium">{product.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Tipo</dt>
                <dd className="font-medium">
                  {product.type === 'STONE' ? 'Pedra' : 'Curso'}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Preço</dt>
                <dd className="font-medium">€{product.price.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Descrição</dt>
                <dd className="font-medium">{product.description}</dd>
              </div>
            </dl>
          </div>

          {product.type === 'STONE' && (
            <div>
              <h2 className="font-semibold mb-4">Características da Pedra</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Tipo de Pedra</dt>
                  <dd className="font-medium">{product.gemFamily}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Origem</dt>
                  <dd className="font-medium">{product.origin || 'Não informado'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Cor</dt>
                  <dd className="font-medium">{product.color || 'Não informado'}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 